// Minimal zero-dependency web app, used to prove the deployment pipeline works.
// Everything it links to is relative, so it works correctly under a sub-path
// like https://eksc.duckdns.org/hello/ without any base-path configuration.
const http = require('http');
const os = require('os');

const PORT = process.env.PORT || 3000;
const started = new Date();

const page = () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hello from ekscserver</title>
<style>
  :root { --bg:#fbfbfa; --fg:#1a1a18; --muted:#6b6b66; --line:#e3e3df; --accent:#3d6b4f; }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) { --bg:#16161a; --fg:#ececea; --muted:#9a9a95; --line:#2c2c32; --accent:#7fb894; }
  }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--bg); color:var(--fg); padding:0 16px;
         font:16px/1.6 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif; }
  main { max-width:34rem; margin:0 auto; padding:12vh 0 6rem; }
  h1 { font-size:1.6rem; margin:0 0 .3rem; letter-spacing:-.01em; }
  .sub { color:var(--muted); margin:0 0 2.5rem; font-size:.95rem; }
  .dot { display:inline-block; width:.5rem; height:.5rem; border-radius:50%;
         background:var(--accent); margin-right:.5rem; vertical-align:.08em; }
  dl { display:grid; grid-template-columns:auto 1fr; gap:.1rem 1.5rem;
       margin:0; border-top:1px solid var(--line); padding-top:1rem; }
  dt { color:var(--muted); font-size:.85rem; padding:.4rem 0; }
  dd { margin:0; padding:.4rem 0; font-variant-numeric:tabular-nums; }
  footer { color:var(--muted); font-size:.85rem; margin-top:2.5rem;
           border-top:1px solid var(--line); padding-top:1rem; }
</style>
</head>
<body>
<main>
  <h1><span class="dot"></span>It works.</h1>
  <p class="sub">Served from your own server, over your private mesh.</p>
  <dl>
    <dt>Container</dt><dd>${os.hostname()}</dd>
    <dt>Node</dt><dd>${process.version}</dd>
    <dt>Started</dt><dd>${started.toISOString().replace('T',' ').slice(0,19)} UTC</dd>
    <dt>Now</dt><dd>${new Date().toISOString().replace('T',' ').slice(0,19)} UTC</dd>
  </dl>
  <footer>Pushed to GitHub, pulled and built on ekscserver, routed by Caddy.</footer>
</main>
</body>
</html>`;

http.createServer((req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(page());
}).listen(PORT, () => console.log(`listening on ${PORT}`));
