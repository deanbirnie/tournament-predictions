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
        method: 'POST', // Use POST instead of PUT
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

        cell1.innerHTML = prediction.name;
        cell2.innerHTML = prediction.timestamp;
        cell3.innerHTML = prediction.match;
        cell4.innerHTML = prediction.teamAScore;
        cell5.innerHTML = prediction.teamBScore;
    });
}

function submitPrediction() {
    const name = document.getElementById('name').value;
    const match = document.getElementById('match').value;
    const teamAScore = document.getElementById('teamAScore').value;
    const teamBScore = document.getElementById('teamBScore').value;

    // Get the current timestamp
    const timestamp = new Date().toLocaleString('en-GB');

    // Create a prediction object
    const prediction = {
        name,
        timestamp,
        match,
        teamAScore,
        teamBScore
    };

    // Add the prediction to the data array
    predictionsData.push(prediction);

    // Update the table
    updateTable();

    // Save predictions to JSON file
    savePredictions();

    // Clear form fields
    document.getElementById('name').value = '';
    document.getElementById('match').value = '';
    document.getElementById('teamAScore').value = '';
    document.getElementById('teamBScore').value = '';
}

// Load predictions when the page loads
loadPredictions();
