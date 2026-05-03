import http.server
import socketserver
import json
import os

# basic port configuration 
# this was originally hosted on mobile, will update
PORT = 8000

class AboutMeServer(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # API Route for the profile data
        if self.path in ['/api/profile', '/api/profile/']:
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            data = {
                "name": "Jakob Lewis",
                "location": "Shreveport, LA",
                "bio": "AI and Full stack oriented software engineering student with a 4.0 GPA",
                "skills": ["Python", "API Development", "JavaScript", "Full-Stack"]
            }
            self.wfile.write(json.dumps(data).encode())
        else:
            # This serves your HTML, CSS, and JS files
            super().do_GET()

# main function to run the server locally 
# will change and remove later, for now want to preserve self-sufficient hosting
if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with socketserver.TCPServer(("", PORT), AboutMeServer) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        httpd.serve_forever()

