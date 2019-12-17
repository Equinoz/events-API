// Reçoit en paramètre un objet JSON et en renvoie le contenu au format HTML
function jsonToHtml(json) {
	let array = (Array.isArray(json)) ? true : false;
	let html = (array) ? "[" : "{";
	html += "<div style='margin-left: 30px'>";

	for (const key in json) {
		html += (!array) ? key + ": " : "";
		html += (typeof json[key] === "object") ? jsonToHtml(json[key]) : json[key];
		html += "<br />";
	}

	html += "</div>";
	html += (array) ? "]" : "}";
	return html;
}
