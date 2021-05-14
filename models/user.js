module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    userName: DataTypes.STRING
  });

  User.associate = db => {
    db.User.hasMany(db.Message);
  };

  return User;
};
