const {Router} = require('express');
const router = Router();
const {getUsers, createUsers, getDetalleUser, editUser, deleteUser } = require('../controllers/usersController');


router.route('/')
    .get(getUsers)
    .post(createUsers)



    router.route('/:id')
    .get(getDetalleUser)
    .put(editUser)
    .delete(deleteUser)

module.exports = router;