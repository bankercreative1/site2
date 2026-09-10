from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def send_head(self):
        # Ignore conditional cache validators so refreshes always receive the
        # current workspace file instead of a stale 304 response.
        if "If-Modified-Since" in self.headers:
            del self.headers["If-Modified-Since"]
        return super().send_head()


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", 5000), NoCacheRequestHandler)
    print("Serving no-cache static site on http://0.0.0.0:5000", flush=True)
    server.serve_forever()