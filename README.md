# ReDota Replay Proxy

![Node Version](https://badgen.net/badge/node/12+/green)

Cloudflare worker proxy for Valve Dota 2 replays.

# Background

Valve keeps replay files for public matches, used by both the official client for replay viewing
as well as by sites such as [OpenDota] and [Dotabuff] to analyze matches in further detail.

Unfortunately, these Valve replay servers are not configured for [cross-origin resource sharing] and
as such cannot be reached by web clients, like [ReDota]. This project proxies the replay files,
making them available with the correct HTTP headers.

# Setup & Development

Written in [ES2020+] and published as a Cloudflare worker using [wrangler].

1. Clone the repository:

   ```shell
   git clone git://github.com/timkurvers/redota-replay-proxy.git
   ```

2. Download and install [Node.js] 12+ for your platform.

3. Install dependencies:

   ```shell
   npm install
   ```

4. Run the worker locally on `http://localhost:8787` which automatically monitors source files:

   ```shell
   npm run start:dev
   ```

# Publishing

To publish the worker to Cloudflare, complete these additional steps:

1. Run `npx wrangler login` and authenticate with Cloudflare.

2. Copy `.envrc-sample` to `.envrc` and set its `CF_ACCOUNT_ID` to the Cloudflare account that will
own the worker.

3. Source / load `.envrc`, either manually:

   ```shell
   source .envrc
   ```

   Or let [direnv] do it for you automatically.

8. Configure `wrangler.toml`.

Then, to publish a new version, simply run:

```shell
npm run publish
```

[Dotabuff]: https://dotabuff.com/
[ES2020+]: https://www.strictmode.io/articles/whats-new-es2020/
[Node.js]: https://nodejs.org/
[OpenDota]: https://opendota.com/
[ReDota]: https://github.com/timkurvers/redota/
[Valve]: https://www.valvesoftware.com/
[cross-origin resource sharing]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[direnv]: https://direnv.net/
[wrangler]: https://github.com/cloudflare/wrangler
