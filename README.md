# disqt-info-website

Static dashboard that displays real-time game server status for [disqt.com](https://disqt.com).

## Features

- Real-time server status (online/offline) with player counts
- Click-to-copy server addresses to clipboard
- Neon/cyberpunk visual theme with glow effects and flicker animations
- Responsive layout with a mobile breakpoint at 440px

## Project Structure

```
index.html          # Single-page HTML with server table
js/script.js        # Fetches API data, builds table rows, handles copy events
css/style.css       # Neon glow theme, animations, responsive breakpoints
font/               # Sacramento (server names) and Courier Prime (status text)
img/icon.png        # Favicon
```

## How It Works

On page load, `script.js` fetches the `/servers` endpoint from `https://disqt.com/servers`. The response is a JSON object keyed by server name. Each server entry contains status, connection URL, player count, and an optional redirect link. The script builds an HTML table with color-coded rows (green glow for online, pink glow for offline) and attaches click handlers that copy the server address to the clipboard with a flicker animation as visual feedback.

## API Dependency

The site depends on [lgsm-info-api](https://github.com/disqt/lgsm-info-api), a Go service that reports game server status. In production, nginx reverse-proxies `/servers` to the API and caches responses with a 10-minute TTL using stale-while-revalidate.

## Deployment

Static files are served directly by nginx on the VPS. No build step is required -- just copy the files to the web root.

## Development

No build tools or dependencies to install. Open `index.html` in a browser to see the layout, but note that the API call to `/servers` will fail locally since there is no backend. To test with live data, either proxy requests to `https://disqt.com/servers` or serve the files behind a reverse proxy that routes `/servers` to the API.

## Related Repositories

- [lgsm-info-api](https://github.com/disqt/lgsm-info-api) -- Game server status API (Go)
- [disqt-discord-bot](https://github.com/disqt/disqt-discord-bot) -- Discord bot + CS2 plugin
- [vps-wiki](https://github.com/disqt/vps-wiki) -- VPS infrastructure documentation
