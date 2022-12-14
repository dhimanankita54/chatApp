const { register, login, allusers } = require('../controllers/userController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('/allusers/:id', allusers);

module.exports = router;