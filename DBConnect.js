let MongoClient = require("mongodb").MongoClient,
		MongoObjectID = require("mongodb").ObjectID;

// Classe permettant de gérer une connexion avec la database

class DBConnect {

	// L'attribut de l'objet est une promesse de connexion

	constructor(hostname) {
		this.connection = new Promise((resolve, reject) => {
			MongoClient.connect("mongodb://" + hostname, {useUnifiedTopology: true}, (err, connection) => {
				if (err)
					reject(err);
				else
					resolve(connection);
			})
		})
	}

	// Traite la promesse de connexion de l'objet et renvoie une promesse contenant les données extraites de la database

	search(id=false) {
		return new Promise((resolve, reject) => {
			let match;
			// Si l'id éventuellement passé en paramètre n'est pas valide on renvoie une erreur 404
			try { match = (id) ? { _id: MongoObjectID(id)} : null }
			catch { reject(404) }
			this.connection
			.then(connection => {
				// Requête MongoDB
				connection.db("events").collection("organizers").find(match).toArray((err, results) => {
					if (err)
						reject(err);
					// Si on obtient pas de résultat on renvoie une erreur 404
					else if (results.length === 0)
						reject(404);
					// Sinon les données obtenues sont renvoyées au format JSON
					else 
						resolve({
							type: "organizers",
							total: results.length,
							hits: results
						});
				})
				connection.close();
			})
			.catch(err => reject(err));
		})
	}

	// Traite la promesse de connexion de l'objet, ajoute un nouveau document dans la base de données et renvoie une promesse contenant le document nouvellement créé

	add(data) {
		return new Promise((resolve, reject) => {
			this.connection
			.then(connection => {
				// On ajoute la date/heure de création du document
				data["release"] = new Date();
				// Requête MongoDB
				connection.db("events").collection("organizers").insertOne(data, (err, result) => {
					if (err)
						reject(err);
					else
						resolve(result);
				})
				connection.close();
			})
			.catch(err => reject(err));
		})
	}

	// Traite la promesse de connexion de l'objet et supprime un document selon son id, tout les documents en cas d'absence d'id

	remove(id) {
		return new Promise((resolve, reject) => {
			let match;
			// Si l'id éventuellement passé en paramètre n'est pas valide on renvoie une erreur 404
			try { match = (id) ? { _id: MongoObjectID(id)} : null }
			catch { reject(404) }
			this.connection
			.then(connection => {
				if (match !== undefined)
					// Requête MongoDB
					connection.db("events").collection("organizers").deleteMany(match, (err, result) => {
						if (err)
							reject(err);
						else if (result.deletedCount === 0)
							reject(404);
						else
							resolve(result);
					})
				connection.close();
			})
			.catch(err => reject(err));
		})
	}

}

module.exports = DBConnect;
