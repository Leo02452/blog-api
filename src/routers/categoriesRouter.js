const { Router } = require('express');

const categoriesController = require('../controllers/categoriesController');
const authController = require('../controllers/authController');

const router = Router();

router.use(authController.validateToken);
router.post('/', categoriesController.create);
router.get('/', categoriesController.list);

module.exports = router;