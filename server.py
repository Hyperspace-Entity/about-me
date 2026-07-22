import http.server
import socketserver
import os
# Read Railway's assigned port, fallback to 8000 locally
PORT = int(os.environ.get("PORT", 8000))
if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with socketserver.TCPServer(("0.0.0.0", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
        print(f"Serving on 0.0.0.0:{PORT}")
        httpd.serve_forever()
