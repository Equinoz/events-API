let MongoClient = require("mongodb").MongoClient,
		MongoObjectID = require("mongodb").ObjectID

// Classe permettant de gérer une connexion avec la database

class DBConnect {

	// L'attribut de l'objet est une promesse de connexion

	constructor(hostname) {
		this.connection = new Promise((resolve, reject) => {
			MongoClient.connect("mongodb://" + hostname, {useUnifiedTopology: true}, (err, connection) => {
				if (err) reject(err)
				resolve(connection)
			})
		})
	}

	// Traite la promesse de connexion de l'objet et renvoie soit une promesse contenant les données extraites de la database, soit une erreur

	search(id=false) {
		return new Promise((resolve, reject) => {
			let match
			// Si l'id éventuellement passé en paramètre n'est pas valide on renvoie une erreur 404
			try { match = (id) ? {_id: MongoObjectID(id)} : "" }
			catch { reject(404) }
			this.connection
			.then(connection => {
				// Requête MongoDB
				connection.db("events").collection("organizers").find(match).toArray((err, results) => {
					if (err) reject(err)
					connection.close()
					// Si on obtient pas de résultat on renvoie une erreur 404
					if (results.length === 0)
						reject(404)
					// Sinon les données obtenues sont renvoyées au format JSON
					else 
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

	add(data) {
		return new Promise((resolve, reject) => {
			this.connection
			.then(connection => {
				resolve(connection.db("events").collection("organizers").insertOne(data))
			})
			.catch(err => { reject(err) })
		})
	}

}

module.exports = DBConnect
