const { Router } = require('express');
const router = Router();
const { allUsers, getById, newUser, update, removeUser} = require('../controllers/index.controllers');

router.get('/users', allUsers );
router.get('/users/:id',getById);
router.post('/users', newUser);
router.put('/users/:id', update);
router.delete('/users/:id', removeUser);

module.exports = router;