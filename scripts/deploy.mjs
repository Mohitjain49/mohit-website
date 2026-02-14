// NPM Install Command: "npm install -D @aws-sdk/client-s3 @aws-sdk/client-cloudfront dotenv mime-types"
// NOTE: This command does NOT work correctly when bucket versioning is enabled.

// Use in GitHub Actions: https://github.com/Mohitjain49/mohit-website/blob/main/.github/workflows/main.yml#L30
// Run with "node scripts/deploy.mjs". You can make a reference to this in your package.json file.

import 'dotenv/config'; // Used To import .env variables independent from Vite.
import * as fs from "fs"; // The File System Module. Used to find and get data from files in the build output.
import * as path from 'path'; // The Path Module. Used to create path names and file names.
import { lookup } from 'mime-types'; // The lookup function here can generate the MIME type for every file we fetch.

import { S3Client, PutObjectCommand, DeleteObjectsCommand, paginateListObjectsV2 } from "@aws-sdk/client-s3"; // This module allows us to remove and send files to an Amazon S3 bucket.
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront'; // This module allows us invalidate a CloudFront Cache.

const BUILD_OUTPUT = (process.env.BUILD_OUTPUT ?? 'dist'); // This is the name of your folder where your application was built for deployment. Defaults to 'dist'.
const AWS_REGION = process.env.AWS_REGION; // This is the region where both the S3 bucket and CloudFront Distribution should be located (e.g. "us-east-1").
const AWS_BUCKET = process.env.AWS_BUCKET; // This is the name of the AWS bucket to send messages to. (e.g. "mohit-website").
const AWS_CLOUDFRONT_DIST_ID = process.env.AWS_CLOUDFRONT_DIST_ID; // This is the ID of your CloudFront Distribution (e.g. "EDFDVBD632BHDS5").
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID; // This serves as the access key for your IAM account (e.g. AKIAIOSFODNN7EXAMPLE).
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY; // This serves as the access key for your IAM account (e.g. wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY).

// console.log(BUILD_OUTPUT)
// console.log(AWS_REGION);
// console.log(AWS_BUCKET);
// console.log(AWS_CLOUDFRONT_DIST_ID);
// console.log(AWS_ACCESS_KEY_ID);
// console.log(AWS_SECRET_ACCESS_KEY);

const outDir = path.resolve(BUILD_OUTPUT); // The path that leads to the build output.
const args = process.argv.slice(2); // These are the arguments for altering how the script works.

const NO_DELETION = (args.findIndex(item => item === "--no-delete") != -1);
const NO_INVALIDATION = (args.findIndex(item => item === "--no-invalidation") != -1);

// If any of the 4 required environment variables are not defined, this will throw an error before the script starts.
if(!AWS_REGION || !AWS_BUCKET || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
    throw new Error("The mandatory environment variables are not properly configured.");
}
if(!AWS_CLOUDFRONT_DIST_ID && !NO_INVALIDATION) {
    throw new Error("No CloudFront Distribution ID Provided.");
}

/**
 * ----------------------------------------------------------
 * This section specifically handles commands with Amazon S3.
 * ----------------------------------------------------------
 */

/** The Client for Amazon S3. */
const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
});

/**
 * This function sends a command via the S3 client.
 * @param {PutObjectCommand | DeleteObjectsCommand} command the command for the S3 client to send.
 */
async function sendS3Command(command) {
    return await s3Client.send(command);
}

/**
 * This function returns all the put object commands that will be sent by the S3 client.
 */
function getPutObjectCommands() {
    const allFiles = fs.readdirSync(outDir, { recursive: true }); // All the filenames from the build output.
    const commands = [];

    for(let i = 0; i < allFiles.length; i++) {
        const filename = allFiles[i].replaceAll("\\", "/");
        const mimeType = lookup(filename);

        if(mimeType && mimeType !== "application/x-install-instructions") {
            commands.push(new PutObjectCommand({
                Body: fs.createReadStream(path.join(outDir, filename)),
                Bucket: AWS_BUCKET,
                Key: filename,
                ContentType: ((mimeType === "text/javascript") ? "application/javascript" : mimeType),
                CacheControl: ((filename.endsWith("index.html") || filename === "sw.js") ? "no-cache, no-store, must-revalidate" : undefined)
            }));
        }
    }
    return commands;
}

/**
 * This function returns commands to delete ALL the objects currently in an array.
 */
async function getDeleteObjectCommands() {
    // This gets all the current objects in the bucket.
    const paginator = paginateListObjectsV2(
        { client: s3Client },
        { Bucket: AWS_BUCKET }
    );

    // This gets all the keys.
    const objectKeys = [];
    for await (const { Contents } of paginator) {
        objectKeys.push(...Contents.map((obj) => ({ Key: obj.Key })));
    }

    // This creates and returns the commands.
    const deleteCommands = [];
    while(objectKeys.length != 0) {
        deleteCommands.push(new DeleteObjectsCommand({
            Bucket: AWS_BUCKET,
            Delete: { Objects: objectKeys.splice(0, Math.min(objectKeys.length, 1000)) }
        }));
    }
    return deleteCommands;
};

/**
 * ---------------------------------------------------------------------------------------------
 * This section specifically invalidates the Amazon CloudFront Cache that delivers the S3 files.
 * ---------------------------------------------------------------------------------------------
 */

/** The Client for Amazon CloudFront. */
const cloudfrontClient = new CloudFrontClient({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }

});

/**
 * This function sends an Invalidation command to the website's cloudfront distribution.
 */
async function sendCloudfrontInvalidation() {
    return cloudfrontClient.send(new CreateInvalidationCommand({
        DistributionId: AWS_CLOUDFRONT_DIST_ID,
        InvalidationBatch: {
            CallerReference: Date.now(),
            Paths: { Quantity: 1, Items: ["/*"] }
        }
    }));
}

/**
 * -----------------------------------------------------------------------------
 * This part below fully starts the script and runs all the necessary functions.
 * -----------------------------------------------------------------------------
 */

/** This is the main function to run at the end once all objects are initialized. */
async function main() {
    // Unless an argument is passed in, this deletes all current files in the bucket.
    if(!NO_DELETION) {
        const deleteCommands = await getDeleteObjectCommands();
        for(let j = 0; j < deleteCommands.length; j++) { await sendS3Command(deleteCommands[j]); }
        console.log(`✅ Deleted All Files From Bucket!\n`);
    }

    const commands = getPutObjectCommands();
    const length = commands.length;

    // This sends all the files in the build output to the bucket, replacing any files with the same key.
    for(let i = 0; i < length; i++) {
        await sendS3Command(commands[i]);
        console.log(`✅ Uploaded file ${i + 1} of ${length}: ${commands[i].input.Key}`);
    }
    console.log(`✅ Uploaded All Files To Your Bucket!\n`);

    // Unless an argument is passed in, this invalidates a cloudfront cache.
    if(!NO_INVALIDATION) {
        await sendCloudfrontInvalidation();
        console.log("✅ Completed CloudFront Cache Invalidation!");
    }
    console.log("Script Complete!");
}

// Runs The Main Function.
await main();