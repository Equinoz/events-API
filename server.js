class DBConnect {

	constructor() {
		this.connection = new Promise((resolve, reject) => {
			MongoClient.connect("mongodb://" + hostname, {useUnifiedTopology: true}, (err, connection) => {
				if (err) reject(err)
				resolve(connection)
			})
		})
	}

	search(id=false) {
		return new Promise((resolve, reject) => {
			let match = (id) ? {_id: MongoObjectID(id)} : ""
			this.connection.then(connection => {
				connection.db("events").collection("organizers").find(match).toArray((err, results) => {
					if (err) reject(err)
					connection.close()
					resolve({
						type: "organizers",
						total: results.length,
						hits: results
					})
				})
			})
			.catch(err => { reject(err) })
		})
	}

}

let express = require("express"),
		MongoClient = require("mongodb").MongoClient,
		MongoObjectID = require("mongodb").ObjectID

let hostname = "localhost",
		port = 8080

let app = express()

app.get("/organizers/", (req, res) => {
	(new DBConnect()).search().then(results => {
		res.json(results)
	})
	.catch(err => { throw err })
})

.get("/organizers/:id", (req, res) => {
	(new DBConnect()).search(req.params.id).then(result => {
		res.json(result.hits[0])
	})
	.catch(err => { throw err })
})

.listen(port, () => {
	console.log("Serveur fonctionnant sur " + hostname + ":" + port)
})
