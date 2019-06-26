import dotenv from 'dotenv';
import jwt from 'jwt-simple';
import User from '../models/user_model';


dotenv.config({ silent: true });

// and then the secret is usable this way:
// process.env.AUTH_SECRET

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
  console.log(req.user);
};

// eslint-disable-next-line consistent-return
export const signup = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  const { name } = req.body;
  const { username } = req.body;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }
  // Finding if User exists code from https://teamtreehouse.com/community/how-would-i-check-to-see-if-an-email-entered-in-a-registration-form-was-already-in-the-a-mongo-database
  // a simple if/else to check if email already exists in db
  User.findOne({ email }, (err, userExists) => {
    // console.log(user);
    if (err) {
      // handle error here
      return ('Some error querying mongo for user with this email');
    }
    // if a user was found, that means the user's email matches the entered email
    if (userExists) {
      const err = new Error('A user with that email has already registered. Please use a different email..');
      err.status = 400;
      return next(err);
    } else {
      // code if no user with entered email was found
      const newUser = new User();
      newUser.email = email;
      newUser.password = password;
      newUser.name = name;
      newUser.username = username;
      newUser.save(console.log('saving'))
        .then((result) => {
          console.log('user created');
          res.json({ message: 'User created!' });
        })
        .catch((error) => {
          console.log('error');
          res.status(500).json({ error });
        });
      res.send({ token: tokenForUser(newUser) });
      return next();
    }
  });
};
