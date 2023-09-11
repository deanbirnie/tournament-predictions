
from flask import request, jsonify
from rwc23 import app, db
from rwc23.models import Match, Prediction

@app.route('/matches', methods=['GET', 'POST'])
def handle_matches():
    if request.method == 'POST':
        data = request.get_json()
        new_match = Match(
            date=data.get('date'), 
            team_a=data.get('team_a'), 
            team_b=data.get('team_b'), 
            status=data.get('status', 'Scheduled')
        )
        db.session.add(new_match)
        db.session.commit()
        return jsonify({'message': 'New match added', 'match': new_match.to_dict()}), 201
    else:
        matches = Match.query.all()
        return jsonify({'matches': [match.to_dict() for match in matches]}), 200

@app.route('/predictions', methods=['GET', 'POST'])
def handle_predictions():
    if request.method == 'POST':
        data = request.get_json()
        new_prediction = Prediction(
            match_id=data.get('match_id'),
            user_name=data.get('user_name'),
            team_a_score=data.get('team_a_score'),
            team_b_score=data.get('team_b_score')
        )
        db.session.add(new_prediction)
        db.session.commit()
        return jsonify({'message': 'New prediction added', 'prediction': new_prediction.to_dict()}), 201
    else:
        predictions = Prediction.query.all()
        return jsonify({'predictions': [prediction.to_dict() for prediction in predictions]}), 200

@app.route('/predictions/<int:match_id>', methods=['GET'])
def get_predictions_for_match(match_id):
    predictions = Prediction.query.filter_by(match_id=match_id).all()
    return jsonify({'predictions': [prediction.to_dict() for prediction in predictions]}), 200
