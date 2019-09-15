'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const app = express()
const api = require('./routes')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.engine('.hbs', hbs({
	extname: '.hbs',
	defaultLayout: 'default'
}))

app.set('view engine', '.hbs')

app.use('/api',api)
app.get('/login',(req,res)=>{
	res.render('login')
})

//app.use('api/product',api)
app.get('/',(req,res)=>{
	res.render('product')
})


module.exports = app


