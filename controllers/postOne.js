
const db = require('../models/index');

module.exports = async (ctx) => {
  const id = await db.User.findOne({where: {userName: 'Big Bird'}});
  ctx.request.body.UserId = id.id;
  console.log(ctx.request.body);
  await db.Message.create(ctx.request.body);
  ctx.body = '';
};