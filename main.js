import "./style.css";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const data = new FormData(form);
	showSpinner();

	try {
		const response = await fetch("http://localhost:8080/dream", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				prompt: data.get("prompt"),
			}),
		});

		if (!response.ok) {
			// handle any unexpected responses
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const { image } = await response.json();
		const result = document.querySelector("#result");
		result.innerHTML = `<img src="${image}" width="512px" />`;
	} catch (error) {
		console.error(`Error: ${error}`);
	}
	hideSpinner();
});

function showSpinner() {
	const button = document.querySelector("button");
	button.disabled = true;
	button.innerHTML =
		'Creating Image, hold on tight... <span class="spinner">🧠</span>';
}

function hideSpinner() {
	const button = document.querySelector("button");
	button.disabled = false;
	button.innerHTML = "Create another Image";
}
