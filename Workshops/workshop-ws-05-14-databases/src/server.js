import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import models, { sequelize } from './models';
import createAuthorsWithPolls from './polls';

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░█▀█▐▀█░▐▀▀▌░▀█▀░░▀▀▀▌░░░▌░░
// ░░█▄█▐▄█░▐▄▄▌░░▌░░░▄▄▄▌░░░▌░░
// ░░▌░░▐░▐░▐░█░░░▌░░░░░░▌░░░▌░░
// ░░▌░░▐░▐░▐░░▌░░▌░░░▄▄▄▌█░░▌░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// sync Sequelize
const eraseDatabaseOnSync = true;
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createAuthorsWithPolls();
  }
});

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

// GET new
app.get('/new', (req, res) => {
  res.render('new');
});

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░█▀█▐▀█░▐▀▀▌░▀█▀░░▀▀▀▌░░░▌░░
// ░░█▄█▐▄█░▐▄▄▌░░▌░░░▄▄▄▌░░░▌░░
// ░░▌░░▐░▐░▐░█░░░▌░░░░░░▌░░░▌░░
// ░░▌░░▐░▐░▐░░▌░░▌░░░▄▄▄▌█░░▌░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// default index route
app.get('/', (req, res) => {
  models.Poll.findAll({
    include: [{ model: models.Author }],
  })
    .then((polls) => {
      res.render('index', { polls });
    }).catch((error) => {
      res.send(`error: ${error}`);
    });
});

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░█▀█▐▀█░▐▀▀▌░▀█▀░░▀▀▀▌░░░▀▀▌░░
// ░░█▄█▐▄█░▐▄▄▌░░▌░░░▄▄▄▌░░░▄▄▌░░
// ░░▌░░▐░▐░▐░█░░░▌░░░░░░▌░░░▌░░░░
// ░░▌░░▐░▐░▐░░▌░░▌░░░▄▄▄▌█░░█▄▄░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
app.post('/new', (req, res) => {
  const newpoll = {
    text: req.body.text,
    imageURL: req.body.imageURL,
  };

  models.Poll.create(
    newpoll, {
      include: [{ model: models.Author }],
    },
  )
    .then((poll) => {
      // if there is no author with that name already, create one
      models.Author.findOrCreate({
        where: { name: req.body.author },
      })
        .then((author) => {
          poll.setAuthor(author[0]); // findOrCreate returns an array, so we just need the first one
          poll.save(); // finally update the object with the new association
        })
        .then(() => {
          res.redirect('/');
        });
    });
});

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░█▀█▐▀█░▐▀▀▌░▀█▀░░▀▀▀▌░░▀▀▌░░
// ░░█▄█▐▄█░▐▄▄▌░░▌░░░▄▄▄▌░░▄▄▌░░
// ░░▌░░▐░▐░▐░█░░░▌░░░░░░▌░░░░▌░░
// ░░▌░░▐░▐░▐░░▌░░▌░░░▄▄▄▌█░▄▄▌░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// POST vote/:id
app.post('/vote/:id', (req, res) => {
  const vote = (req.body.vote === 'up');

  models.Poll.findByPk(req.params.id).then((poll) => {
    console.log(`updating vote: ${poll} ${vote}`);
    if (vote) {
      poll.increment('upvotes');
    } else {
      poll.increment('downvotes');
    }
    res.send(poll);
  });
});

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░█▀█▐▀█░▐▀▀▌░▀█▀░░▀▀▀▌░░▌░▌░░░
// ░░█▄█▐▄█░▐▄▄▌░░▌░░░▄▄▄▌░░▌░▌░░░
// ░░▌░░▐░▐░▐░█░░░▌░░░░░░▌░░▀▀▌░░░
// ░░▌░░▐░▐░▐░░▌░░▌░░░▄▄▄▌█░░░▌░░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
app.get('/author/:id', (req, res) => {
  models.Poll.findAll({
    where: { authorId: req.params.id },
    include: [{ model: models.Author }],
  })
    .then((polls) => {
      res.render('index', { polls });
    }).catch((error) => {
      res.send(`error: ${error}`);
    });
});
// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);
