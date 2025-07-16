const router = require('express').Router();
const { register, login } = require('../middleware/authController.jsx');
router.post('/register', register);
router.post('/login', login);
module.exports = router;
