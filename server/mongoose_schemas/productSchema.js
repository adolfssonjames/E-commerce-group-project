const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        unique: true,

    },
    date: {
        type: Date,
        immutable: true,
        default: Date.now
    }
});

module.exports = mongoose.model('products', productSchema)