document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("prediction-form");
    const tableBody = document.getElementById("prediction-table");

    // Load existing data when the page loads
    loadPredictions();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const teamAScore = document.getElementById("team-a-score").value;
        const teamBScore = document.getElementById("team-b-score").value;
        const timestamp = new Date().toLocaleString("en-US", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
        });

        const prediction = {
            name,
            timestamp,
            teamAScore,
            teamBScore,
        };

        // Send the prediction to the server and save it to predictions.json
        savePrediction(prediction);

        // Add the prediction to the table
        addPredictionToTable(prediction);

        // Clear the form
        form.reset();
    });

    function savePrediction(prediction) {
        // Fetch existing data from predictions.json
        fetch('/predictions.json')
            .then(response => response.json())
            .then(data => {
                // Append the new prediction to the existing data array
                data.push(prediction);
    
                // Create a JSON string from the updated data
                const jsonData = JSON.stringify(data);
    
                // Send a PUT request using the Fetch API to update the file
                fetch('/predictions.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: jsonData,
                })
                .then(response => {
                    if (response.ok) {
                        // Success, do nothing
                        console.log('Prediction saved successfully.');
                    } else {
                        console.error('Failed to save prediction.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            })
            .catch(error => {
                console.error('Failed to load predictions:', error);
            });
    }    

    function addPredictionToTable(prediction) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${prediction.name}</td>
            <td>${prediction.timestamp}</td>
            <td>${prediction.teamAScore}</td>
            <td>${prediction.teamBScore}</td>
        `;
        tableBody.appendChild(row);
    }

    function loadPredictions() {
        // Fetch existing data from predictions.json
        fetch('/predictions.json')
            .then(response => response.json())
            .then(data => {
                // Populate the table with existing data
                data.forEach(prediction => addPredictionToTable(prediction));
            })
            .catch(error => {
                console.error('Failed to load predictions:', error);
            });
    }
});
