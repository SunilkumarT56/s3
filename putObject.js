import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3-credentials.js";
import dotenv from "dotenv";
dotenv.config();

export const putObject = async (file, filename) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: filename,
    Body: file,
    ContentType: "image/jpeg,png,jpg",
  };
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    if (data.$metadata.httpStatusCode !== 200) {
      return;
      let url;
      url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
      console.log(url);
      return {
        url,
        Key: params.Key,
      };
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
