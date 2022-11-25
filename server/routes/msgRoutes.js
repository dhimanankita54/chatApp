const { addMessage, getAllMessage } = require('../controllers/msgController');

const router = require('express').Router();

router.post('/addMsg/', addMessage);
router.post('/getMsg/', getAllMessage);


module.exports = router;