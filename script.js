let facts = [];
let githubUrl = ""; // Variable to hold the GitHub URL
let bingoGrid = [];
let selectedCells = Array(5)
	.fill()
	.map(() => Array(5).fill(false));

window.onload = function () {
	// Load the config file for the GitHub URL
	fetch("config.json")
		.then((response) => response.json())
		.then((config) => {
			githubUrl = config.githubUrl;
			generateQRCode(); // Generate QR code after loading the URL
		})
		.catch((error) => console.error("Error loading config file:", error));

	// Load facts from the external JSON file
	fetch("facts.json")
		.then((response) => response.json())
		.then((data) => {
			facts = data.facts;
		})
		.catch((error) => console.error("Error loading facts:", error));
};

function generateBingo() {
	if (facts.length === 0) {
		alert("Facts not loaded yet!");
		return;
	}

	const selectedFacts = [];
	let gridHTML = "";

	// Randomly pick 25 facts from the facts array
	while (selectedFacts.length < 25) {
		const randomIndex = Math.floor(Math.random() * facts.length);
		const randomFact = facts[randomIndex];

		if (!selectedFacts.includes(randomFact)) {
			selectedFacts.push(randomFact);
		}
	}

	// Create bingo grid with facts
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			gridHTML += `<div onclick="toggleCell(${i}, ${j})">${selectedFacts.pop()}</div>`;
		}
	}

	// Insert grid into the page and display border
	document.getElementById("bingo-grid").innerHTML = gridHTML;
	document.getElementById("bingo-grid").style.border = "5px solid #000"; // Outer border only after generation
	bingoGrid = selectedFacts;
	selectedCells = Array(5)
		.fill()
		.map(() => Array(5).fill(false));

	// Hide the "Generate Bingo Card" button
	document.getElementById("generate-button").style.display = "none";

	// Remove the QR code after generating the Bingo card
	document.getElementById("qr-code").style.display = "none";

	// Show the bingo callout
	document.getElementById("bingo-callout").style.display = "none"; // Hide initially
	document.getElementById("bingo-callout").innerHTML = "";
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
		document.getElementById("bingo-callout").style.display = "block";
		document.getElementById(
			"bingo-callout"
		).innerHTML = `BINGO! ${bingoLines} line(s) formed.`;
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

// QR Code for GitHub Page
function generateQRCode() {
	if (!githubUrl) {
		console.error("GitHub URL is not loaded yet");
		return;
	}

	const qrCodeElement = document.getElementById("qr-code");
	const qrCodeImg = new Image();
	qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
		githubUrl
	)}`;
	qrCodeElement.appendChild(qrCodeImg);
}

// Function to capture the screenshot and allow image download
function captureScreenshotAndDownload() {
	html2canvas(document.body).then((canvas) => {
		// Create an image from the canvas
		const imageUrl = canvas.toDataURL("image/png");

		// Create a download link
		const link = document.createElement("a");
		link.href = imageUrl;
		link.download = "bingo_card.png";

		// Trigger download
		link.click();
	});
}
