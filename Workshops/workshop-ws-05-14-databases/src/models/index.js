import Sequelize from 'sequelize';

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░░██████░██████░░███████░███████░░░█░░░
// ░░░█░░░░█░█░░░░█░░█░░░░░█░░░░█░░░░███░░░
// ░░░█░░░░█░█░░░░█░░█░░░░░█░░░░█░░░░░░█░░░
// ░░░██████░██████░░███████░░░░█░░░░░░█░░░
// ░░░█░░░░░░█░░░░█░░████░░░░░░░█░░░░░░█░░░
// ░░░█░░░░░░█░░░░█░░█░░██░░░░░░█░░░░░░█░░░
// ░░░█░░░░░░█░░░░█░░█░░░░█░░░░░█░░░░░░█░░░
// ░░░█░░░░░░█░░░░█░░█░░░░░█░░░░█░░░░█████░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

const sequelize = new Sequelize('postgres://me:password@localhost:5432/polls');

const models = {
  Author: sequelize.import('./author.js'),
  Poll: sequelize.import('./poll.js'),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
