const predictionsTable = document.getElementById('predictions-table').getElementsByTagName('tbody')[0];
let predictionsData = [];

function loadPredictions() {
    fetch('predictions.json')
        .then(response => response.json())
        .then(data => {
            predictionsData = data;
            updateTable();
        })
        .catch(error => {
            console.error('Error loading predictions:', error);
        });
}

function savePredictions() {
    fetch('predictions.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(predictionsData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Predictions saved successfully.');
        } else {
            console.error('Error saving predictions:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error saving predictions:', error);
    });
}

function updateTable() {
    // Clear existing table rows
    while (predictionsTable.firstChild) {
        predictionsTable.removeChild(predictionsTable.firstChild);
    }

    // Add rows from predictionsData
    predictionsData.forEach(prediction => {
        const newRow = predictionsTable.insertRow(predictionsTable.rows.length);

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);

        cell1.innerHTML = prediction.name;
        cell2.innerHTML = prediction.teamAName;
        cell3.innerHTML = prediction.teamAScore;
        cell4.innerHTML = prediction.teamBName;
        cell5.innerHTML = prediction.teamBScore;
        cell6.innerHTML = prediction.timestamp;
    });
}

function submitPrediction() {
    const name = document.getElementById('name').value;
    const teamAName = document.getElementById('teamA').value;
    const teamAScore = document.getElementById('teamAScore').value;
    const teamBName = document.getElementById('teamB').value;
    const teamBScore = document.getElementById('teamBScore').value;
    const timestamp = new Date().toLocaleString(); // Generate timestamp

    const prediction = {
        name,
        teamAName,
        teamAScore,
        teamBName,
        teamBScore,
        timestamp
    };

    predictionsData.push(prediction);

    updateTable();
    savePredictions();

    document.getElementById('name').value = '';
    document.getElementById('teamA').value = 'New Zealand';
    document.getElementById('teamAScore').value = '';
    document.getElementById('teamB').value = 'South Africa';
    document.getElementById('teamBScore').value = '';
}

// Load predictions when the page loads
loadPredictions();
