const musicGenres = {
  acoustic: "https://pixabay.com/download/audio/?id=7371",
  lofi: "https://pixabay.com/download/audio/?id=11126",
  "button-smash": "https://pixabay.com/download/audio/?id=6714",
  friday: "https://pixabay.com/download/audio/?id=7122",
  synthwave: "https://pixabay.com/download/audio/?id=8846",
  "heros-journey": "https://pixabay.com/download/audio/?id=9512"
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
