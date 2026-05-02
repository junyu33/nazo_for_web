# Nazo game for web

my project frontend of web development course

the backend was at `nazo_level10_docker`

> Update 2026-05-02:
> `nazo_level10_docker` is no longer available due to CVE-2026-31431.
> The public site is now deployed on Vercel using a serverless function.
> The legacy root-level `server.js` and `server_express.js` are kept for historical reference and are no longer used in production.

## Usage

### Legacy local usage

```bash
npm install express
nohup node server.js &
```

Access your site at `localhost:1234`.

> Update:
> This legacy mode is no longer the recommended deployment method.

### Vercel deployment

Production deployment is handled by:

```text
vercel.json
api/index.js
```

All requests are rewritten to the Vercel serverless function at `api/index.js`, which reproduces the original routing behavior.

To test locally with Vercel:

```bash
npm install -g vercel
vercel dev
```

Then access the site at:

```text
http://localhost:3000
```

The former root-level Node servers:

```text
server.js
server_express.js
```

are not used by Vercel.
