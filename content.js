function showWidget() {
  const container = document.createElement("div");
  container.id = "focus-timer-widget";
  container.innerHTML = `
    <style>
      #focus-timer-widget {
        user-select: none;
      }
      .timer-mini {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: #18181b;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 2px 16px 0 rgba(80,80,120,0.18);
        border: none;
        padding: 0;
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 999999;
        transition: box-shadow 0.2s, background 0.2s;
        animation: floaty 2.5s ease-in-out infinite;
      }
      .timer-mini::before {
        content: "";
        position: absolute;
        top: -6px; left: -6px; right: -6px; bottom: -6px;
        border-radius: 50%;
        z-index: -1;
        background: conic-gradient(
          #6366f1 0deg, #a21caf 90deg, #06b6d4 180deg, #6366f1 360deg
        );
        filter: blur(2px) brightness(1.2);
        opacity: 0.7;
        animation: neon-spin 6s linear infinite;
      }
      @keyframes neon-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes floaty {
        0% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
        100% { transform: translateY(0); }
      }
      .timer-mini:hover {
        box-shadow: 0 4px 32px 0 #6366f1;
        background: #23232b;
      }
      .timer-mini.expanded {
        display: none;
      }
/* --- Custom styles for play/stop button and dropdown --- */
.genre-dropdown {
  height: 38px;
  display: flex;
  align-items: center;
  font-size: 15px;
  padding: 0 10px;
  background: #f7f7fa;
  color: #23223a;
  border: 1px solid #e0e7ef;
  box-shadow: 0 1px 4px #0001;
  border-radius: 8px;
}
.playstop-icon-btn {
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  background: #a259ff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 8px #a259ff33;
  transition: background 0.2s;
  cursor: pointer;
  outline: none;
  position: relative;
  top: 1px;
}
.playstop-icon-btn[aria-pressed="true"] {
  background: #ef4444;
}
      .timer-mini-label {
        font-size: 10px;
        margin-top: 2px;
        opacity: 0.6;
        font-weight: 400;
        letter-spacing: 1px;
      }
      .timer-expanded {
        display: none;
        width: 340px;
        position: fixed;
        top: 50%;
        left: 50%;
        background: #fff;
        border-radius: 18px;
        padding: 0;
        box-shadow: 0 8px 40px 0 rgba(80,80,120,0.18);
        color: #222;
        max-height: 92vh;
        overflow-y: auto;
        transform: translate(-50%, -50%);
        border: 1px solid #e5e7eb;
        font-family: inherit;
      }
      .timer-expanded.show {
        display: block;
      }
      .widget-header {
        background: #f3f4f6;
        padding: 18px 20px 10px 20px;
        border-radius: 18px 18px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
        user-select: none;
      }
      .widget-title {
        font-weight: 700;
        font-size: 16px;
        color: #222;
        letter-spacing: 1px;
      }
      .widget-close {
        background: none;
        border: none;
        color: #888;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        transition: background 0.2s;
      }
      .widget-close:hover {
        background: #e5e7eb;
        color: #222;
      }
      .widget-body {
        padding: 22px 20px 20px 20px;
      }
      @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
      .timer-display {
        font-size: 54px;
        text-align: center;
        margin-bottom: 10px;
        letter-spacing: 4px;
        font-family: 'Share Tech Mono', 'Consolas', 'monospace';
        font-weight: 700;
        color: #111;
        background: #f5f5f5;
        border-radius: 12px;
        box-shadow: 0 2px 12px #0001;
        padding: 12px 18px 10px 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        user-select: none;
      }
      .timer-segment {
        display: inline-block;
        min-width: 48px;
        text-align: center;
        cursor: pointer;
        transition: background 0.15s;
        border-radius: 6px;
      }
      .timer-segment.editing {
        background: #e0e7ff;
        color: #4f46e5;
      }
      .timer-segment input {
        width: 56px;
        min-width: 56px;
        max-width: 56px;
        font-size: 48px;
        font-family: inherit;
        text-align: center;
        border: none;
        outline: none;
        background: #e0e7ff;
        color: #4f46e5;
        border-radius: 6px;
        box-shadow: 0 0 0 2px #e0e7ff;
        appearance: textfield;
      }
      .timer-segment input::-webkit-outer-spin-button,
      .timer-segment input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .timer-segment input[type=number] {
        -moz-appearance: textfield;
      }
      .timer-colon {
        font-size: 48px;
        color: #222;
        margin: 0 2px;
        user-select: none;
      }
      .minute-controls {
        display: flex;
        gap: 8px;
        margin: 10px 0 18px 0;
      }
      .minute-controls button {
        flex: 1;
        padding: 8px 0;
        border: none;
        border-radius: 8px;
        background: #f3f4f6;
        color: #222;
        cursor: pointer;
        font-weight: 600;
        font-size: 13px;
        transition: background 0.2s;
      }
      .minute-controls button:hover {
        background: #e5e7eb;
      }
      .timer-controls {
        display: flex;
        gap: 8px;
        margin: 0 0 18px 0;
      }
      .timer-controls button {
        flex: 1;
        padding: 10px 0;
        border: none;
        border-radius: 8px;
        color: #fff;
        cursor: pointer;
        font-weight: 700;
        font-size: 14px;
        transition: background 0.2s;
      }
      .start-btn { background: #4f46e5; }
      .start-btn:hover { background: #6366f1; }
      .pause-btn { background: #f59e42; }
      .pause-btn:hover { background: #fbbf24; color: #222; }
      .reset-btn { background: #ef4444; }
      .reset-btn:hover { background: #f87171; }
      .divider {
        height: 1px;
        background: #e5e7eb;
        margin: 18px 0 16px 0;
        border: none;
      }
      .music-section {
        background: #f9fafb;
        padding: 14px 12px 10px 12px;
        border-radius: 10px;
        margin-bottom: 10px;
      }
      .music-section h3 {
        margin: 0 0 10px 0;
        font-size: 13px;
        font-weight: 700;
        color: #6366f1;
        letter-spacing: 1px;
      }
      .music-controls {
        display: flex;
        gap: 8px;
        margin: 0 0 10px 0;
      }
      .music-controls button {
        flex: 1;
        padding: 7px 0;
        border: none;
        border-radius: 7px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        transition: background 0.2s;
        color: #fff;
      }
      .play-btn { background: #4f46e5; }
      .play-btn:hover { background: #6366f1; }
      .stop-btn { background: #ef4444; }
      .stop-btn:hover { background: #f87171; }
      .genre-dropdown {
        height: 38px;
        display: flex;
        align-items: center;
        font-size: 15px;
        padding: 0 10px;
      }
      .genre-dropdown option {
        background: #fff;
        color: #222;
      }
      .volume-control {
        margin: 8px 0 0 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .volume-control input {
        flex: 1;
        height: 5px;
        border-radius: 3px;
        border: none;
        background: #e5e7eb;
        cursor: pointer;
        accent-color: #6366f1;
      }
      .soundcloud-container {
        display: none;
        background: #f9fafb;
        padding: 12px;
        border-radius: 10px;
        margin-top: 10px;
      }
      .soundcloud-container.show {
        display: block;
      }
      .soundcloud-container h3 {
        margin: 0 0 8px 0;
        font-size: 13px;
        font-weight: 700;
        color: #6366f1;
      }
      .soundcloud-widget {
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
      }
      /* --- Custom styles for play/stop button and dropdown --- */
      .genre-dropdown {
        height: 38px;
        display: flex;
        align-items: center;
        font-size: 15px;
        padding: 0 10px;
      }
      .playstop-icon-btn {
        width: 40px;
        height: 40px;
        min-width: 40px;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 0;
        background: #a259ff;
        border: none;
        border-radius: 50%;
        box-shadow: 0 2px 8px #a259ff33;
        transition: background 0.2s;
        cursor: pointer;
        outline: none;
        position: relative;
        top: 1px;
      }
      .playstop-icon-btn[aria-pressed="true"] {
        background: #ef4444;
      }
    </style>
    <button class="timer-mini" id="timerMini" title="Show timer">
      <span id="miniDisplay">25:00</span>
      <div class="timer-mini-label">FOCUS</div>
    </button>
    <div class="timer-expanded" id="timerExpanded">
      <div class="widget-header">
        <div class="widget-title">⏱️ Focus Timer</div>
        <button class="widget-close" id="closeBtn" title="Close">✕</button>
      </div>
      <div class="widget-body">
        <div class="timer-display" id="timerDisplay"></div>
        <div class="minute-controls">
          <button id="minusBtn">-1 min</button>
          <button id="plusBtn">+1 min</button>
        </div>
        <div class="timer-controls">
          <button class="start-btn" id="startBtn">Start</button>
          <button class="pause-btn" id="pauseBtn">Pause</button>
          <button class="reset-btn" id="resetBtn">Reset</button>
        </div>
        <div class="divider"></div>
        <div class="music-section">
          <h3>Music</h3>
          <div class="music-row" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <select class="genre-dropdown" id="genreDropdown" style="flex:1; min-width:0;">
              <option value="meditation">🧘 Meditation</option>
              <option value="just-relax">😌 Just Relax</option>
              <option value="calm-mind">🧠 Calm My Mind</option>
              <option value="calm-piano">🎹 Calm Piano</option>
              <option value="soft-piano">🎹 Soft Piano</option>
              <option value="lofi">✨ Lofi Study</option>
              <option value="lo-fi-focus">🎵 Lo-Fi Focus</option>
              <option value="right-on-target">🎯 Right On Target</option>
              <option value="fantasy-animation">🎭 Fantasy Animation</option>
              <option value="spatial-fantasy">🌌 Spatial Fantasy</option>
              <option value="acoustic">🎼 Acoustic Meditation</option>
              <option value="asmr-brain">🧠 ASMR Brain</option>
              <option value="relaxing-sleep">😴 Relaxing Sleep</option>
              <option value="rain-cocoon">🌧️ Rain Cocoon</option>
            </select>
            <button class="playstop-icon-btn" id="playStopBtn" title="Play/Stop" aria-label="Play/Stop">
              <svg id="playStopIcon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon id="playTriangle" points="6,4 18,11 6,18" fill="#fff"/>
              </svg>
            </button>
          </div>
          <div class="volume-control">
            <span>🔉</span>
            <input type="range" id="volumeSlider" min="0" max="100" value="50">
            <span>🔊</span>
          </div>
        </div>
        <div class="soundcloud-container" id="soundcloudContainer">
          <h3>SoundCloud</h3>
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
  // stores the session length (in seconds) at the moment the user pressed Start
  let startDurationSeconds = null;
  
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
  const playStopBtn = document.getElementById("playStopBtn");
  const volumeSlider = document.getElementById("volumeSlider");
  const genreDropdown = document.getElementById("genreDropdown");
  const soundcloudContainer = document.getElementById("soundcloudContainer");
  const widgetHeader = document.querySelector(".widget-header");
  
  let audio = null;
  let isMusicPlaying = false;
  
  // Listen for stop message from background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "stopMusic" && audio) {
      audio.pause();
      audio.currentTime = 0;
      isMusicPlaying = false;
      updatePlayStopBtn();
      setMiniWidgetPlayingState(false);
      sendResponse({ success: true });
    }
  });

  function updatePlayStopBtn() {
    const icon = document.getElementById("playStopIcon");
    if (!icon) return;
    icon.innerHTML = isMusicPlaying
      ? '<rect x="6" y="5" width="3.5" height="12" rx="1.2" fill="#fff"/><rect x="12.5" y="5" width="3.5" height="12" rx="1.2" fill="#fff"/>'
      : '<polygon id="playTriangle" points="6,4 18,11 6,18" fill="#fff"/>';
    playStopBtn.setAttribute('aria-pressed', isMusicPlaying ? 'true' : 'false');
  }
  function setMiniWidgetPlayingState(playing) {
    const mini = document.getElementById("timerMini");
    if (mini) {
      if (playing) mini.classList.add("playing");
      else mini.classList.remove("playing");
    }
  }

  playStopBtn.addEventListener("click", () => {
    if (!isMusicPlaying) {
      const genre = genreDropdown.value;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      chrome.runtime.sendMessage({ action: "getMusicUrl", genre: genre }, (response) => {
        if (!audio) {
          audio = document.createElement("audio");
          audio.setAttribute("preload", "auto");
          audio.setAttribute("crossorigin", "anonymous");
          audio.type = "audio/mpeg";
        }
        audio.src = response.url;
        audio.loop = true;
        audio.volume = volumeSlider.value / 100;
        audio.play().then(() => {
          isMusicPlaying = true;
          updatePlayStopBtn();
          setMiniWidgetPlayingState(true);
        }).catch(err => {
          setTimeout(() => {
            audio.play().then(() => {
              isMusicPlaying = true;
              updatePlayStopBtn();
              setMiniWidgetPlayingState(true);
            }).catch(e => console.log("Audio play error:", e));
          }, 200);
          console.log("Audio play error:", err);
        });
      });
    } else {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        chrome.runtime.sendMessage({ action: "musicStopped" });
      }
      isMusicPlaying = false;
      updatePlayStopBtn();
      setMiniWidgetPlayingState(false);
    }
  });
  updatePlayStopBtn();

  // Auto play new music if changed while playing
  genreDropdown.addEventListener("change", () => {
    if (isMusicPlaying) {
      // stop current audio if any
      if (audio) {
        try { audio.pause(); } catch(e) {}
        audio.currentTime = 0;
      }
      const genre = genreDropdown.value;
      chrome.runtime.sendMessage({ action: "getMusicUrl", genre: genre }, (response) => {
        if (!audio) {
          audio = document.createElement("audio");
          audio.setAttribute("preload", "auto");
          audio.setAttribute("crossorigin", "anonymous");
          audio.type = "audio/mpeg";
        }
        audio.src = response.url;
        audio.loop = true;
        audio.volume = volumeSlider.value / 100;
        // Ensure play attempt always happens (handle promise)
        audio.play().then(() => {
          isMusicPlaying = true;
          updatePlayStopBtn();
          setMiniWidgetPlayingState(true);
        }).catch(err => {
          // Retry once after a short delay
          setTimeout(() => {
            audio.play().then(() => {
              isMusicPlaying = true;
              updatePlayStopBtn();
              setMiniWidgetPlayingState(true);
            }).catch(e => console.log("Audio play error on change:", e));
          }, 200);
          console.log("Audio play error on change:", err);
        });
      });
    }
  });
  
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  // returns a human-friendly duration string for TTS/notifications
  function formatDurationForTTS(totalSeconds) {
    if (!totalSeconds || totalSeconds <= 0) return 'a short';
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (mins > 0 && secs === 0) {
      return mins === 1 ? '1 minute' : `${mins} minutes`;
    }
    if (mins > 0) {
      const minPart = mins === 1 ? '1 minute' : `${mins} minutes`;
      const secPart = secs === 1 ? '1 second' : `${secs} seconds`;
      return `${minPart} and ${secPart}`;
    }
    // only seconds
    return secs === 1 ? '1 second' : `${secs} seconds`;
  }
  
  // Digital timer rendering and editing
  let editingPart = null; // 'min' or 'sec'
  function renderTimerDisplay() {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    timerDisplay.innerHTML = `
      <span class="timer-segment${editingPart==='min' ? ' editing' : ''}" id="timerMinSeg">${editingPart==='min'?`<input id='timerMinInput' type='number' min='0' max='99' value='${String(mins).padStart(2,'0')}' />`:String(mins).padStart(2,'0')}</span>
      <span class="timer-colon">:</span>
      <span class="timer-segment${editingPart==='sec' ? ' editing' : ''}" id="timerSecSeg">${editingPart==='sec'?`<input id='timerSecInput' type='number' min='0' max='59' value='${String(secs).padStart(2,'0')}' />`:String(secs).padStart(2,'0')}</span>
    `;
    miniDisplay.textContent = String(mins).padStart(2,'0')+":"+String(secs).padStart(2,'0');
    // Add event listeners for editing
    if (!editingPart) {
      document.getElementById('timerMinSeg').onclick = () => startEdit('min');
      document.getElementById('timerSecSeg').onclick = () => startEdit('sec');
    } else {
      const input = document.getElementById(editingPart==='min'?'timerMinInput':'timerSecInput');
      if (input) {
        input.focus();
        input.select();
        input.onblur = finishEdit;
        input.onkeydown = (e) => {
          if (e.key === 'Enter') { finishEdit(); }
          if (e.key === 'Escape') { editingPart=null; renderTimerDisplay(); }
          if (e.key === 'ArrowUp') { input.value = Math.min(Number(input.value)+1, editingPart==='min'?99:59); }
          if (e.key === 'ArrowDown') { input.value = Math.max(Number(input.value)-1, 0); }
        };
      }
    }
  }
  function startEdit(part) {
    editingPart = part;
    renderTimerDisplay();
  }
  function finishEdit() {
    const minVal = editingPart==='min' ? Number(document.getElementById('timerMinInput').value) : Math.floor(timeInSeconds/60);
    const secVal = editingPart==='sec' ? Number(document.getElementById('timerSecInput').value) : (timeInSeconds%60);
    timeInSeconds = Math.max(0, Math.min(99*60+59, minVal*60+secVal));
    editingPart = null;
    renderTimerDisplay();
  }
  function updateDisplay() {
    renderTimerDisplay();
  }
  // ...existing code...
  
  function getPageInfo() {
    const url = window.location.hostname || window.location.href;
    return url.split('.')[0] || 'this page';
  }
  
  function playNotification() {
    const pageInfo = getPageInfo();
    const durationText = formatDurationForTTS(startDurationSeconds || 25 * 60);
    
    // Play a beautiful alarm sound (short melody)
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      function tone(freq, start, duration, vol=0.18) {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.value = freq;
        g.gain.value = vol;
        o.connect(g).connect(ctx.destination);
        o.start(now + start);
        o.stop(now + start + duration);
      }
      // Melody: C5, E5, G5, C6, repeat for more attention
      tone(523.25, 0, 0.22);
      tone(659.25, 0.22, 0.22);
      tone(783.99, 0.44, 0.22);
      tone(1046.5, 0.66, 0.32, 0.22);
      tone(783.99, 1.08, 0.22, 0.16);
      tone(659.25, 1.30, 0.22, 0.13);
      tone(523.25, 1.52, 0.28, 0.10);
    } catch(e) {}
    
    // TTS announcement with page name
    if (window.speechSynthesis) {
      setTimeout(() => {
        const message = `Timer complete on ${pageInfo}. Your ${durationText} focus session has finished.`;
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.65; // a bit faster
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }, 1300);
    }
    
    // System notification
    if (Notification.permission === "granted") {
      new Notification("Focus Timer Complete! ⏱️", {
        body: `${durationText} session finished on ${pageInfo}`,
        icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23667eea' width='100' height='100'/><text x='50' y='60' text-anchor='middle' font-size='50' fill='white'>✓</text></svg>"
      });
    }
  }
  
  startBtn.addEventListener("click", () => {
    if (!isRunning) {
      // Capture the duration the user started the session with
      startDurationSeconds = timeInSeconds;
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
    startDurationSeconds = null;
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
  
  
  volumeSlider.addEventListener("input", () => {
    if (audio) {
      audio.volume = volumeSlider.value / 100;
    }
  });
  
  // Dragging functionality for mini widget
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let dragStartX = 0;
  let dragStartY = 0;
  
  // Improved drag and click for mini widget
  timerMini.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    const rect = timerMini.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
  });
  timerMini.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const distance = Math.sqrt(
      Math.pow(e.clientX - dragStartX, 2) + 
      Math.pow(e.clientY - dragStartY, 2)
    );
    if (distance < 5) {
      timerMini.classList.add("expanded");
      timerExpanded.classList.add("show");
    }
  });
  
  closeBtn.addEventListener("click", () => {
    timerMini.classList.remove("expanded");
    timerExpanded.classList.remove("show");
  });
  
  // Dragging functionality for expanded panel
  let isPanelDragging = false;
  let panelDragStartX = 0;
  let panelDragStartY = 0;
  let panelStartLeft = 0;
  let panelStartTop = 0;
  
  widgetHeader.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isPanelDragging = true;
    panelDragStartX = e.clientX;
    panelDragStartY = e.clientY;
    const rect = timerExpanded.getBoundingClientRect();
    panelStartLeft = rect.left;
    panelStartTop = rect.top;
    timerExpanded.style.transform = "none";
    timerExpanded.style.left = panelStartLeft + "px";
    timerExpanded.style.top = panelStartTop + "px";
  });
  
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const newLeft = e.clientX - dragOffsetX;
      const newTop = e.clientY - dragOffsetY;
      timerMini.style.left = newLeft + "px";
      timerMini.style.top = newTop + "px";
      timerMini.style.right = "auto";
      timerMini.style.bottom = "auto";
    }
    
    if (isPanelDragging) {
      const deltaX = e.clientX - panelDragStartX;
      const deltaY = e.clientY - panelDragStartY;
      timerExpanded.style.left = (panelStartLeft + deltaX) + "px";
      timerExpanded.style.top = (panelStartTop + deltaY) + "px";
    }
  });
  
  document.addEventListener("mouseup", () => {
    isDragging = false;
    isPanelDragging = false;
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
    if (response && response.showSoundCloudWidget === false) {
      soundcloudContainer.classList.remove("show");
      return;
    }
    if (response && response.soundcloudUrl) {
      soundcloudContainer.classList.add("show");
      const iframeSrc = `https://w.soundcloud.com/player/?url=${encodeURIComponent(response.soundcloudUrl)}&color=%23764ba2&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false`;
      soundcloudWidget.innerHTML = `<iframe width="100%" height="166" scrolling="no" frameborder="no" src="${iframeSrc}"></iframe>`;
    } else {
      soundcloudContainer.classList.remove("show");
    }
  });
}

// Only show widget if autoShowWidget is enabled, or on demand
function tryShowWidgetBySetting() {
  showWidget();
}

// Listen for message from background to show/hide/toggle widget
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request && request.action === "showWidget") {
    showWidget();
    sendResponse({ success: true });
  }
  if (request && request.action === "toggleWidget") {
    const existing = document.getElementById("focus-timer-widget");
    if (existing) {
      existing.remove();
      sendResponse({ toggled: "removed" });
    } else {
      showWidget();
      sendResponse({ toggled: "shown" });
    }
  }
});

if (document.body) {
  tryShowWidgetBySetting();
} else {
  document.addEventListener("DOMContentLoaded", tryShowWidgetBySetting);
}
