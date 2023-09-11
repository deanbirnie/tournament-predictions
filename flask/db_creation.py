from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask application
app = Flask(__name__)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///rugby_predictions.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define Matches table
class Match(db.Model):
    match_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.String, nullable=False)
    team_a = db.Column(db.String, nullable=False)
    team_b = db.Column(db.String, nullable=False)

    def as_dict(self):
        return {
            'match_id': self.match_id,
            'date': self.date,
            'team_a': self.team_a,
            'team_b': self.team_b,
        }

# Define Predictions table
class Prediction(db.Model):
    prediction_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    match_id = db.Column(db.Integer, db.ForeignKey('match.match_id'), nullable=False)
    name = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.String, nullable=False)
    team_a_score = db.Column(db.Integer, nullable=False)
    team_b_score = db.Column(db.Integer, nullable=False)

    def as_dict(self):
        return {
            'prediction_id': self.prediction_id,
            'match_id': self.match_id,
            'name': self.name,
            'timestamp': self.timestamp,
            'team_a_score': self.team_a_score,
            'team_b_score': self.team_b_score,
        }

# Create the database and tables
db.create_all()
