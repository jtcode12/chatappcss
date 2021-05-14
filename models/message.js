
module.exports = (sequelize, DataTypes) => {

  const Message = sequelize.define('Message', {
    content: DataTypes.STRING,
    authorid: DataTypes.STRING,
    timestamp: DataTypes.BIGINT
  });

  Message.associate = db => {
    db.Message.belongsTo(db.User, {
      onDelete: 'CASCADE',
      foreignKey: { allowNull: false }
    });
  };

  return Message;
};
