const User = require('../models/User');
const usersController = {};

usersController.getUsers = async (req, res)=> {
    const users = await User.find();
    res.json(users);
}

usersController.createUsers = async (req, res) =>{
    const {userName} = req.body;
     const newUser = new User({
         userName: userName
     })

     await newUser.save();

     res.json({mensaje: 'usuario registrado'});
}

usersController.getDetalleUser = async (req, res)=> {
    const user = await User.findById(req.params.id);
    res.json(user);
}

usersController.editUser = async (req, res)=> {
    const {userName} = req.body;
    await User.findOneAndUpdate(req.params.id,{userName});
    res.json({mensaje: ' Usuario modificado exitosamente'});
}

usersController.deleteUser = async (req, res)=> {
    await User.findByIdAndDelete(req.params.id);
    res.json({mensaje: 'Useario eliminado'});
}

module.exports= usersController;