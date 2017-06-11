const express = require('express')
const path = require('path')
const Chance = require('chance')
const chance = new Chance()
var Sentencer = require('sentencer')
const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
	res.json({
		number: chance.integer({min: 0, max: 100}),
		hashtag: chance.hashtag(),
		sentence : Sentencer.make("We all need {{ an_adjective }} {{ noun }} in our life !")
	})
})

app.listen(3000, function(){
	console.log("Accepting HTTP request on port 3000...")
})
