const colorData = {
  "Red": "#FF0000",
  "Green": "#00FF00",
  "Blue": "#0000FF",
  "Gold": "#FFD700",
  "Silver": "#C0C0C0",
  "Black": "#000000",
  "White": "#FFFFFF"
};

const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const voiceBtn = document.getElementById('voice-btn');
const colorDisplay = document.getElementById('color-display');
const filterSelect = document.getElementById('filter-select');
const paletteBtn = document.getElementById('generate-palette-btn');

function renderColor(name, hex, finish = "standard") {
  const finishClass = finish === "matte" ? "matte" : finish === "metallic" ? "metallic" : "";
  return \`<div class="color-card">
            <div class="color-box \${finishClass}" style="background:\${hex}"></div>
            <div class="color-info">
              <strong>\${name}</strong><br>\${hex}<br>\${finish}
            </div>
          </div>\`;
}

function displayColor(name, hex) {
  const finish = filterSelect.value;
  const finishes = finish === "all" ? ["standard", "matte", "metallic"] : [finish];
  colorDisplay.innerHTML = finishes.map(f => renderColor(name, hex, f)).join('');
}

function findColor() {
  const query = searchBox.value.trim();
  let hex = "";
  if (colorData[query]) {
    hex = colorData[query];
    displayColor(query, hex);
  } else if (/^#?[0-9A-F]{6}$/i.test(query)) {
    hex = query.startsWith("#") ? query : "#" + query;
    const found = Object.entries(colorData).find(([, val]) => val.toLowerCase() === hex.toLowerCase());
    displayColor(found ? found[0] : "Custom Color", hex);
  } else {
    colorDisplay.innerHTML = "<p>Color not found</p>";
  }
}

searchBtn.addEventListener("click", findColor);
paletteBtn.addEventListener("click", () => alert("Palette generation coming soon!"));

// Voice input
voiceBtn.addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.onresult = event => {
    searchBox.value = event.results[0][0].transcript;
    findColor();
  };
  recognition.start();
});
