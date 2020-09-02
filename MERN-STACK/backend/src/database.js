const mongoose =require('mongoose');

const URL = process.env.MONGODB_URL ? process.env.MONGODB_URL: 'mongodb+srv://user:admin123@cluster0.r76hv.mongodb.net/dbNotes?retryWrites=true&w=majority';;
mongoose.connect(URL,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () =>{
    console.log('conexión exitosa');
})