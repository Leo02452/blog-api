const { Router } = require('express');

const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');

const router = Router();

router.post('/', usersController.create);
router.use(authController.validateToken);

module.exports = router;