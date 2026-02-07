# CLAUDE.md

## Project Overview

Static single-page website built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools, no package manager. Displays game server status fetched from an API.

Live at: https://disqt.com

## Architecture

### Files

| File | Purpose |
|------|---------|
| `index.html` | Single HTML page with a `<table>` inside a neon-bordered container. The `<tbody id="content">` is populated dynamically by JS. Loads FontAwesome from CDN. |
| `js/script.js` | Fetches server data, builds table HTML, attaches click-to-copy event handlers. |
| `css/style.css` | Neon/cyberpunk theme using layered `box-shadow` and `text-shadow` for glow effects. Two custom fonts (Sacramento, Courier Prime). Responsive breakpoints at 440px and 830px. |
| `font/` | Sacramento-Regular.ttf (decorative, used for server names) and CourierPrime-Regular.ttf (monospace, used for status text and headers). |
| `img/icon.png` | Favicon. |

### Data Flow

```
Page load
  -> infoserv() fetches GET https://disqt.com/servers
  -> response JSON parsed
  -> display(json) iterates over server keys, builds <tr> rows
     - Running == true  -> green glow class (lit-green)
     - Running == false -> pink glow class (lit-pink)
     - Server name links to Redirect URL (e.g. steam://connect/...)
     - Player count shown as Players/MaxPlayers
     - Connection URL shown as clickable text
  -> container.innerHTML = html
  -> addCopyEvents() attaches click handlers to .server-url elements
     - Click copies URL text to clipboard via navigator.clipboard.writeText()
     - flickering() toggles a CSS "flicker" class for visual feedback
```

### API Response Shape

The `/servers` endpoint returns a JSON object keyed by server display name:

```json
{
  "CS2": {
    "Running": true,
    "Url": "disqt.com:27015",
    "Players": 3,
    "MaxPlayers": 10,
    "Redirect": "steam://connect/disqt.com:27015"
  },
  "Minecraft": {
    "Running": false,
    "Url": "disqt.com:25565",
    "Players": 0,
    "MaxPlayers": 20,
    "Redirect": ""
  }
}
```

Fields:
- `Running` (bool) -- whether the server process is active
- `Url` (string) -- connection address displayed and copied to clipboard
- `Players` (int) -- current player count
- `MaxPlayers` (int) -- server capacity (omitted or 0 if not applicable)
- `Redirect` (string) -- link target for the server name (e.g. `steam://connect/...`), empty if none

## Deployment

Served as static files by nginx on the VPS. No build or compilation step. The nginx config also reverse-proxies `/servers` to the lgsm-info-api backend with a 10-minute cache TTL.

## Design Notes

- **Neon glow**: Achieved with multiple layered `box-shadow` values (both regular and inset) on the border container, heading, table, and corner element. Text glow uses `text-shadow` with varying blur radii and opacities.
- **Color coding**: Three glow color classes -- `lit-blue` (headers), `lit-green` (online servers), `lit-pink` (offline servers). Each uses different RGB values in the shadow layers.
- **Flicker animations**: Three `@keyframes` animations -- `flickerBorderShadow` (title hover), `flickerOn` (server name hover, opacity-based), `textFlicker` (copy feedback, chromatic aberration effect).
- **Copy feedback**: The `flicker` CSS class is toggled on click, producing a brief glitch/chromatic aberration effect via offset colored text shadows.
- **Mobile breakpoint (440px)**: Removes the outer border glow, hides the arrow icon, and makes the heading and table full-width.
- **Medium breakpoint (830px)**: Adjusts heading margins and table width.
- **Fonts**: Sacramento (cursive) for server names, Courier Prime (monospace) for status and headers, loaded as local TTF files via `@font-face`.
- **FontAwesome**: Loaded from CDN (`kit.fontawesome.com`), used for the decorative arrow icon in the top-left corner.
