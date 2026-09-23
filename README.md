# hello-server

A tiny zero-dependency Node app used to verify the deployment pipeline on `ekscserver`.

Live at <https://eksc.duckdns.org/hello/> (mesh devices only).

## Deploy

```
git push
ssh server 'cd apps/hello-server && git pull && docker compose up -d --build'
```
