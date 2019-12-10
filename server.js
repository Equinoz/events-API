// Fonction gérant les erreurs

function errorHandler(res, err) {
	res.setHeader("Content-Type", ["text/plain", "charset=utf-8"])
	switch (err){
		case 404:
			res.status(404).end("Ressource inexistante\n")
			break
		default:
			res.status(500).end("Problème lors de l'accès à la base de données\n")
	}
}


let express = require("express"),
		bodyParser = require("body-parser"),
		DBConnect = require("./DBConnect")

let hostname = "localhost",
		port = 8080

let app = express()

app.use(bodyParser.json({type: "application/json" }))
app.use(bodyParser.urlencoded({extended: false, type: "application/x-www-form-urlencoded"}))
app.use((req, res ,next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Headers", "Content-Type")
	next()
})

app.route("/organizers/")
.get((req, res) => {
	(new DBConnect(hostname)).search()
	.then(results => {
		res.status(200).setHeader("Content-Type", ["application/json", "charset=utf-8"])
		res.json(results)
	})
	.catch(err => errorHandler(res, err))
})

.post((req, res) => {
	(new DBConnect(hostname)).add(req.body)
	.then(result => {
		res.status(201).setHeader("Content-Type", ["application/json", "charset=utf-8"])
		res.json({id: result.insertedId})
	})
	.catch(err => errorHandler(res, err))
})

.delete((req, res) => {
	(new DBConnect(hostname)).remove()
	.then(() =>	res.status(204).end())
	.catch(err => errorHandler(res, err))
})

app.route("/organizers/:id")
.get((req, res) => {
	(new DBConnect(hostname)).search(req.params.id)
	.then(result => {
		res.status(200).setHeader("Content-Type", ["application/json", "charset=utf-8"])
		res.json(result.hits[0])
	})
	.catch(err => errorHandler(res, err))
})

.delete((req, res) => {
	(new DBConnect(hostname)).remove(req.params.id)
	.then(() => res.status(204).end())
	.catch(err => errorHandler(res, err))
})

app.listen(port, () => {
	console.log("Serveur fonctionnant sur " + hostname + ":" + port)
})
