import 'dotenv/config'; // Used To import .env variables independent from Vite.
import * as fs from "fs"; // The File System Module. Used to find and get data from files in the build output.
import * as path from 'path'; // The Path Module. Used to create path names and file names.
import { lookup } from 'mime-types'; // The lookup function here can generate the MIME type for every file we fetch.

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"; // This module allows us to send files to an Amazon S3 bucket.
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront'; // This module allows us invalidate a CloudFront Cache.

const AWS_REGION = process.env.AWS_REGION; // This is the region where both the S3 bucket and CloudFront Distribution should be located (e.g. "us-east-1").
const AWS_BUCKET = process.env.AWS_BUCKET; // This is the name of the AWS bucket to send messages to. (e.g. "mohit-website").
const AWS_CLOUDFRONT_DIST_ID = process.env.AWS_CLOUDFRONT_DIST_ID; // This is the ID of your CloudFront Distribution (e.g. "EDFDVBD632BHDS5").
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID; // This serves as the access key for your IAM account (e.g. AKIAIOSFODNN7EXAMPLE).
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY; // This serves as the access key for your IAM account (e.g. wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY).
const outDir = path.resolve('dist'); // The path that leads to the build output.

// console.log(AWS_REGION);
// console.log(AWS_BUCKET);
// console.log(AWS_CLOUDFRONT_DIST_ID);
// console.log(AWS_ACCESS_KEY_ID);
// console.log(AWS_SECRET_ACCESS_KEY);

// If any of the 5 environment variables are not defined, this will throw an error before the script starts.
if(!AWS_REGION || !AWS_BUCKET || !AWS_CLOUDFRONT_DIST_ID || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
    throw new Error("The environment variables are not properly configured.");
}

/**
 * --------------------------------------------------------------
 * This section specifically pushes the build files to Amazon S3.
 * --------------------------------------------------------------
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
 * This function sends an Put Object command via the S3 client.
 * @param {PutObjectCommand} command the command for the S3 client to send.
 */
async function sendPutObjectCommand(command) {
    return await s3Client.send(command);
}

/**
 * This function returns all the commands that will be sent by the S3 client.
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
    const commands = getPutObjectCommands();
    const length = commands.length;

    for(let i = 0; i < length; i++) {
        await sendPutObjectCommand(commands[i]);
        console.log(`✅ Uploaded file ${i + 1} of ${length}: ${commands[i].input.Key}`);
    }

    await sendCloudfrontInvalidation();
    console.log("✅ Completed CloudFront Cache Invalidation!");
    console.log("All Files Uploaded");
}

await main();