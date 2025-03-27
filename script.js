const facts = [
	"Has a pet",
	"Can solve Rubik's cube",
	"Has broken a bone",
	"Has studied abroad",
	"Takes cold showers",
	"Has climbed a mountain",
	"Has more than two siblings",
	"Can do mental math quickly",
	"Has been on TV",
	"Has donated blood",
	"Goes to gym 3x a week",
	"Has written a song",
	"Has achieved a personal goal",
	"Can speak in different accents",
	"Has been skiing",
	"Has food allergy",
	"Has performed CPR",
	"Lives alone",
	"Has won money in a lottery",
	"Can do a headstand",
	"Has been published",
	"Has organised an event",
	"Has been on a cruise",
	"Can roll their tongue",
	"Has eaten at a Michelin star restaurant",
];

let bingoGrid = [];
let selectedCells = Array(5)
	.fill()
	.map(() => Array(5).fill(false));

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

	// Center cell
	selectedFacts.splice(12, 0, "Center Fact");

	// Create bingo grid with facts
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			const fact = selectedFacts.pop();
			gridHTML += `<div onclick="toggleCell(${i}, ${j})">${fact}</div>`;
		}
	}

	// Insert grid into the page
	document.getElementById("bingo-grid").innerHTML = gridHTML;
	bingoGrid = selectedFacts;
	document.getElementById("bingo-message").textContent = "";
}

function toggleCell(row, col) {
	const cell = document.getElementById("bingo-grid").children[row * 5 + col];
	cell.classList.toggle("selected");
	selectedCells[row][col] = !selectedCells[row][col];

	checkBingo();
}

function checkBingo() {
	let bingoLines = 0;

	// Check rows and columns for bingo
	for (let i = 0; i < 5; i++) {
		if (selectedCells[i].every((cell) => cell)) bingoLines++; // Horizontal line
		if (selectedCells.every((row) => row[i])) bingoLines++; // Vertical line
	}

	// Check diagonals for bingo
	if ([0, 1, 2, 3, 4].every((i) => selectedCells[i][i])) bingoLines++; // Diagonal top-left to bottom-right
	if ([0, 1, 2, 3, 4].every((i) => selectedCells[i][4 - i])) bingoLines++; // Diagonal top-right to bottom-left

	if (bingoLines > 0) {
		document.getElementById(
			"bingo-message"
		).textContent = `BINGO! ${bingoLines} line(s) formed.`;
	}
}

function saveAsPDF() {
	const { jsPDF } = window.jspdf;
	const doc = new jsPDF();

	const gridElement = document.getElementById("bingo-grid");
	doc.html(gridElement, {
		callback: function (doc) {
			doc.save("bingo_card.pdf");
		},
		margin: [10, 10],
		x: 10,
		y: 10,
	});
}
