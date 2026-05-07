import http.server
import socketserver
import json
import os

PORT = 8000

class AboutMeServer(http.server.SimpleHTTPRequestHandler):
def do_GET(self):
if self.path in [’/api/profile’, ‘/api/profile/’]:
self.send_response(200)
self.send_header(‘Content-type’, ‘application/json’)
self.send_header(‘Access-Control-Allow-Origin’, ‘*’)
self.end_headers()
data = {
“name”: “Jakob Lewis”,
“location”: “Shreveport, LA”,
“bio”: “AI and Full stack oriented software engineering student with a 4.0 GPA”,
“skillGroups”: [
{
“category”: “Backend”,
“cls”: “backend”,
“items”: [“Python”, “Django”, “Flask”, “Custom APIs”, “JSON”]
},
{
“category”: “Frontend”,
“cls”: “frontend”,
“items”: [“HTML”, “CSS”, “JavaScript”, “Bootstrap”]
},
{
“category”: “Database”,
“cls”: “database”,
“items”: [“SQLite”]
}
]
}
self.wfile.write(json.dumps(data).encode())
else:
super().do_GET()

if **name** == “**main**”:
os.chdir(os.path.dirname(os.path.abspath(**file**)))
with socketserver.TCPServer((””, PORT), AboutMeServer) as httpd:
print(f”Serving at http://localhost:{PORT}”)
httpd.serve_forever()