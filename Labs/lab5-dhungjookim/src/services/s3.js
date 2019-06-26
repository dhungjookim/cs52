import aws from 'aws-sdk';

const signS3 = (req, res) => {
  console.log('process.env.S3_BUCKET_NAME:');
  console.log(process.env.S3_BUCKET_NAME);
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      res.status(422).end();
      console.log('this is a fucking error');
    }

    const returnData = {
      signedRequest: data,
      url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
    };
    console.log('returnData:');
    console.log(returnData);
    return (res.send(JSON.stringify(returnData)));
  });
};

export default signS3;
