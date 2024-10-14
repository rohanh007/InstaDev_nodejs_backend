const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
}, {
    timestamps: true  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
