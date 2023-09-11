
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display the list of matches and predictions when the page loads
    fetchMatches();
    fetchPredictions();

    // Handle the form submission for adding a new match
    document.getElementById('add-match-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const data = {
            date: document.getElementById('match-date').value,
            team_a: document.getElementById('team-a').value,
            team_b: document.getElementById('team-b').value
        };
        fetch('/api/matches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            fetchMatches();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    // Handle the form submission for adding a new prediction
    document.getElementById('add-prediction-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const data = {
            match_id: document.getElementById('match-id').value,
            user_name: document.getElementById('user-name').value,
            team_a_score: document.getElementById('team-a-score').value,
            team_b_score: document.getElementById('team-b-score').value
        };
        fetch('/api/predictions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            fetchPredictions();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});

function fetchMatches() {
    fetch('/api/matches')
    .then(response => response.json())
    .then(data => {
        const matchesList = document.getElementById('matches-list');
        matchesList.innerHTML = '';
        data.matches.forEach(match => {
            const matchDiv = document.createElement('div');
            matchDiv.textContent = `Match ID: ${match.id}, Date: ${match.date}, Team A: ${match.team_a}, Team B: ${match.team_b}`;
            matchesList.appendChild(matchDiv);
        });
    });
}

function fetchPredictions() {
    fetch('/api/predictions')
    .then(response => response.json())
    .then(data => {
        const predictionsList = document.getElementById('predictions-list');
        predictionsList.innerHTML = '';
        data.predictions.forEach(prediction => {
            const predictionDiv = document.createElement('div');
            predictionDiv.textContent = `Prediction ID: ${prediction.id}, Match ID: ${prediction.match_id}, User Name: ${prediction.user_name}, Team A Score: ${prediction.team_a_score}, Team B Score: ${prediction.team_b_score}`;
            predictionsList.appendChild(predictionDiv);
        });
    });
}
