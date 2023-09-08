
document.addEventListener("DOMContentLoaded", function () {
    // Admin password (hardcoded for simplicity, not secure)
    const ADMIN_PASSWORD = "admin123";

    const loginForm = document.getElementById("admin-login-form");
    const clearSubmissionsButton = document.getElementById("clear-submissions-button");
    const logoutButton = document.getElementById("logout-button");

    // Admin login form submission event listener
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const enteredPassword = document.getElementById("admin-password").value;
            if (enteredPassword === ADMIN_PASSWORD) {
                window.location.href = 'admin_dashboard.html';
            } else {
                alert("Incorrect password. Please try again.");
            }
        });
    }

    // Clear all submissions button click event listener
    if (clearSubmissionsButton) {
        clearSubmissionsButton.addEventListener("click", function () {
            if (confirm("Are you sure you want to clear all submissions?")) {
                clearSubmissions();
                
    fetch('/admin/clear_submissions', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while clearing submissions.');
    });
    
            }
        });
    }

    // Logout button click event listener
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            window.location.href = 'index.html';
        });
    }

    function clearSubmissions() {
        fetch('/admin/clear_submissions', {
            method: 'PUT',
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            // Reload the page or update the DOM to reflect the cleared submissions
            location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while clearing submissions.');
        });
    }
});
