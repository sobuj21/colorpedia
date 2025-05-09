
const colors = [
  { name: "MATTE WHITE", hex: "#e6e9e9" },
  { name: "Soft Pink", hex: "#E89EB8" },
  { name: "Matte Red", hex: "#B33F40" },
  { name: "Glossy Red", hex: "#DD0004" },
  { name: "MATTE GREEN", hex: "#48A14D" },
  { name: "LIGHT RED", hex: "#c91100" },
  { name: "SILVER GRAY METALLIC", hex: "#8A92A6" },
  { name: "MATTE BLACK", hex: "#28282B" },
  { name: "Velvet Black", hex: "#231f20" },
  { name: "Matte Violet", hex: "#8658A5" },
  { name: "Matte Burgundy", hex: "#691C2D" },
  { name: "BRILLIANT BLUE", hex: "#2752D6" }
];

function searchColor(query) {
  const search = query.trim().toLowerCase();
  const result = colors.find(
    (color) => color.name.toLowerCase() === search || color.hex.toLowerCase() === search
  );
  if (result) {
    displayColor(result);
  } else {
    showNotFound();
  }
}

document.getElementById("searchInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("searchButton").click();
  }
});

function displayColor(color) {
  const display = document.getElementById("colorDisplay");
  display.innerHTML = \`
    <div class="color-box" style="background:${color.hex}"></div>
    <p><strong>\${color.name}</strong> - \${color.hex}</p>
  \`;
}

function showNotFound() {
  const display = document.getElementById("colorDisplay");
  display.innerHTML = "<p>No color found. Try a valid color name or hex code.</p>";
}
