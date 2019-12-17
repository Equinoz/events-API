// Objet formsContent contenant pour chaque méthode le formulaire à afficher
let formsContent = {
	GET: '<form>\
				<label for="getInput">Identifiant de la ressource à consulter (optionnel)</label>\
				<input type="text" name="getInput" id="getInput" size=20 /><br />\
				<input type="submit" value="Requête GET" />\
				</form>',
	POST: '<form id="formPost">\
				<label for="name">Name</label>\
				<input type="text" name="name" id="name" />\
				<label for="town">Town</label>\
				<input type="text" name="town" id="town" />\
				<label for="address">Address</label>\
				<input type="text" name="address" id="address" />\
				<label for="website">Website</label>\
				<input type="url" name="website" id="website" />\
				<label for="mail">Mail</label>\
				<input type="email" name="mail" id="mail" /><br />\
				<label for="description">Description</label>\
				<textarea name="description" id="description" rows="5"></textarea><br />\
				<input type="submit" value="Requête POST via formulaire" />\
				</form>\
				<div class="separator">------ OU ------</div>\
				<form id="jsonPost">\
				<input type="file" name="file" id="file" />\
				<input type="submit" value="Requête POST via document JSON" />\
				</form>',
	PUT : '',
	DELETE: '<form>\
					<label for="deleteForm">Identifiant de la ressource à supprimer (optionnel)</label>\
					<input type="text" name="deleteInput" id="deleteInput" size=20 /><br />\
					<input type="submit" value="Requête DELETE" />\
					</form>'
};
