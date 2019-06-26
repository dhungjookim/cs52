import axios from 'axios';

const ROOT_URL = 'http://localhost:9090/api';

// const ROOT_URL = 'https://lab5-p1.herokuapp.com/api';

function getSignedRequest(file) {
  console.log('getting signed request');
  console.log(ROOT_URL);
  const fileName = encodeURIComponent(file.name);
  // hit our own server to get a signed s3 url
  return axios.get(`${ROOT_URL}/sign-s3?file-name=${fileName}&file-type=${file.type}`);
}

// return a promise that uploads file directly to S3
// note how we return the passed in url here rather than any return value
// since we already know what the url will be - just not that it has been uploaded
function uploadFileToS3(signedRequest, file, url) {
  console.log('uploading file');
  return new Promise((fulfill, reject) => {
    axios.put(signedRequest, file, { headers: { 'Content-Type': file.type } }).then((response) => {
      fulfill(url);
    }).catch((error) => {
      reject(error);
    });
  });
}

export default function uploadImage(file) {
  console.log('uploading file:');
  console.log(file);
  // returns a promise so you can handle error and completion in your component
  return getSignedRequest(file).then((response) => {
    return uploadFileToS3(response.data.signedRequest, file, response.data.url);
  });
}
