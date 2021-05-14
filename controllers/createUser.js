const db = require('../models/index');

module.exports = async (ctx) => {
  console.log("WELVCOME TO FUNCTIONS1111\n\n\n");
  let user = await db.User.create({userName: 'Big Bird'});
  console.log(user);
  console.log(await db.User.findAll());
  ctx.body = '';
};