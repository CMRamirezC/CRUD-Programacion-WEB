/*jshint esversion: 6 */

// import Modules
const express = require('express');
const Product = require('../models/product');
const path = require('path');

const expressSession = require('express-session');
const authMid = require('../middleware/authMiddleware');
const redirectIfAuth = require('../middleware/redirectIfAuth');

// Create a router object
const router = express.Router();

// export our router
module.exports = router;

// Activacion de las sesiones (cookies)
router.use(expressSession({
    secret: 'ittgogalgos',
    resave: true,
    saveUninitialized: true
}));

// Variables globales
router.use((req, res, next) =>{
    res.locals.loggedIn = req.session.userId || null;
    next();
});

// Pagina home
router.get('/',(req, res)=>{
    console.log(req.session);
    res.render('home');
});

// Insertar datos
router.get('/insertProduct', authMid, (req, res) =>{
    res.render('product');
});


// Consulta de todos los datos
// const getProducts = require('../controllers');
// router.get('/api/product', authMid, getProducts.getAllproduct);
// router.get('/api/product/:datoBusqueda', authMid, getProducts.getOneProduct);
router.get('/api/product', (req, res)=>{
    Product.find({}, (err, products)=>{
        if(err) return res.status(500).send({
           message: `Error al realizar la petición ${err}` 
        });
        
        if(!products) return res.status(404).send({
            message: 'No existen productos'
        });

        //res.status(200).send({ products: [products] });

        res.render('showProducts', { products });
    }).lean();
});

// Consulta con filtro
router.get('/api/product/:datoBusqueda', (req, res)=>{
    let datoBusqueda = req.params.datoBusqueda;
    Product.findById(datoBusqueda, (err, products)=>{
        if(err) return res.status(500).send({
            message: `Error al realizar la petición ${err}` 
         });

         if(!products) return res.status(404).send({
            message: 'El producto no existe'
        });

        //res.status(200).send({product: products});
        res.render('editProduct', { products });
    }).lean();
});

//Modificar registro (producto), Put
const putProduct = require('../controllers/putProduct');
router.put('/api/product/:productId', authMid, putProduct);

// Insertar valores en base de datos
const postProduct = require('../controllers/postProduct');
router.post('/api/product', authMid, postProduct);
// router.post('/api/product', (req, res)=>{
//     let product = new Product();
//     product.name = req.body.name;
//     product.picture = req.body.picture;
//     product.price = req.body.price;
//     // product.category = (req.body.category).toLowerCase();
//     product.category = req.body.category;
//     product.description = req.body.description;

//     console.log(req.body);

//     product.save((err, productStored)=>{
//         if(err) return res.status(500).send({
//             message: `Error al realizar la petición ${err}` 
//         });

//         //res.status(200).send({product: productStored}); 
//         res.rendirect('/api/product');
//     });
// });

// Borrar un registro (DELETE)
const delProduct = require('../controllers/delProduct');
router.delete('/api/product/:productId', authMid, delProduct);

// Pagina login
const loginController = require('../controllers/login');
router.get('/auth/login', redirectIfAuth, loginController);

const loginUserController = require('../controllers/loginUser');
router.post('/users/login', redirectIfAuth, loginUserController)

// Pagina para registro de nuevos usuarios
const newUser = require('../controllers/newUser');
router.get('/users/register', redirectIfAuth, newUser);

// Metodo POST para registro de usuario
const newUserController = require('../controllers/storeUser');
router.post('/auth/register', redirectIfAuth, newUserController);

// Metodo Get para logout
const logoutController = require('../controllers/logout');
router.get('/auth/logout', logoutController);

// Pagina 404 NotFound
router.use((req, res)=>{
    res.render('notfound');
    // res.status(404).send('Pagina no encontrada \n , Cesar Manuel Ramirez Cervantes');
});
