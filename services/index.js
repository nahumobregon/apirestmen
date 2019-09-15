'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config.js')

function createToken(user){
	const payLoad = {
		sub: user._id,
		iat: moment().unix() ,
		exp: moment().add(14, 'days').unix()
	}

	return jwt.encode(payLoad, config.SECRET_TOKEN )
}

function decodeToken (token) {

	console.log('En decodedToken paso 1')

	const decoded = new Promise((resolve, reject) => {
		try{
			console.log('En decodedToken paso 2 en el TRY')

			const payLoad = jwt.decode(token, config.SECRET_TOKEN)

			console.log('En decodedToken paso 2 en el TRY imprimiendo payLoad')
			console.log(payLoad)

			if (payLoad.exp <= moment().unix()){
				console.log('En decodedToken paso 2 en el TRY respondiendo error 401')
				reject({
					status: 401,
					message: 'El token ha expirado'
				}) 
			}
			console.log('En decodedToken paso 2 en el TRY imprimiendo resolve(payload.sub)')
			console.log(payLoad['sub'])
			resolve(payLoad.sub)
			console.log('fin paso 2, token exitoso')
		} catch {
			console.log('En decodedToken paso 3 en el catch respondiendo error 500')
			reject({
				status: 500,
				message: 'Invalid token'
			})
		}
	})

	return decoded
}

module.exports = {
	createToken,
	decodeToken

}