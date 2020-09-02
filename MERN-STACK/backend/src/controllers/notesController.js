const Note = require('../models/Note');
const { findById } = require('../models/Note');
const notesController = {};

notesController.getNotas = async (req, res)=> {
 const notas =  await Note.find();
 res.json(notas);
}



notesController.createNote = async (req, res)=> {
    const {title, description, autor, date} = req.body;
    //console.log('datos capturados', req.body);
    const newNote = new Note({
        title: title,
        description: description,
        date: date,
        autor: autor
        
    });
     await newNote.save();
     res.json({mensaje: 'nota recibida'});
}


notesController.getDetalleNote = async (req, res)=> 
{
    const note = await Note.findById(req.params.id);
    //console.log(note);
    res.json(note);
}

notesController.editNote = async(req, res)=>{
    const {title, description, autor} = req.body;
     await Note.findOneAndUpdate(req.params.id,{
        title,
        description,
        autor
    })
    res.send({mensaje: 'modificado'}); 
}

notesController.deleteNote =  async (req, res)=> {
    const note = await Note.findOneAndDelete(req.params.id);
    res.json({mensaje: 'nota eliminada'});
}



module.exports = notesController;