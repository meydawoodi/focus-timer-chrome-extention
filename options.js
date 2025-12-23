document.addEventListener("DOMContentLoaded", () => {
  const soundcloudUrlInput = document.getElementById("soundcloudUrl");
  const saveSoundcloudBtn = document.getElementById("saveSoundcloudBtn");
  const previewBtn = document.getElementById("previewBtn");
  const minDurationInput = document.getElementById("minDuration");
  const saveGeneralBtn = document.getElementById("saveGeneralBtn");
  const soundcloudStatus = document.getElementById("soundcloudStatus");
  const generalStatus = document.getElementById("generalStatus");
  
  // Load saved settings
  chrome.storage.local.get(["soundcloudUrl", "minDuration"], (result) => {
    soundcloudUrlInput.value = result.soundcloudUrl || "";
    minDurationInput.value = result.minDuration || 300;
  });
  
  // Save SoundCloud URL
  saveSoundcloudBtn.addEventListener("click", () => {
    const url = soundcloudUrlInput.value.trim();
    
    if (url && !url.includes("soundcloud.com")) {
      showStatus(soundcloudStatus, "❌ Invalid SoundCloud URL. Please use a valid SoundCloud link.", "error");
      return;
    }
    
    chrome.storage.local.set({ soundcloudUrl: url }, () => {
      showStatus(soundcloudStatus, url ? "✅ SoundCloud widget saved successfully!" : "✅ SoundCloud widget removed.", "success");
    });
  });
  
  // Preview URL
  previewBtn.addEventListener("click", () => {
    const url = soundcloudUrlInput.value.trim();
    
    if (!url) {
      showStatus(soundcloudStatus, "⚠️ Please enter a SoundCloud URL first.", "error");
      return;
    }
    
    if (!url.includes("soundcloud.com")) {
      showStatus(soundcloudStatus, "❌ Invalid SoundCloud URL. Please use a valid SoundCloud link.", "error");
      return;
    }
    
    showStatus(soundcloudStatus, "⏳ Validating URL...", "loading");
    
    // Simulate validation - in real world, you might check if the URL is accessible
    setTimeout(() => {
      showStatus(soundcloudStatus, "✅ URL looks valid! Save to apply the widget.", "success");
    }, 1000);
  });
  
  // Save general settings
  saveGeneralBtn.addEventListener("click", () => {
    const minDuration = parseInt(minDurationInput.value) || 300;
    
    chrome.storage.local.set({ minDuration }, () => {
      showStatus(generalStatus, "✅ Settings saved successfully!", "success");
    });
  });
  
  function showStatus(element, message, type) {
    element.textContent = message;
    element.className = `status-message show status-${type}`;
    
    if (type !== "loading") {
      setTimeout(() => {
        element.classList.remove("show");
      }, 3000);
    }
  }
});
