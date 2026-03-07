# Contacts PWA

## Files
- `index.html` — the app
- `manifest.json` — PWA configuration
- `service-worker.js` — offline caching
- `icons/` — home screen icons

## Deploy to GitHub Pages

1. Create a new GitHub repository (can be private with GitHub Pro)
2. Upload all files maintaining this folder structure
3. Go to **Settings → Pages**
4. Set Source to **Deploy from a branch**, select `main`, folder `/root`
5. Click Save — your URL will be `https://yourusername.github.io/reponame`

## Install on iPhone

1. Open the URL in **Safari** (must be Safari, not Chrome)
2. Tap the **Share** button (box with arrow)
3. Tap **Add to Home Screen**
4. Tap **Add**

The app now opens full screen with no browser chrome, exactly like a native app.

## Updating the app

Any time you push changes to GitHub, the live app updates automatically within a minute or two. Your iPhone will pick up the new version on next launch (the service worker handles this).

## Secret controls (reminder)

- **Open settings:** Double-tap "Contacts" title, or two-finger swipe down
- **Performance mode ON:** Single tap Keypad tab (badge shows 242)
- **Performance mode OFF:** Double tap Keypad tab (badge shows 241)
