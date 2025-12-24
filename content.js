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
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
        font-weight: bold;
        cursor: move;
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        transition: all 0.3s ease;
        border: none;
        padding: 0;
      }
      
      .timer-mini:hover {
        transform: scale(1.05);
        box-shadow: 0 12px 25px rgba(102, 126, 234, 0.4);
      }
      
      .timer-mini.expanded {
        display: none;
      }
      
      .timer-mini-label {
        font-size: 9px;
        margin-top: 3px;
        opacity: 0.8;
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
        max-height: 90vh;
        overflow-y: auto;
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
        cursor: move;
        user-select: none;
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
        transition: transform 0.2s;
      }
      
      .widget-close:hover {
        transform: scale(1.2);
      }
      
      .widget-body {
        padding: 20px;
      }
      
      .timer-display {
        font-size: 56px;
        text-align: center;
        margin-bottom: 15px;
        letter-spacing: 5px;
        font-weight: bold;
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
        font-size: 13px;
        transition: all 0.2s;
      }
      
      .minute-controls button:hover {
        background: #0b7dda;
        transform: translateY(-2px);
      }
      
      .minute-controls button:active {
        transform: translateY(0);
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
        transition: all 0.2s;
      }
      
      .start-btn {
        background: #4CAF50;
      }
      
      .start-btn:hover {
        background: #45a049;
        transform: translateY(-2px);
      }
      
      .pause-btn {
        background: #FF9800;
      }
      
      .pause-btn:hover {
        background: #e68900;
        transform: translateY(-2px);
      }
      
      .reset-btn {
        background: #f44336;
      }
      
      .reset-btn:hover {
        background: #da190b;
        transform: translateY(-2px);
      }
      
      .divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.2);
        margin: 15px 0;
      }
      
      .music-section {
        background: rgba(255, 255, 255, 0.1);
        padding: 15px;
        border-radius: 10px;
      }
      
      .music-section h3 {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 600;
      }
      
      .volume-control {
        margin: 12px 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .volume-control input {
        flex: 1;
        height: 6px;
        border-radius: 3px;
        border: none;
        background: rgba(255, 255, 255, 0.2);
        cursor: pointer;
        accent-color: #4CAF50;
      }
      
      .music-controls {
        display: flex;
        gap: 8px;
        margin: 12px 0;
      }
      
      .music-controls button {
        flex: 1;
        padding: 8px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        transition: all 0.2s;
        color: white;
      }
      
      .play-btn {
        background: #4CAF50;
      }
      
      .play-btn:hover {
        background: #45a049;
      }
      
      .stop-btn {
        background: #f44336;
      }
      
      .stop-btn:hover {
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
        font-size: 13px;
        margin-bottom: 12px;
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
        margin-top: 12px;
      }
      
      .soundcloud-container.show {
        display: block;
      }
      
      .soundcloud-container h3 {
        margin: 0 0 10px 0;
        font-size: 14px;
        font-weight: 600;
      }
      
      .soundcloud-widget {
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
      }
    </style>
    
    <button class="timer-mini" id="timerMini" title="Drag to move">
      <span id="miniDisplay">25:00</span>
      <div class="timer-mini-label">FOCUS</div>
    </button>
    
    <div class="timer-expanded" id="timerExpanded">
      <div class="widget-header">
        <div style="font-weight: bold;">⏱️ Timer</div>
        <button class="widget-close" id="closeBtn" title="Close">✕</button>
      </div>
      <div class="widget-body">
        <div class="timer-display" id="timerDisplay">25:00</div>
        
        <div class="minute-controls">
          <button id="minusBtn">⏱️ -1 min</button>
          <button id="plusBtn">⏱️ +1 min</button>
        </div>
        
        <div class="timer-controls">
          <button class="start-btn" id="startBtn">▶️ START</button>
          <button class="pause-btn" id="pauseBtn">⏸️ PAUSE</button>
          <button class="reset-btn" id="resetBtn">↻ RESET</button>
        </div>
        
        <div class="divider"></div>
        
        <div class="music-section">
          <h3>🎵 Music</h3>
          <div class="music-controls">
            <button class="play-btn" id="playBtn">▶️ Play</button>
            <button class="stop-btn" id="stopBtn">⏹️ Stop</button>
          </div>
          
          <select class="genre-dropdown" id="genreDropdown">
            <option value="acoustic">🎸 Acoustic</option>
            <option value="lofi">☕ Lofi</option>
            <option value="button-smash">🎮 Button Smash</option>
            <option value="friday">🎉 Friday</option>
            <option value="synthwave">🌆 Synthwave</option>
            <option value="heros-journey">🗺️ Hero's Journey</option>
          </select>
          
          <div class="volume-control">
            <span>🔉</span>
            <input type="range" id="volumeSlider" min="0" max="100" value="50">
            <span>🔊</span>
          </div>
        </div>
        
        <div class="soundcloud-container" id="soundcloudContainer">
          <h3>🎧 SoundCloud</h3>
          <div class="soundcloud-widget" id="soundcloudWidget"></div>
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
  const widgetHeader = document.querySelector(".widget-header");
  
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
  
  function getPageInfo() {
    const url = window.location.hostname || window.location.href;
    return url.split('.')[0] || 'this page';
  }
  
  function playNotification() {
    const pageInfo = getPageInfo();
    const initialMinutes = Math.floor(25 * 60 / 60); // 25 minutes
    
    // Web Audio beep
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
    // TTS announcement with page name
    if (window.speechSynthesis) {
      setTimeout(() => {
        const message = `Timer complete on ${pageInfo}. Your ${initialMinutes} minute focus session has finished.`;
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }, 300);
    }
    
    // System notification
    if (Notification.permission === "granted") {
      new Notification("Focus Timer Complete! ⏱️", {
        body: `${initialMinutes} minute session finished on ${pageInfo}`,
        icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23667eea' width='100' height='100'/><text x='50' y='60' text-anchor='middle' font-size='50' fill='white'>✓</text></svg>"
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
        audio.crossOrigin = "anonymous";
        audio.loop = true;
      }
      audio.src = response.url;
      audio.volume = volumeSlider.value / 100;
      audio.play().catch(err => console.log("Audio play blocked:", err));
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
  
  timerMini.addEventListener("click", (e) => {
    if (e.button === 0 && !isMinimumDragging) {
      timerMini.classList.add("expanded");
      timerExpanded.classList.add("show");
    }
  });
  
  closeBtn.addEventListener("click", () => {
    timerMini.classList.remove("expanded");
    timerExpanded.classList.remove("show");
  });
  
  // Dragging functionality for mini widget
  let isDragging = false;
  let isMinimumDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let startX = 0;
  let startY = 0;
  
  timerMini.addEventListener("mousedown", (e) => {
    isDragging = true;
    isMinimumDragging = false;
    startX = e.clientX;
    startY = e.clientY;
    dragOffsetX = e.clientX - timerMini.offsetLeft;
    dragOffsetY = e.clientY - timerMini.offsetTop;
  });
  
  // Dragging functionality for expanded panel
  let isPanelDragging = false;
  let panelDragOffsetX = 0;
  let panelDragOffsetY = 0;
  
  widgetHeader.addEventListener("mousedown", (e) => {
    isPanelDragging = true;
    const rect = timerExpanded.getBoundingClientRect();
    panelDragOffsetX = e.clientX - rect.left;
    panelDragOffsetY = e.clientY - rect.top;
  });
  
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const distance = Math.sqrt(Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2));
      if (distance > 5) {
        isMinimumDragging = true;
      }
      
      timerMini.style.bottom = "auto";
      timerMini.style.right = "auto";
      timerMini.style.left = (e.clientX - dragOffsetX) + "px";
      timerMini.style.top = (e.clientY - dragOffsetY) + "px";
      timerMini.style.cursor = "grabbing";
    }
    
    if (isPanelDragging) {
      timerExpanded.style.transform = `translate(calc(-50% + ${e.clientX - panelDragOffsetX}px), calc(-50% + ${e.clientY - panelDragOffsetY}px))`;
      timerExpanded.style.cursor = "grabbing";
    }
  });
  
  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      timerMini.style.cursor = "move";
    }
    if (isPanelDragging) {
      isPanelDragging = false;
      timerExpanded.style.cursor = "move";
    }
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
    
    if (response && response.soundcloudUrl) {
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
