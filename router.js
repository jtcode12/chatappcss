

let router = require('koa-router')();
const getAll = require('./controllers/getAll');
const postOne = require('./controllers/postOne');
const createUser = require('./controllers/createUser');

// router.get('/', createUser);
router.get('/message', getAll);
router.post('/message', postOne);


module.exports = router;