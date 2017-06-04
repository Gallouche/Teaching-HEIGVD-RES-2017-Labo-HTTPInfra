const express = require('express')
const path = require('path')
const Chance = require('chance');
const chance = new Chance();
const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
	res.json({
		price: chance.integer({min: 10, max: 200}),
		date: chance.date({string: true, american: false}),
		name: chance.word(),
		place: chance.address()
	})
})

app.listen(3000)