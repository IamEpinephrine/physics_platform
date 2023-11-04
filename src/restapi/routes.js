const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/users/', controller.getUsers);
router.post('/users/', controller.addUser);
router.get('/users/:id', controller.getUserById);
router.delete('/users/:id', controller.deleteUserById);
router.put('/users/:id', controller.updateUserById);

router.get('/models/', controller.getModels);
router.post('/models',controller.addModel );
router.get('/models/:id', controller.getModelById);
//router.delete('/models/:id', controller.deleteModelById);
//router.put('/models/:id', controller.updateModelById);

router.get('/images/:id', controller.getImageById);

module.exports = router;