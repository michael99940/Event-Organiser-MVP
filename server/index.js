var express = require('express');
var bodyParser = require('body-parser');
var db = require('../db/postGres.js');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser());


app.get('/events', (req, res) => {
	console.log('getting');
  db.selectEvents().then(data => {
  	res.json(data);
  })
  .catch(err => {
  	res.status(500).end();
  })
});

app.get('/registrations', (req, res) => {
	db.getRegistrations(req.query).then(data => {
		res.json(data);
	})
	.catch(err => {
		res.status(500).end();
	})
})

app.post('/event', (req, res) => {
	console.log(req);
	db.postEvent(req.body).then(() => {
		res.status(201).end();
	})
	.catch(err => {
		res.status(500).end();
	})
})

app.post('/signup', function (req, res) {
	db.signUp(req.body).then(() => {
		res.status(201).end();
	})
	.catch(err => {
		res.status(500).end();
	})
})

app.delete('/signoff', (req, res) => {
	db.signOff(req.body).then(() => {
		res.status(200).end();
	})
	.catch(err => {
		res.status(500).end();
	})
})

app.delete('/event', (req, res) => {
	db.deleteEvent(req.body).then(() => {
		res.status(200).end();
	}) 
	.catch(err => {
		res.status(500).end();
	})
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

