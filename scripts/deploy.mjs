import 'dotenv/config';
import * as fs from "fs";
import * as path from 'path';
import { lookup } from 'mime-types';

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';

const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET = process.env.AWS_BUCKET;
const AWS_CLOUDFRONT_DIST_ID = process.env.AWS_CLOUDFRONT_DIST_ID;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const outDir = path.resolve('dist') // The path that leads to the build output.

// console.log(AWS_REGION);
// console.log(AWS_BUCKET);
// console.log(AWS_CLOUDFRONT_DIST_ID);
// console.log(AWS_ACCESS_KEY_ID);
// console.log(AWS_SECRET_ACCESS_KEY);

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
        if(filename === "")

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

main();