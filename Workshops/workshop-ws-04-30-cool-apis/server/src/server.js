import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const request = require('request');
const fs = require('fs');
const multer = require('multer');

const upload = multer({ dest: 'src/' });

// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enable/disable http request logging
app.use(morgan('dev'));

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get audio file in webm format from frontend and pass to IBM Watson for text analysis
app.post('/', upload.single('file'), (req, res, next) => {
  request({
    url: 'https://stream.watsonplatform.net/speech-to-text/api/v1/recognize',
    method: 'POST',
    headers: {
      'Content-Type': 'audio/webm;codecs=opus',
    },
    body: fs.createReadStream(req.file.path),
    auth: {
      user: 'apikey',
      pass: 'J5TOPkpkt4i0ZOzj1I6DFzmngMrrZckNRoDfDKQd17za',
    },
  }, (error, response, body) => {
    if (error) {
      // send error
      res.status(500).send(error);
    } else {
      // delete the audio file off the server
      fs.unlinkSync(req.file.path);

      // send text string from watson to frontend
      res.send(body);
    }
  });
});

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);
