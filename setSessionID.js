// Function to generate a random session ID
function generateSessionID() {
    // Generate a random session ID with timestamp
    const sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2, 9); // Generate a random alphanumeric string
    return sessionId; // Return the generated session ID
}

// Function to set the session ID
function setSessionID() {
    // Check if session ID already exists in local storage
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) { // If session ID doesn't exist
        // Generate a new session ID
        sessionId = generateSessionID();
        // Store the session ID in local storage
        localStorage.setItem('sessionId', sessionId);
    }
    // Display the session ID on the webpage
    document.getElementById('session-id').textContent = 'Session ID: ' + sessionId;
}

// Function to reset the session ID
function resetSessionID() {
    // Remove the session ID from local storage
    localStorage.removeItem('sessionId');
    // Redirect back to the original page
    window.location.href = 'Index.html';
}

// Set the session ID when the page loads
window.onload = setSessionID;
