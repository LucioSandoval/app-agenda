const {Router} = require('express');
const router = Router();
const {getNotas, createNote, getDetalleNote, editNote, deleteNote}=require('../controllers/notesController');

router.route('/')
.get(getNotas)
.post(createNote)


router.route('/:id')
.get(getDetalleNote)
.put(editNote)
.delete(deleteNote)
module.exports = router;