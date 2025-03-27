const facts = [
	"Fact 1",
	"Fact 2",
	"Fact 3",
	"Fact 4",
	"Fact 5",
	"Fact 6",
	"Fact 7",
	"Fact 8",
	"Fact 9",
	"Fact 10",
	"Fact 11",
	"Fact 12",
	"Fact 13",
	"Fact 14",
	"Fact 15",
	"Fact 16",
	"Fact 17",
	"Fact 18",
	"Fact 19",
	"Fact 20",
	"Fact 21",
	"Fact 22",
	"Fact 23",
	"Fact 24",
	"Fact 25",
	"Fact 26",
	"Fact 27",
	"Fact 28",
	"Fact 29",
	"Fact 30",
	"Fact 31",
	"Fact 32",
	"Fact 33",
	"Fact 34",
	"Fact 35",
	"Fact 36",
	"Fact 37",
	"Fact 38",
	"Fact 39",
	"Fact 40",
	"Fact 41",
	"Fact 42",
	"Fact 43",
	"Fact 44",
	"Fact 45",
	"Fact 46",
	"Fact 47",
	"Fact 48",
	"Fact 49",
	"Fact 50",
];

function generateBingo() {
	const selectedFacts = [];
	let gridHTML = "";

	// Randomly pick 24 facts from the facts array
	while (selectedFacts.length < 24) {
		const randomIndex = Math.floor(Math.random() * facts.length);
		const randomFact = facts[randomIndex];

		if (!selectedFacts.includes(randomFact)) {
			selectedFacts.push(randomFact);
		}
	}

	// Create bingo grid with the facts, leaving center blank
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			if (i === 2 && j === 2) {
				gridHTML += '<div class="center">FREE</div>';
			} else {
				gridHTML += `<div>${selectedFacts.pop()}</div>`;
			}
		}
	}

	// Insert grid into the page
	document.getElementById("bingo-grid").innerHTML = gridHTML;
}
