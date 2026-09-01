# fleasion.github.io

Official Fleasion project website: <https://fleasion.github.io/>

## Local preview

This site is static, so any simple local HTTP server works. From this repository:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

The download buttons use the GitHub Releases API in the browser to resolve the latest stable Fleasion build for Windows, macOS, or Linux. If that request is unavailable or rate-limited, the buttons fall back to the official GitHub Releases page.
