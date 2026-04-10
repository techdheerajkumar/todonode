const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate: {
            validator: function(value){
                if(!['Male', 'Female', 'Others'].includes(value)){
                    throw new error;
                }
            }
        }
    },
    skills: {
        type: [String]
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema);
module.exports = {User} 