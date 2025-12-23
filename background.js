const musicGenres = {
  acoustic: "https://cdn.pixabay.com/download/audio/2024/01/15/audio_1331eae737.mp3",
  lofi: "https://cdn.pixabay.com/download/audio/2024/01/16/audio_d3d63b434.mp3",
  "button-smash": "https://cdn.pixabay.com/download/audio/2024/01/17/audio_fd5348f6d1.mp3",
  friday: "https://cdn.pixabay.com/download/audio/2024/01/18/audio_0e6d88e01f.mp3",
  synthwave: "https://cdn.pixabay.com/download/audio/2024/01/19/audio_4abddef6b4.mp3",
  "heros-journey": "https://cdn.pixabay.com/download/audio/2024/01/20/audio_4b0134e14f.mp3"
};

const activeMusicTabs = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getMusicUrl") {
    const genre = request.genre || "lofi";
    const url = musicGenres[genre] || musicGenres.lofi;
    
    // Stop music in other tabs
    for (const tabId in activeMusicTabs) {
      if (activeMusicTabs[tabId] && tabId != sender.tab.id) {
        chrome.tabs.sendMessage(parseInt(tabId), { action: "stopMusic" }).catch(() => {});
      }
    }
    
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
