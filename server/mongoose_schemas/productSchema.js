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
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        immutable: true,
        default: Date.now
    }
});

module.exports = mongoose.model('products', productSchema)