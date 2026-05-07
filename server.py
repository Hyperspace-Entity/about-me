import http.server
import socketserver
import json
import os

# Read Railway's assigned port, fallback to 8000 locally
PORT = int(os.environ.get("PORT", 8000))

class AboutMeServer(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path in ['/api/profile', '/api/profile/']:
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            data = {
                "name": "Jakob Lewis",
                "location": "Shreveport, LA",
                "bio": "AI and Full stack oriented software engineering student with a 4.0 GPA",
                "skills": ["Python", "JavaScript", "Full-Stack"]
            }
            self.wfile.write(json.dumps(data).encode())
        else:
            super().do_GET()

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with socketserver.TCPServer(("0.0.0.0", PORT), AboutMeServer) as httpd:
        print(f"Serving on 0.0.0.0:{PORT}")
        httpd.serve_forever()
