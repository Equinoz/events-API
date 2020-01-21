// Fonction permettant de valider les fichiers JSON reçus

function validJson(data) {
	for (let elt in data)
		if (constants.organizersAllowedFields.indexOf(elt) == -1)
			return false;
	return true;
}

let MongoClient = require("mongodb").MongoClient,
		MongoObjectID = require("mongodb").ObjectID,
		constants = require("./constants");

// Classe permettant de gérer une connexion avec la database

class DBConnect {

	// L'attribut de l'objet est une promesse de connexion

	constructor() {
		this.connection = new Promise((resolve, reject) => {
			MongoClient.connect("mongodb://" + constants.hostname, {useUnifiedTopology: true}, (err, connection) => {
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
			try { match = (id) ? { _id: MongoObjectID(id)} : null; }
			catch { reject(404); }

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
				});
				connection.close();
			})
			.catch(err => reject(err));
		})
	}

	// Traite la promesse de connexion de l'objet, ajoute un nouveau document dans la base de données et renvoie une promesse contenant le document nouvellement créé

	add(data) {
		return new Promise((resolve, reject) => {
			// On vérifie la conformité de l'objet JSON reçu via la requête
			if (!validJson(data))	reject(4001);
			else {
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
					});
					connection.close();
				})
				.catch(err => reject(err));
			}
		})
	}

	// Traite la promesse de connexion de l'objet, met à jour un document selon son id et supprime une clef si sa valeur est "null"

	update(id, data) {
		return new Promise((resolve, reject) => {
			let match;
			// Si l'id éventuellement passé en paramètre n'est pas valide on renvoie une erreur 404
			try { match = (id) ? { _id: MongoObjectID(id)} : null; }
			catch { reject(404); }
			// On vérifie la conformité de l'objet JSON reçu via la requête
			if (!validJson(data))	reject(4001);
			else {
				this.connection
				.then(connection => {
					// On liste les clefs à supprimer
					let keysToRemove = {};
					for (let elt in data)
						if (data[elt] == null) {
							keysToRemove[elt] = 1;
							delete data[elt];
						}
					// Ajoût des élements à mettre à jour
					let update = {};
					if (JSON.stringify(data) != "{}")	update["$set"] = data;
					if (JSON.stringify(keysToRemove) != "{}")	update["$unset"] = keysToRemove;
					// On modifie la date/heure de mise à jour du document
					data["release"] = new Date();
					// Requête MongoDB
					connection.db("events").collection("organizers").updateOne(match, update, (err, result) => {
						if (err)
							reject(err);
						else if (result.matchedCount == 0)
							reject(404);
						else
							resolve(result);
					});
					connection.close();
				})
				.catch(err => reject(err));
			}
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
					});
				connection.close();
			})
			.catch(err => reject(err));
		})
	}

}

module.exports = DBConnect;
