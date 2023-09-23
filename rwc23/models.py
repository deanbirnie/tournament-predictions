
from datetime import datetime
from rwc23 import db

class Match(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    team_a = db.Column(db.String(50), nullable=False)
    team_b = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='Scheduled')
    predictions = db.relationship('Prediction', backref='match', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date,
            'team_a': self.team_a,
            'team_b': self.team_b,
            'status': self.status
        }

class Prediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    match_id = db.Column(db.Integer, db.ForeignKey('match.id'), nullable=False)
    user_name = db.Column(db.String(100), nullable=False)
    team_a_score = db.Column(db.Integer, nullable=False)
    team_b_score = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'match_id': self.match_id,
            'user_name': self.user_name,
            'team_a_score': self.team_a_score,
            'team_b_score': self.team_b_score,
            'timestamp': self.timestamp
        }
