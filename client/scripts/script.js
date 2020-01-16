// Fonction permettant d'afficher les résultats de la requête en fonction du status, d'un tableau des headers et du corps
function displayResults(reqStatus, reqHeaders, reqBody) {
	let output = document.getElementById("output");
		output.innerHTML = "";

	if (reqStatus)
		output.innerHTML += "Request status: " + reqStatus + "<br />";

	if (reqHeaders)
		for (header of reqHeaders)
			output.innerHTML += header + "<br />";
			
	if (reqBody) {
		if (reqHeaders && ~reqHeaders.indexOf("content-type: application/json"))
			reqBody = jsonToHtml(JSON.parse(reqBody));
		output.innerHTML += reqBody;
	}
}

// Fonction ajoutant un événement submit sur le ou les formulaires affichés dans la div #input
function addSubmitEvent(forms) {
	for (let i=0; i<forms.length; i++) {
		forms[i].addEventListener("submit", (e) => {
			e.preventDefault();
			switch (method) {
				case "GET":
					ajaxGet("http://localhost:8080/" + resource + "/" + getInput.value, displayResults);
					break;

				case "POST":
					// Création d'un objet JSON et insertion des champs du formulaire
					let data = {};
					let fields = e.target;
					for (let i=0; i<fields.length-1; i++)
						if (fields[i].value != "")
							data[fields[i].name] = fields[i].value;
					ajaxPost("http://localhost:8080/" + resource + "/", data, displayResults);
					break;

				case "PUT":
					break;

				case "DELETE":
					let reset;
					if (deleteInput.value === "")
						reset = confirm("Attention, voulez-vous réellement supprimer toutes les données de la collection " + resource + "?");
					if (deleteInput.value !== "" || reset)
						ajaxDelete("http://localhost:8080/" + resource + "/" + deleteInput.value, displayResults);
					break;
			}
		});
	}
}

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
