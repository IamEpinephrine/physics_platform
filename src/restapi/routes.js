const {Router} = require('express');
const controller = require('./controller');
const {validateToken} = require('./JWT')

const router = Router();

router.get('/users/', controller.getUsers);
router.post('/users/', controller.addUser);
router.get('/users/:id', controller.getUserById);
router.delete('/users/:id', controller.deleteUserById);
router.put('/users/:id', controller.updateUserById);

router.get('/models/', controller.getModels);
router.post('/models',controller.addModel );
router.get('/models/:id', controller.getModelById);
router.delete('/models/:id', controller.deleteModelById);
router.put('/models/accept/:id', controller.acceptModelById);
router.put('/models/reject/:id', controller.rejectModelById);

router.get('/images/:id', controller.getImageById);

router.post('/register/', controller.register);
router.post('/login/', controller.login);
router.get('/myprofile/', validateToken, controller.myProfile);
router.get('/logout/', controller.logout);


module.exports = router;