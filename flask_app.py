
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# The path to the predictions.json file on your server
PREDICTIONS_JSON_PATH = os.path.join(os.path.dirname(__file__), 'predictions.json')

@app.route('/admin/clear_submissions', methods=['POST'])
def clear_submissions():
    # Clear all submissions in the predictions.json file
    with open(PREDICTIONS_JSON_PATH, 'w') as file:
        file.write('[]')
    return jsonify({"message": "All submissions have been cleared"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
