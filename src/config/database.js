const mongoose = require('mongoose');

const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://adminmongo:admin123@todo-application.uzlprgx.mongodb.net/todo');
} 

module.exports = {
    connectDB
}

