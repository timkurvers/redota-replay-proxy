/* eslint-disable no-param-reassign */

const DOTA_REPLAY_URL_MATCHER = /^http:\/\/replay\d+\.valve\.net\/570\/(?<filename>[a-z0-9._-]+)$/i;

const ALLOWED_ORIGINS = [
  'http://localhost:8080',
  'https://timkurvers.github.io',
];

const handleRequest = async (request) => {
  const origin = request.headers.get('Origin');
  const url = new URL(request.url);

  const replay = url.searchParams.get('replay');
  const match = replay && replay.match(DOTA_REPLAY_URL_MATCHER);

  let response = null;
  if (!replay || !match) {
    response = new Response("query parameter 'replay' is not a valid Dota 2 replay URL", { status: 403 });
  } else {
    // Fetch replay from Valve's servers
    request = new Request(replay);
    if (origin) {
      request.headers.set('Origin', origin);
    }
    response = await fetch(request);

    // Recreate the response so we can modify the headers
    response = new Response(response.body, response);

    // Add Vary header so browser will cache response correctly
    response.headers.append('Vary', 'Origin');

    // Valve forgot to set Content-Type
    response.headers.set('Content-Type', 'application/octet-stream');

    // Preserve filename
    const { filename } = match.groups;
    response.headers.set('Content-Disposition', `attachment; filename="${filename}"`);
  }

  if (ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  return response;
};

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});
