const express = require ('express');
const productSchema = require('../mongoose_schemas/productSchema');
const router = express.Router();
const productModel = require('../mongoose_schemas/productSchema');
const multer = require('multer');
const multerStorage = multer.diskStorage({
    destination: function(request, file, callback){
        callback(null, './productImages/')
    },
    filename: function(request, file, callback){
        console.log(file)
        callback(null, file.originalname)
    }
})
const multerImageUpload = multer({storage: multerStorage})
//const multerImageUpload = multer({dest: 'productImages/'})

router.post('/post', multerImageUpload.single('productImage'), (request, response) =>{

    let newProduct = new productModel({
        productName: request.body.productName,
        description: request.body.description, 
        price: request.body.price,
        productImage: request.file.path
    })

    newProduct.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => response.json(error))

})


router.get('/get', (request, response) =>{

    productModel.find()
    .then(data => {
        console.log(data)
        response.json(data)
    })
    .catch(error => response.json(error))

})

module.exports = router;