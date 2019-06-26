import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import * as Polls from './controllers/poll_controller';


// DB Setup
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/cs52poll';
mongoose.connect(mongoURI);
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;

// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enable/disable http request logging
app.use(morgan('dev'));

// enable only if you want templating
app.set('view engine', 'ejs');

// enable only if you want static assets from folder static
app.use(express.static('static'));

// this just allows us to render ejs from the ../app/views directory
app.set('views', path.join(__dirname, '../src/views'));

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// additional init stuff should go before hitting the routing


// default index route
// app.get('/', (req, res) => {
//   // we will later be able to get the polls by calling a function, but let's pass in no polls for now
//   const polls = [];
//   res.render('index', { polls });
// });

app.get('/', (req, res) => {
  Polls.getPolls().then((polls) => {
    res.render('index', { polls });
  }).catch((error) => {
    res.send(`error: ${error}`);
  });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/new', (req, res) => {
  const newpoll = {
    text: req.body.text,
    imageURL: req.body.imageURL,
  };
  Polls.createPoll(newpoll).then((poll) => {
    res.redirect('/');
  });
});

app.post('/vote/:id', (req, res) => {
  const vote = (req.body.vote === 'up');// convert to bool
  Polls.vote(req.params.id, vote).then((result) => {
    res.send(result);
  });
});

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);
