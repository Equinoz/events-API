// Fonction gérant les erreurs

function errorHandler(res, err) {
	res.setHeader("Content-Type", ["text/plain", "charset=utf-8"]);
	switch (err){
		case 4001:
			res.status(400).end("Fichier JSON non-conforme (nom de clefs non-autorisés)\n");
			break;
		case 404:
			res.status(404).end("Ressource inexistante\n");
			break;
		default:
			res.status(500).end("Problème lors de l'accès à la base de données\n");
	}
}


let express = require("express"),
		bodyParser = require("body-parser"),
		constants = require("./constants"),
		DBConnect = require("./DBConnect");

let app = express();

// Middlewares

app.use(bodyParser.json({ type: "application/json" }))
.use((req, res ,next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Access-Control-Expose-Headers", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next();
});

// Route /organizers/

app.route("/organizers/")
.get((req, res) => {
	(new DBConnect()).search()
	.then(results => {
		res.status(200).setHeader("Content-Type", ["application/json", "charset=utf-8"]);
		res.json(results);
	})
	.catch(err => errorHandler(res, err));
})

.post((req, res) => {
	(new DBConnect()).add(req.body)
	.then(result => {
		res.status(201).setHeader("Content-Type", ["application/json", "charset=utf-8"]);
		res.json({id: result.insertedId});
	})
	.catch(err => errorHandler(res, err));
})

.delete((req, res) => {
	(new DBConnect()).remove()
	.then(() =>	res.status(204).end())
	.catch(err => errorHandler(res, err));
});

// Route /organizers/id/

app.route("/organizers/:id/")
.get((req, res) => {
	(new DBConnect()).search(req.params.id)
	.then(result => {
		res.status(200).setHeader("Content-Type", ["application/json", "charset=utf-8"]);
		res.json(result.hits[0]);
	})
	.catch(err => errorHandler(res, err));
})

.put((req, res) => {
	(new DBConnect()).update(req.params.id, req.body)
	.then(() => res.status(204).end())
	.catch(err => errorHandler(res, err));
})

.delete((req, res) => {
	(new DBConnect()).remove(req.params.id)
	.then(() => res.status(204).end())
	.catch(err => errorHandler(res, err));
});

// Serveur en écoute

app.listen(constants.port, () => {
	console.log("Serveur fonctionnant sur " + constants.hostname + ":" + constants.port);
});
