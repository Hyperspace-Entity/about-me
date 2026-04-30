import http.server
import socketserver
import json
import os

# Configuration
PORT = 8000

class AboutMeServer(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # API Route for the profile data
        if self.path in ['/api/profile', '/api/profile/']:
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            # This must be indented 12 spaces (3 levels of 4) to stay inside the IF
            data = {
                "name": "Jakob Lewis",
                "location": "Shreveport, LA",
                "bio": "AI and Full stack oriented software engineering student with a 4.0 GPA",
                "skills": ["Python", "JavaScript", "Full-Stack"]
            }
            
            # This line sends the data back to your phone's browser
            self.wfile.write(json.dumps(data).encode())
            
        else:
            # This serves your HTML, CSS, and JS files
            super().do_GET()

# Boilerplate to run the server
if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with socketserver.TCPServer(("", PORT), AboutMeServer) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        httpd.serve_forever()
