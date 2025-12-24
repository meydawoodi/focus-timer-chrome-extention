# Focus Timer Chrome Extension

A lightweight, focus-enhancing timer widget with ambient music support for your browser.

<img width="112" height="112" alt="image" src="https://github.com/user-attachments/assets/fe3f83b9-af53-48cf-9534-4d582bb9d1d4" />

<img width="365" height="497" alt="image" src="https://github.com/user-attachments/assets/a0f12dcd-0fe0-483d-bf96-aa06c129ec2f" />

## Features

✨ **Floating Timer Widget**
- Draggable 85×85px mini widget that expands to 320×600px panel
- Clean, monospace timer display (MM:SS format)
- Start, Pause, and Reset controls
- Adjust time with ±1 minute buttons

🎵 **Pixabay Music Integration**
- 6 ambient music genres:
  - Acoustic
  - Lofi
  - Button Smash
  - Friday
  - Synthwave
  - Hero's Journey
- No API key required
- Play, Pause, and Stop controls
- Adjustable volume slider
- Auto-stops music across browser tabs

🎧 **SoundCloud Widget Support**
- Add your favorite SoundCloud tracks/playlists
- Optional integration (leave URL empty to disable)
- Embedded player with controls
- No authentication required

📢 **Timer Notifications**
- System notifications
- Audio beep
- Text-to-speech announcement

## Installation

1. Clone this repository or download the files
2. Open Chrome/Edge and go to `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the extension folder

## Configuration

### Add SoundCloud Widget

1. Click the timer widget to expand it
2. Go to extension options/settings
3. Paste your SoundCloud URL in the "SoundCloud Widget" field
4. Click "Save"

Supported SoundCloud URLs:
- Individual tracks: `https://soundcloud.com/artist/track-name`
- Playlists: `https://soundcloud.com/artist/sets/playlist-name`
- User profiles: `https://soundcloud.com/artist`

## Usage

1. Click the floating timer widget to expand
2. Select desired music genre (or load SoundCloud widget)
3. Adjust volume with the slider
4. Click START to begin the timer
5. Use ±1 min buttons to adjust time
6. Click PAUSE to pause, RESET to reset to 25 minutes

## File Structure

```
manifest.json      - Extension configuration
background.js      - Service worker for music delivery
content.js         - Widget injection and UI logic
options.html       - Settings page
options.js         - Settings page scripts
icon.png           - Extension icon
```

## Keyboard

- Timer starts/stops automatically
- Drag to move the widget
- Click to expand/collapse

## Privacy

- All audio processing is local
- No data collection or tracking
- Fully open source

## License

See LICENSE file for details.

## Developer

Created by [meydawoodi](https://github.com/meydawoodi)

Repository: [focus-timer-chrome-extension](https://github.com/meydawoodi/focus-timer-chrome-extention)
