
from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder='path/to/your/static/files')

# The path to the predictions.json file on your server
PREDICTIONS_JSON_PATH = os.path.join(os.path.dirname(__file__), 'predictions.json')

@app.route('/admin', methods=['GET'])
def admin_login():
    return send_from_directory(app.static_folder, 'admin.html')

@app.route('/admin_dashboard', methods=['GET'])
def admin_dashboard():
    return send_from_directory(app.static_folder, 'admin_dashboard.html')

@app.route('/admin_script.js', methods=['GET'])
def admin_script():
    return send_from_directory(app.static_folder, 'admin_script.js')

@app.route('/admin_style.css', methods=['GET'])
def admin_style():
    return send_from_directory(app.static_folder, 'admin_style.css')

@app.route('/admin/clear_submissions', methods=['PUT'])
def clear_submissions():
    # Clear all submissions in the predictions.json file
    with open(PREDICTIONS_JSON_PATH, 'w') as file:
        file.write('[]')
    return jsonify({"message": "All submissions have been cleared"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
