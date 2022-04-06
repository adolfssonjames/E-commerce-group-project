const express = require ('express');
const productSchema = require('../mongoose_schemas/productSchema');
const router = express.Router();
const productModel = require('../mongoose_schemas/productSchema');
const OrderHistorySchema = require('../mongoose_schemas/orderHistorySchema')
const multer = require('multer');
const multerStorage = multer.diskStorage({
    destination: function(request, file, callback){
        callback(null, '/productImages/')
    },
    filename: function(request, file, callback){
        console.log(file)
        callback(null, file.originalname)
    }
})
const multerImageUpload = multer({storage: multerStorage})



// Add new product including product image
router.post('/post', multerImageUpload.single('productImage'), (request, response) =>{

    let newProduct = new productModel({
        productName: request.body.productName,
        description: request.body.description, 
        price: request.body.price,
        productImage: request.file.path,
        id: request.body.id
    })

    newProduct.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => response.json(error))

})

// Get all products
router.get('/get', (request, response) =>{

    productModel.find()
    .then(data => {
        console.log(data)
        response.json(data)
    })
    .catch(error => response.json(error))
})


// Create new order history after purchase
router.post('/newOrder', (request, response) =>{

    let newOrder = new OrderHistorySchema({
        product: request.body.product,
        price: request.body.price,
        totalPrice: request.body.totalPrice,
        currentLoggedInUser: request.body.currentLoggedInUser
    })

    newOrder.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => response.json(error))

})

// Get order history by user
    router.post('/getOrderHistory', async (request, response) =>{
        const currentLoggedInUser = request.body.email;
        const test = await OrderHistorySchema.find({currentLoggedInUser})
        .then(data => {
            response.json(data)
        })
        .catch(error => response.json(error))
    

    //const matchUser = await signUpTemplateCopy.findOne({username});

    /*if(matchUser){
        
            const isPasswordVerified = await bcrypt.compare(password, matchUser.password)
            
            if(isPasswordVerified){
                response.json(matchUser)
            }else{
                response.json('Wrong password')
            };
    }else{
        (response.json('User not found'));
    };*/
});



module.exports = router;