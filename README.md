# Windows 11 in the browser + Scramjet

The Chrome app uses [Scramjet](https://github.com/MercuryWorkshop/scramjet) to load real websites.
The Edge app still uses the old public-proxy method.

## Deploy (Cloudflare Pages, connected to GitHub)

1. Copy everything in this folder into the root of your GitHub repo and push.
2. Cloudflare dashboard -> Workers & Pages -> your Pages project -> Settings -> Builds:
   - Build command: `npm install && npm run build`
   - Build output directory: `dist`
3. Redeploy. Open your https site, open Chrome, type an address.

If Scramjet can't start, a toast says why and Chrome falls back to the basic proxy.

## What's in here

| Path | What it does |
|---|---|
| `index.html` | the desktop (Chrome app wired to Scramjet) |
| `wallpapers/` | live background videos |
| `sw.js` | Scramjet service worker (copied to site root) |
| `functions/wisp/[[path]].js` | Wisp server running as a Pages Function at `/wisp/`; it opens the real network connections |
| `build.mjs` | copies the Scramjet, BareMux and libcurl files into `dist/` |

## Troubleshooting

- Build says "Missing node_modules/...": the package layout changed; the error lists what was installed.
- Toast "missing /scram/scramjet.all.js" etc.: the build didn't copy that file; check the build log lines.
- Sites that fail: Cloudflare Workers can't connect to other Cloudflare-hosted sites, and can't do UDP.
- Open the browser console (F12) and send me the red errors if something doesn't work.
