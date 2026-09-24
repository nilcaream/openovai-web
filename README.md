# openov.ai

The website for [OpenOv AI](https://github.com/nilcaream/openovai) — a toolkit for running a small
team of AI developer sessions on one machine.

Eleven pages. No build step, no dependencies, no package manager. Each page is an `index.html`
in its own directory, `index.html` at the root is the home page, and `style.css` is all of their
styling; the only JavaScript is a theme toggle and a copy button, both
inline, and every page is complete without them.

## Look at it

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Opening `index.html` directly in a browser works too; only the
absolute paths (`/style.css`) need the server.

## How it is published

Push to `main`. GitHub Pages serves the repository root at <https://openov.ai>. The `CNAME` file
is what binds the domain; do not delete it.

## Fonts

IBM Plex Sans and IBM Plex Mono are served from this site, latin subset, about 75 KB in all.
The page makes no third-party request of any kind. They are under the SIL Open Font License 1.1;
`fonts/OFL.txt` is the text the licence asks be distributed with them.

## Licence

MIT. See `LICENSE`.
