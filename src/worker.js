/**
 * Serves the static site, and /video/* out of the R2 bucket.
 *
 * Video lives in R2 rather than in the build because the files are 75 MB and
 * 63 MB: too large for Git and over Cloudflare's 25 MiB per-asset limit. Serving
 * them through the Worker instead of R2's public r2.dev URL means they come from
 * the same origin as the site, are not subject to r2.dev's rate limiting, and do
 * not depend on a DNS change.
 *
 * Range requests matter here: without them a browser cannot seek in a video and
 * some will refuse to play at all.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/video/')) {
      const key = decodeURIComponent(url.pathname.slice(1));
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        return new Response('Method not allowed', { status: 405 });
      }

      const range = request.headers.get('range');
      let object;
      if (range) {
        const m = /bytes=(\d*)-(\d*)/.exec(range);
        if (m) {
          const head = await env.MEDIA.head(key);
          if (!head) return new Response('Not found', { status: 404 });
          const size = head.size;
          const start = m[1] ? parseInt(m[1], 10) : undefined;
          const end = m[2] ? parseInt(m[2], 10) : undefined;
          const offset = start !== undefined ? start : size - (end ?? 0);
          const length = start !== undefined
            ? (end !== undefined ? end - start + 1 : size - start)
            : (end ?? 0);
          object = await env.MEDIA.get(key, { range: { offset, length } });
          if (!object) return new Response('Not found', { status: 404 });
          const last = offset + length - 1;
          const headers = new Headers();
          object.writeHttpMetadata(headers);
          headers.set('etag', object.httpEtag);
          headers.set('accept-ranges', 'bytes');
          headers.set('content-range', `bytes ${offset}-${last}/${size}`);
          headers.set('content-length', String(length));
          headers.set('cache-control', 'public, max-age=31536000, immutable');
          return new Response(request.method === 'HEAD' ? null : object.body,
            { status: 206, headers });
        }
      }

      object = await env.MEDIA.get(key);
      if (!object) return new Response('Not found', { status: 404 });
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);
      headers.set('accept-ranges', 'bytes');
      headers.set('content-length', String(object.size));
      headers.set('cache-control', 'public, max-age=31536000, immutable');
      return new Response(request.method === 'HEAD' ? null : object.body,
        { status: 200, headers });
    }

    // everything else is a static file
    return env.ASSETS.fetch(request);
  },
};
