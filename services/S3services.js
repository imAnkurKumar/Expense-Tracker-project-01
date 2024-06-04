const AWS = require("aws-sdk");

const uploadToS3 = async (data, filename) => {
  // code to upload file to S3 bucket goes here
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const IAM_USER_KEY = process.env.IAM_USER_KEY;
  const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });

  var params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };

  try {
    const s3response = await s3bucket.upload(params).promise();
    console.log("Upload successful", s3response);
    return s3response.Location;
  } catch (err) {
    console.error(`Error in uploading: ${err}`);
    throw err;
  }
};

module.exports = { uploadToS3 };
