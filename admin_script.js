
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
                // Logic to clear all submissions will go here
                alert("Clear all submissions feature is under development.");
            }
        });
    }

    // Logout button click event listener
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            window.location.href = 'index.html';
        });
    }
});
