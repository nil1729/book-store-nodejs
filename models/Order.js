const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt:{
        type: String,
        required: true,
    },
    details:[{
        book:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        },
        quantity:{
            type: Number,
            required: true
        }
    }],
    amount:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Order", orderSchema);