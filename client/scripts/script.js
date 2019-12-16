// Fonction ajoutant un événement submit sur le ou les formulaires affichés dans la div #input
function addSubmitEvent(forms) {
	for (let i=0; i<forms.length; i++) {
		forms[i].addEventListener("submit", (e) => {
			e.preventDefault();
			let output = document.getElementById("output");
			switch (method) {
				case "GET":
					output.textContent = method + " /" + resource + "/" + getInput.value;
					break;
				case "POST":
					let data = "form";
					if (e.target.id === "jsonPost")
						data = "json";
					output.textContent = method + " /" + resource + "/  " + data;
					break;
				case "PUT":
					break;
				case "DELETE":
					output.textContent = method + " /" + resource + "/" + deleteInput.value;
					break;
			}
		});
	}
}

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
	PUT : "",
	DELETE: '<form>\
					<label for="deleteForm">Identifiant de la ressource à supprimer (optionnel)</label>\
					<input type="text" name="deleteInput" id="deleteInput" size=20 /><br />\
					<input type="submit" value="Requête DELETE" />\
					</form>'
};

// Sélection de la ressource à manipuler
let select = document.getElementById("resource");
select.addEventListener("change", (e) => {
	resource = e.target.value;
});

// Mise en place des événements sur le menu des méthodes HTTP
let methods = document.getElementsByTagName("li");
for (let i=0; i<methods.length; i++) {
	methods[i].addEventListener("click", (e) => {
		for (let j=0; j<methods.length; j++)
			methods[j].classList.remove("focus");
		e.target.classList.add("focus");
		// Mise à jour de la méthode à utiliser et affichage du formulaire correspondant
		method = e.target.textContent;
		if (method !== "PUT") {
			dataInput.innerHTML = formsContent[method];
			addSubmitEvent(dataInput.getElementsByTagName("form"));
		}

		// Méthode PUT non implémentée
		else {
			alert("Méthode PUT à implémenter\nRetour à la méthode GET");
			method = "GET";
			e.target.classList.remove("focus");
			document.getElementsByTagName("li")[0].classList.add("focus");
			document.getElementsByTagName("li")[0].dispatchEvent(new MouseEvent("click"));
		}
	})
}

//let resource = "events"; *** A activer lorsque la ressource "Events" sera implémentée
let resource = "organizers",
		method = "GET";

// Affichage du formulaire par défaut (GET)
let dataInput = document.getElementById("data-input");
document.getElementsByTagName("li")[0].dispatchEvent(new MouseEvent("click"));
