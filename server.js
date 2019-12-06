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
		DBConnect = require("./DBConnect")

let hostname = "localhost",
		port = 8080

let app = express()

app.get("/organizers/", (req, res) => {
	(new DBConnect(hostname)).search()
	.then(results => {
		res.status(200).setHeader("Content-Type", ["application/json", "charset=utf-8"])
		res.json(results)
	})
	.catch(err => { errorHandler(res, err) })
})

.get("/organizers/:id", (req, res) => {
	(new DBConnect(hostname)).search(req.params.id)
	.then(result => {
		res.status(200).setHeader("Content-Type", ["application/json", "charset=utf-8"])
		res.json(result.hits[0])
	})
	.catch(err => { errorHandler(res, err) })
})

.listen(port, () => {
	console.log("Serveur fonctionnant sur " + hostname + ":" + port)
})
