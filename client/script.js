// Objet contenant pour chaque méthode le formulaire à afficher
let formsContent = {
	get: '<form>\
				<label for="getInput">Identifiant de la ressource à consulter (optionnel)</label>\
				<input type="text" name="getInput" id="getInput" size=20 /><br />\
				<input type="submit" value="Requête GET" />\
				</form>',
	post: '<form id="formPost">\
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
	put : "",
	delete: '<form>\
					<label for="deleteForm">Identifiant de la ressource à supprimer (optionnel)</label>\
					<input type="text" name="deleteInput" id="deleteInput" size=20 /><br />\
					<input type="submit" value="Requête DELETE" />\
					</form>'
};

//let resource = "events"; *** A activer lorsque la ressource "Events" sera implémentée
let resource = "organizers",
		method = "get";

// Sélection de la ressource à manipuler
let select = document.getElementById("resource");
select.addEventListener("change", (e) => {
	resource = e.target.value;
});

// Affichage du formulaire par défaut (GET)
let dataInput = document.getElementById("data-input");
dataInput.innerHTML = formsContent[method];

// Mise en place des événements sur le menu des méthodes HTTP
let methods = document.getElementsByTagName("li");
for (let i=0; i<methods.length; i++) {
	methods[i].addEventListener("click", (e) => {
		for (let j=0; j<methods.length; j++)
			methods[j].classList.remove("focus");
		e.target.classList.add("focus");
		// Mise à jour de la méthode à utiliser et affichage du formulaire correspondant
		method = e.target.textContent.toLowerCase();
		if (method !== "put")
			dataInput.innerHTML = formsContent[method];
		// Méthode PUT non implémentée
		else {
			alert("Méthode PUT à implémenter\nRetour à la méthode GET");
			method = "get";
			e.target.classList.remove("focus");
			document.getElementsByTagName("ul")[0].firstElementChild.classList.add("focus");
			dataInput.innerHTML = formsContent[method];
		}
	})
}
