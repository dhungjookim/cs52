const poll = (sequelize, DataTypes) => {
  const Poll = sequelize.define('poll', {
    text: {
      type: DataTypes.STRING,
    },

    imageURL: {
      type: DataTypes.STRING,
    },

    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

  }, {
    getterMethods: {
      score() { return this.upvotes - this.downvotes; },
    },
  });

  Poll.associate = (models) => {
    Poll.belongsTo(models.Author);
  };

  return Poll;
};
export default poll;
