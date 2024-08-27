// Function to get the current user's storage key
function getUserKey() {
    const username = prompt("Enter your username:");
    if (!username) {
        alert("You need to provide a username.");
        return null;
    }
    return `tracker_${username}`;
}

// Function to log weight
function logWeight() {
    const userKey = getUserKey();
    if (!userKey) return;

    const date = document.getElementById("weight-date").value;
    const weight = document.getElementById("weight-input").value;

    if (date && weight) {
        const storedWeights = JSON.parse(localStorage.getItem(userKey + "_weightLog")) || [];
        storedWeights.push({ date, weight });
        localStorage.setItem(userKey + "_weightLog", JSON.stringify(storedWeights));

        displayLogs(userKey);
    }
}

// Function to log exercise
function logExercise() {
    const userKey = getUserKey();
    if (!userKey) return;

    const date = document.getElementById("exercise-date").value;
    const exercise = document.getElementById("exercise-name").value;
    const duration = document.getElementById("exercise-duration").value;

    if (date && exercise && duration) {
        const storedExercises = JSON.parse(localStorage.getItem(userKey + "_exerciseLog")) || [];
        storedExercises.push({ date, exercise, duration });
        localStorage.setItem(userKey + "_exerciseLog", JSON.stringify(storedExercises));

        displayLogs(userKey);
    }
}

// Function to display logs for the current user
function displayLogs(userKey) {
    const storedWeights = JSON.parse(localStorage.getItem(userKey + "_weightLog")) || [];
    const storedExercises = JSON.parse(localStorage.getItem(userKey + "_exerciseLog")) || [];

    const weightLogDiv = document.getElementById("weight-log");
    const exerciseLogDiv = document.getElementById("exercise-log");

    weightLogDiv.innerHTML = "";
    exerciseLogDiv.innerHTML = "";

    storedWeights.forEach(entry => {
        const logEntry = document.createElement("div");
        logEntry.textContent = `Date: ${entry.date}, Weight: ${entry.weight} kg`;
        weightLogDiv.appendChild(logEntry);
    });

    storedExercises.forEach(entry => {
        const logEntry = document.createElement("div");
        logEntry.textContent = `Date: ${entry.date}, Exercise: ${entry.exercise}, Duration: ${entry.duration} minutes`;
        exerciseLogDiv.appendChild(logEntry);
    });
}

// On page load, prompt for the username and load their logs
window.onload = function() {
    const userKey = getUserKey();
    if (userKey) {
        displayLogs(userKey);
    }
};
