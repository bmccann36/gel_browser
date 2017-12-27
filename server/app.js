const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
	const err = new Error("Woah there partner, that page doesn't exist!")
	err.status = 404;
	next(err);
})

app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.render('error', {
		error: err
	})
});

app.listen(port, () => {
	console.log(`We are totally listening on port: ${port}`)
	})

