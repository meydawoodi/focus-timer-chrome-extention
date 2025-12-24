// Toggle widget on extension icon click
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { action: "toggleWidget" });
  }
});
const musicGenres = {
  meditation: "https://cdn.pixabay.com/download/audio/2025/12/21/audio_f29fc9b06f.mp3?filename=meditation-455105.mp3",
  "just-relax": "https://cdn.pixabay.com/download/audio/2021/11/23/audio_64b2dd1bce.mp3?filename=just-relax-11157.mp3",
  "calm-mind": "https://cdn.pixabay.com/download/audio/2022/11/11/audio_84306ee149.mp3?filename=please-calm-my-mind-125566.mp3",
  "calm-piano": "https://cdn.pixabay.com/download/audio/2025/05/30/audio_9bc5426c20.mp3?filename=calm-piano-music-351839.mp3",
  "soft-piano": "https://cdn.pixabay.com/download/audio/2025/12/05/audio_3580f915fd.mp3?filename=soft-piano-background-444129.mp3",
  lofi: "https://cdn.pixabay.com/download/audio/2025/12/14/audio_de38cecd46.mp3?filename=chill-study-desk-focus-amp-concentration-lofi-451181.mp3",
  "lo-fi-focus": "https://cdn.pixabay.com/download/audio/2024/11/26/audio_32bf2ee6f7.mp3?filename=lo-fi-focus-269100.mp3",
  "right-on-target": "https://cdn.pixabay.com/download/audio/2022/01/26/audio_30550585f5.mp3?filename=right-on-target-15699.mp3",
  "fantasy-animation": "https://cdn.pixabay.com/download/audio/2025/12/21/audio_8134c379d9.mp3?filename=fantasy-disney-animation-music-454916.mp3",
  "spatial-fantasy": "https://cdn.pixabay.com/download/audio/2025/12/22/audio_a59a3019f7.mp3?filename=spatial-fantasy-455240.mp3",
  acoustic: "https://cdn.pixabay.com/download/audio/2022/03/18/audio_78a1a5eac5.mp3?filename=dunbarton-meditative-ambient-soundscape-for-learning-and-relaxing-95403.mp3",
  "asmr-brain": "https://cdn.pixabay.com/download/audio/2021/12/10/audio_cdebef260c.mp3?filename=asmr-power-brain-connect-spiritual-frequency-11946.mp3",
  "relaxing-sleep": "https://cdn.pixabay.com/download/audio/2024/11/12/audio_8b0420099a.mp3?filename=relaxing-sound-to-sleep-263614.mp3",
  "rain-cocoon": "https://cdn.pixabay.com/download/audio/2025/03/20/audio_866bd173d3.mp3?filename=rain-cocoon-316178.mp3"
};

const activeMusicTabs = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getMusicUrl") {
    const genre = request.genre || "lofi";
    const url = musicGenres[genre] || musicGenres.lofi;
    
    // Stop music in other tabs
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id !== sender.tab.id) {
          chrome.tabs.sendMessage(tab.id, { action: "stopMusic" }).catch(() => {
            // Silently ignore if tab doesn't have content script
          });
        }
      });
    });
    
    activeMusicTabs[sender.tab.id] = true;
    sendResponse({ url, genre });
  }
  
  if (request.action === "musicStopped") {
    delete activeMusicTabs[sender.tab.id];
  }
  
  if (request.action === "getSettings") {
    chrome.storage.local.get(["soundcloudUrl", "minDuration"], (result) => {
      sendResponse({
        soundcloudUrl: result.soundcloudUrl || "",
        minDuration: result.minDuration || 300
      });
    });
    return true;
  }
  
  if (request.action === "saveSettings") {
    chrome.storage.local.set(request.settings, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});
