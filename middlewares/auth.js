'use strict'

const services = require('../services')

function isAuth (req, res , next) {
	console.log('paso 1')
	if (!req.headers.authorization) {
		console.log('paso 2')
		return res.status(403).send({message: `No tienes Autorizacion`})
	}

	console.log('paso 3')

	const token = req.headers.authorization.split(' ')[1]
    console.log(token)

    console.log(req.headers)

	console.log('paso 4')
	services.decodeToken(token)
	.then(response =>{
		console.log('paso 5')
		req.user = response
		console.log('paso 5 req.user')
		console.log(req.user)
		next()
	})
	.catch(response =>{
		console.log('paso 6')
		res.status(response.status)
		console.log('res.status')
		console.log(response.status)
	})	
}

module.exports = isAuth