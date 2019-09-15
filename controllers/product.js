'use strict'

const Product = require('../models/product.js')


function getProduct(req, res){
	let productId = req.params.productId

	Product.findById(productId , (err,product) =>{
		if (err) return res.status(500).send({message : `Error al realizar la peticion  : ${err}`})
		if (!product) return res.status(404).send({message: ` El producto con Id : ${productId} no existe`})

		res.status(200).send({ product: product })
	})
}

function getProducts(req, res){
	Product.find({}, (err, products) =>{
		if (err) return res.status(500).send({message : `Error al realizar la peticion  : ${err}`})
		if (!products) return res.status(404).send({message: ` No existen productos`})

		res.status(200).send({ products })
    })
}


function saveProduct(req,res){
	console.log('POST /api/product')
	console.log(req.body)

	let product = new Product()

	product.name = req.body.name
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category
	product.description = req.body.description

	product.save((err,productStored) =>{
		if (err) {
			res.status(500).send({message: `Error al guardar en la base de datos ${err}`})
		}

		res.status(200).send({product: productStored})
	})

	//res.status(200).send({message:'El producto ha sido recibido'})

}

function updateProduct(req,res){
	let productId = req.params.productId
	let update = req.body

	//Product.findByIdAndUpdate (productId , update , (err , productUpdated) =>{
	Product.findOneAndUpdate (productId , update ,  (err , productUpdated) =>{
		if (err) res.status(500).send({message : `Error al realizar la peticion de Update : ${err}`})
	
		res.status(200).send({ message : `E producto con id : ${productId} ha sido Actualizado`})
	
	})
}

function deleteProduct(req,res){
	let productId = req.params.productId

	Product.findById(productId , (err,product) =>{
		if (err) return res.status(500).send({message : `Error al realizar la peticion  : ${err}`})
		if (!product) return res.status(404).send({message: ` El producto con Id : ${productId} no existe`})

	    product.remove( err => {
	    	if (err) res.status(404).send({message: ` El producto con Id : ${productId} no existe`})
			
			res.status(200).send({ message : `E producto con id : ${productId} ha sido eliminado`})
	    })
	})
}


module.exports = {
	getProduct,
	getProducts,
	saveProduct,
	updateProduct,
	deleteProduct
}