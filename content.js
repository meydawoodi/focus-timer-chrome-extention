function showWidget() {
  const container = document.createElement("div");
  container.id = "focus-timer-widget";
  container.innerHTML = `
    <style>
      #focus-timer-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999999;
        font-family: 'Courier New', monospace;
        user-select: none;
      }
      
      .timer-mini {
        width: 85px;
        height: 85px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        transition: all 0.3s ease;
      }
      
      .timer-mini:hover {
        transform: scale(1.05);
        box-shadow: 0 12px 25px rgba(102, 126, 234, 0.4);
      }
      
      .timer-mini.expanded {
        display: none;
      }
      
      .timer-expanded {
        display: none;
        width: 320px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 15px;
        padding: 0;
        box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
        color: white;
      }
      
      .timer-expanded.show {
        display: block;
      }
      
      .widget-header {
        background: rgba(0, 0, 0, 0.1);
        padding: 15px;
        border-radius: 15px 15px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .widget-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 25px;
        height: 25px;
      }
      
      .widget-body {
        padding: 20px;
        max-height: 600px;
        overflow-y: auto;
      }
      
      .timer-display {
        font-size: 56px;
        text-align: center;
        margin-bottom: 20px;
        letter-spacing: 5px;
      }
      
      .volume-control {
        margin: 15px 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .volume-control input {
        flex: 1;
        height: 6px;
        border-radius: 3px;
        border: none;
        background: rgba(255, 255, 255, 0.2);
        cursor: pointer;
      }
      
      .music-section {
        background: rgba(255, 255, 255, 0.1);
        padding: 15px;
        border-radius: 10px;
        margin: 15px 0;
      }
      
      .music-section h3 {
        margin: 0 0 10px 0;
        font-size: 14px;
      }
      
      .music-controls {
        display: flex;
        gap: 8px;
        margin-bottom: 10px;
      }
      
      .music-controls button {
        flex: 1;
        padding: 8px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s;
      }
      
      .music-controls .play-btn {
        background: #4CAF50;
      }
      
      .music-controls .stop-btn {
        background: #f44336;
      }
      
      .music-controls .play-btn:hover {
        background: #45a049;
      }
      
      .music-controls .stop-btn:hover {
        background: #da190b;
      }
      
      .genre-dropdown {
        width: 100%;
        padding: 8px;
        border: none;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        cursor: pointer;
        margin-bottom: 10px;
      }
      
      .genre-dropdown option {
        background: #333;
        color: white;
      }
      
      .soundcloud-container {
        display: none;
        background: rgba(255, 255, 255, 0.1);
        padding: 15px;
        border-radius: 10px;
        margin: 15px 0;
        border-top: 2px solid rgba(255, 255, 255, 0.2);
      }
      
      .soundcloud-container.show {
        display: block;
      }
      
      .soundcloud-container h3 {
        margin: 0 0 10px 0;
        font-size: 14px;
      }
      
      .soundcloud-widget {
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
      }
      
      .minute-controls {
        display: flex;
        gap: 8px;
        margin: 15px 0;
      }
      
      .minute-controls button {
        flex: 1;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background: #2196F3;
        color: white;
        cursor: pointer;
        font-weight: bold;
      }
      
      .minute-controls button:hover {
        background: #0b7dda;
      }
      
      .timer-controls {
        display: flex;
        gap: 8px;
        margin: 15px 0;
      }
      
      .timer-controls button {
        flex: 1;
        padding: 10px;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        font-weight: bold;
        font-size: 12px;
      }
      
      .start-btn {
        background: #4CAF50;
      }
      
      .start-btn:hover {
        background: #45a049;
      }
      
      .pause-btn {
        background: #FF9800;
      }
      
      .pause-btn:hover {
        background: #e68900;
      }
      
      .reset-btn {
        background: #f44336;
      }
      
      .reset-btn:hover {
        background: #da190b;
      }
    </style>
    
    <div class="timer-mini" id="timerMini">
      <span id="miniDisplay">25:00</span>
    </div>
    
    <div class="timer-expanded" id="timerExpanded">
      <div class="widget-header">
        <div></div>
        <button class="widget-close" id="closeBtn">✕</button>
      </div>
      <div class="widget-body">
        <div class="timer-display" id="timerDisplay">25:00</div>
        
        <div class="volume-control">
          <span>🔉</span>
          <input type="range" id="volumeSlider" min="0" max="100" value="50">
          <span>🔊</span>
        </div>
        
        <div class="music-section">
          <h3>🎵 Pixabay Music</h3>
          <div class="music-controls">
            <button class="play-btn" id="playBtn">▶️ Play</button>
            <button class="stop-btn" id="stopBtn">⏹️ Stop</button>
          </div>
          <select class="genre-dropdown" id="genreDropdown">
            <option value="acoustic">Acoustic</option>
            <option value="lofi">Lofi</option>
            <option value="button-smash">Button Smash</option>
            <option value="friday">Friday</option>
            <option value="synthwave">Synthwave</option>
            <option value="heros-journey">Hero's Journey</option>
          </select>
        </div>
        
        <div class="soundcloud-container" id="soundcloudContainer">
          <h3>🎧 SoundCloud</h3>
          <div class="soundcloud-widget" id="soundcloudWidget"></div>
        </div>
        
        <div class="minute-controls">
          <button id="minusBtn">⏱️ -1 min</button>
          <button id="plusBtn">⏱️ +1 min</button>
        </div>
        
        <div class="timer-controls">
          <button class="start-btn" id="startBtn">START</button>
          <button class="pause-btn" id="pauseBtn">PAUSE</button>
          <button class="reset-btn" id="resetBtn">RESET</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(container);
  
  // Timer logic
  let timeInSeconds = 25 * 60;
  let timerInterval = null;
  let isRunning = false;
  
  const timerDisplay = document.getElementById("timerDisplay");
  const miniDisplay = document.getElementById("miniDisplay");
  const timerMini = document.getElementById("timerMini");
  const timerExpanded = document.getElementById("timerExpanded");
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resetBtn = document.getElementById("resetBtn");
  const minusBtn = document.getElementById("minusBtn");
  const plusBtn = document.getElementById("plusBtn");
  const closeBtn = document.getElementById("closeBtn");
  const playBtn = document.getElementById("playBtn");
  const stopBtn = document.getElementById("stopBtn");
  const volumeSlider = document.getElementById("volumeSlider");
  const genreDropdown = document.getElementById("genreDropdown");
  const soundcloudContainer = document.getElementById("soundcloudContainer");
  
  let audio = null;
  
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  
  function updateDisplay() {
    const formatted = formatTime(timeInSeconds);
    timerDisplay.textContent = formatted;
    miniDisplay.textContent = formatted;
  }
  
  function playNotification() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
    
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance("Timer complete!");
      speechSynthesis.speak(utterance);
    }
    
    if (Notification.permission === "granted") {
      new Notification("Focus Timer", {
        body: "Your timer has completed!",
        icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23667eea' width='100' height='100'/><text x='50' y='60' text-anchor='middle' font-size='40' fill='white'>✓</text></svg>"
      });
    }
  }
  
  startBtn.addEventListener("click", () => {
    if (!isRunning) {
      isRunning = true;
      timerInterval = setInterval(() => {
        if (timeInSeconds > 0) {
          timeInSeconds--;
          updateDisplay();
        } else {
          clearInterval(timerInterval);
          isRunning = false;
          playNotification();
        }
      }, 1000);
    }
  });
  
  pauseBtn.addEventListener("click", () => {
    if (isRunning) {
      clearInterval(timerInterval);
      isRunning = false;
    }
  });
  
  resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
    timeInSeconds = 25 * 60;
    updateDisplay();
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
  
  minusBtn.addEventListener("click", () => {
    if (timeInSeconds >= 60) {
      timeInSeconds -= 60;
      updateDisplay();
    }
  });
  
  plusBtn.addEventListener("click", () => {
    timeInSeconds += 60;
    updateDisplay();
  });
  
  playBtn.addEventListener("click", () => {
    const genre = genreDropdown.value;
    chrome.runtime.sendMessage({ action: "getMusicUrl", genre: genre }, (response) => {
      if (!audio) {
        audio = new Audio();
        audio.loop = true;
      }
      audio.src = response.url;
      audio.volume = volumeSlider.value / 100;
      audio.play().catch(err => console.log("Autoplay blocked"));
    });
  });
  
  stopBtn.addEventListener("click", () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      chrome.runtime.sendMessage({ action: "musicStopped" });
    }
  });
  
  volumeSlider.addEventListener("input", () => {
    if (audio) {
      audio.volume = volumeSlider.value / 100;
    }
  });
  
  timerMini.addEventListener("click", () => {
    timerMini.classList.add("expanded");
    timerExpanded.classList.add("show");
  });
  
  closeBtn.addEventListener("click", () => {
    timerMini.classList.remove("expanded");
    timerExpanded.classList.remove("show");
  });
  
  // Dragging functionality
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  
  timerMini.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragOffsetX = e.clientX - timerMini.offsetLeft;
    dragOffsetY = e.clientY - timerMini.offsetTop;
  });
  
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      timerMini.style.bottom = "auto";
      timerMini.style.right = "auto";
      timerMini.style.left = (e.clientX - dragOffsetX) + "px";
      timerMini.style.top = (e.clientY - dragOffsetY) + "px";
    }
  });
  
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
  
  // Load SoundCloud widget if URL is saved
  loadSoundCloudWidget();
  
  // Request notification permission
  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
  
  updateDisplay();
}

function loadSoundCloudWidget() {
  chrome.runtime.sendMessage({ action: "getSettings" }, (response) => {
    const soundcloudContainer = document.getElementById("soundcloudContainer");
    const soundcloudWidget = document.getElementById("soundcloudWidget");
    
    if (response.soundcloudUrl) {
      soundcloudContainer.classList.add("show");
      const iframeSrc = `https://w.soundcloud.com/player/?url=${encodeURIComponent(response.soundcloudUrl)}&color=%23764ba2&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false`;
      soundcloudWidget.innerHTML = `<iframe width="100%" height="166" scrolling="no" frameborder="no" src="${iframeSrc}"></iframe>`;
    } else {
      soundcloudContainer.classList.remove("show");
    }
  });
}

// Initialize widget when DOM is ready
if (document.body) {
  showWidget();
} else {
  document.addEventListener("DOMContentLoaded", showWidget);
}
