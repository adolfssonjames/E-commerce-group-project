const express = require ('express');
const productSchema = require('../mongoose_schemas/productSchema');
const router = express.Router();
const productModel = require('../mongoose_schemas/productSchema');


router.post('/post', async (request, response) =>{

    let newProduct = new productModel({
        productName: request.body.productName,
        description: request.body.description, 
        price: request.body.price
    })

    newProduct.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => response.json(error))

})


router.get('/get', async (request, response) =>{

    productModel.find({})
    .then(data => {
        console.log(data)
        response.json(data)
    })
    .catch(error => response.json(error))

})

module.exports = router;