#!/usr/bin/env python3

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///rugby_predictions.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Match(db.Model):
    match_id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(50))
    team_a = db.Column(db.String(50))
    team_b = db.Column(db.String(50))

class Prediction(db.Model):
    prediction_id = db.Column(db.Integer, primary_key=True)
    match_id = db.Column(db.Integer, db.ForeignKey('match.match_id'), nullable=False)
    name = db.Column(db.String(100))
    team_a_score = db.Column(db.Integer)
    team_b_score = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
