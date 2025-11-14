# Microphone Not Working - Troubleshooting

## Quick Fixes

### 1. Check Microphone Permissions

**Chrome/Edge:**
1. Click the 🔒 lock icon in the address bar
2. Look for "Microphone" permission
3. Make sure it's set to "Allow"
4. Refresh the page

**Safari:**
1. Safari menu → Settings → Websites → Microphone
2. Find `adhd-quest-coach` or `file://`
3. Set to "Allow"
4. Refresh the page

### 2. Open Browser Console to See Errors

**All Browsers:**
- Press `Cmd + Option + J` (Mac) or `F12` (Windows)
- Click "Console" tab
- Click the microphone button
- Look for red error messages
- Common errors and fixes below

### 3. Common Errors & Solutions

**Error: "NotAllowedError: Permission denied"**
- Solution: Grant microphone permission (see step 1)

**Error: "NotFoundError: Requested device not found"**
- Solution: Check if microphone is connected and working
- Test in System Preferences → Sound → Input

**Error: "NotSupportedError"**
- Solution: Use Chrome, Edge, or Safari (Firefox has limited support)

**Error: "AbortError"**
- Solution: Close other apps using the microphone (Zoom, Skype, etc.)

**Error: "already started"**
- Solution: Refresh the page and try again

### 4. Test Your Microphone

Open Terminal and run:
```bash
say "Testing microphone" && echo "If you heard that, your audio works"
```

Or open System Preferences → Sound → Input and speak - the bars should move.

### 5. Browser-Specific Issues

**Chrome/Edge:**
- Works best for speech recognition
- Make sure you're on latest version
- Try opening in Incognito mode (Cmd+Shift+N)

**Safari:**
- May require you to allow in Settings first
- Sometimes needs page refresh after granting permission

**Firefox:**
- Limited speech recognition support
- Switch to Chrome/Edge if possible

### 6. File Protocol Issue

If you're opening the file directly (`file://`), some browsers restrict microphone access:

**Solution: Run a local server**
```bash
cd /Volumes/Ai/Projects/adhd-quest-coach
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

## Debug Mode

Add this to check what's happening:

1. Open browser console (Cmd+Option+J)
2. Click the microphone button
3. You should see: "Speech recognition started"
4. Speak something
5. You should see: Speech recognition results appearing

If you see errors instead, copy them and I can help fix them.

## Still Not Working?

1. **Restart browser completely**
2. **Check System Preferences → Security & Privacy → Privacy → Microphone**
   - Make sure your browser is allowed
3. **Try different browser** (Chrome is most reliable)
4. **Restart computer** (sometimes helps with permissions)

## Test Command

Run this to check if speech recognition is available:

Open browser console and paste:
```javascript
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
console.log('Speech Recognition available:', !!SpeechRecognition);
```

Should return: `Speech Recognition available: true`
