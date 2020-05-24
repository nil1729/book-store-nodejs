const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: 'String',
        required: true,
        default: 'customer'
    },
    carts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }]
});

module.exports = mongoose.model("User", userSchema);