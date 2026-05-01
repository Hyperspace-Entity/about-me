import http.server
import socketserver
import json
import os

PORT = int(os.environ.get("PORT", 8000))

print(f"PORT env variable is: {PORT}")
print(f"All env vars: { {k: v for k, v in os.environ.items() if 'PORT' in k} }")

PROFILE_DATA = {
    "name": "Jakob Lewis",
    "location": "Shreveport, LA",
    "bio": "AI Development and Full Stack oriented software engineering student with a 4.0 GPA.",
    "skills": ["Python", "JavaScript", "Full-Stack"]
}

class AboutMeServer(http.server.SimpleHTTPRequestHandler):

    def do_GET(self):
        if self.path in ('/api/profile', '/api/profile/'):
            body = json.dumps(PROFILE_DATA).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(body)))
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(body)
        else:
            super().do_GET()

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def log_message(self, format, *args):
        print(f"[{self.address_string()}] {format % args}")


if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    socketserver.TCPServer.allow_reuse_address = True
    print(f"Starting server on 0.0.0.0:{PORT}")
    with socketserver.TCPServer(('0.0.0.0', PORT), AboutMeServer) as httpd:
        print(f"Server running on 0.0.0.0:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")