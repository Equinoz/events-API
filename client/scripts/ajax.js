// Fonctions ajaxGet et ajaxDelete à fusionner à terme
// Appel AJAX avec la méthode GET
function ajaxGet(url, callback) {
	let req = new XMLHttpRequest();
	req.open("GET", url);
	req.responseType = "text";
	req.addEventListener("load", () => { callback(req.status, req.getAllResponseHeaders().split("\r\n"), req.responseText); })
	req.addEventListener("error", () => { callback(false, false, "Erreur réseau avec l'url: " + url); });
	req.send(null);
}

// Appel AJAX avec la méthode POST
function ajaxPost(url, data, callback) {
	let req = new XMLHttpRequest();
	req.open("POST", url);
	req.addEventListener("load", () => { callback(req.status, req.getAllResponseHeaders().split("\r\n"), req.responseText) });
	req.setRequestHeader("Content-Type", "application/json");
	data = JSON.stringify(data);
	req.send(data);
}

//function ajaxPut()

// Appel AJAX avec la méthode DELETE
function ajaxDelete(url, callback) {
	let req = new XMLHttpRequest();
	req.open("DELETE", url);
	req.responseType = "text";
	req.addEventListener("load", () => { callback(req.status, req.getAllResponseHeaders().split("\r\n"), req.responseText); })
	req.addEventListener("error", () => { callback(false, false, "Erreur réseau avec l'url: " + url); });
	req.send(null);
}
