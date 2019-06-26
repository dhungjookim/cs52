const author = (sequelize, DataTypes) => {
  const Author = sequelize.define('author', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
  Author.associate = (models) => {
    Author.hasMany(models.Poll, { onDelete: 'CASCADE' });
  };
  return Author;
};

export default author;
