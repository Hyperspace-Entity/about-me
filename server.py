from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder='.')

PROFILE_DATA = {
    "name": "Jakob Lewis",
    "location": "Shreveport, LA",
    "bio": "AI Development and Full Stack oriented software engineering student with a 4.0 GPA.",
    "skills": ["Python", "JavaScript", "Full-Stack"]
}

@app.route('/api/profile')
def profile():
    return jsonify(PROFILE_DATA)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port)