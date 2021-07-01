/*jshint esversion: 6 */

const Product = require("../models/product");
// Cesar Manuel Ramirez Cervantes
module.exports = (req, res)=>{
    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    // product.category = (req.body.category).toLowerCase();
    product.category = req.body.category;
    product.description = req.body.description;

    console.log(req.body);

    product.save((err, productStored)=>{
        if(err) return res.status(500).send({
            message: `Error al realizar la petición ${err}` 
        });

        //res.status(200).send({product: productStored}); 
        res.rendirect('/api/product');
    });
}