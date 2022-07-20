const { Router } = require('express');

const postsController = require('../controllers/postsController');
const authController = require('../controllers/authController');

const router = Router();

router.use(authController.validateToken);
router.post('/', postsController.create);
router.get('/:id', postsController.getById);
router.get('/', postsController.list);
router.put('/:id', postsController.update);
router.delete('/:id', postsController.remove);

module.exports = router;