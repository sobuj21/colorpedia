
const colors = {
  "Red": "#FF0000",
  "Blue": "#0000FF",
  "Green": "#00FF00",
  "Gold": "#FFD700",
  "Silver": "#C0C0C0",
  "Neon Pink": "#FF6EC7",
  "Pastel Yellow": "#FAFAD2",
  "Matte Black": "#1C1C1C",
  "Metallic Blue": "#32527B"
};

const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const colorDisplay = document.getElementById('color-display');
const voiceBtn = document.getElementById('voice-btn');

function renderColor(name, hex) {
  return \`
    <div class="color-card">
      <div class="color-box" style="background: \${hex}"></div>
      <div><strong>\${name}</strong><br>\${hex}</div>
    </div>\`;
}

function searchColor() {
  const query = searchBox.value.trim().toLowerCase();
  colorDisplay.innerHTML = "";
  Object.entries(colors).forEach(([name, hex]) => {
    if (name.toLowerCase().includes(query) || hex.toLowerCase().includes(query)) {
      colorDisplay.innerHTML += renderColor(name, hex);
    }
  });
}

searchBtn.addEventListener("click", searchColor);

voiceBtn.addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();
  recognition.onresult = (event) => {
    searchBox.value = event.results[0][0].transcript;
    searchColor();
  };
});
