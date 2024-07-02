// Function to get the session token from cookie
function getSessionToken() {
    const name = "session_token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

// Function to toggle visibility of login and logout links based on session
function toggleAuthLinks() {
    const sessionToken = getSessionToken();
    if (sessionToken) {
        // User is logged in, show profile and logout
        document.querySelectorAll('.show-logged-out').forEach(element => {
            element.style.display = 'none';
        });
        document.querySelectorAll('.show-logged-in').forEach(element => {
            element.style.display = 'inline-block';
        });
    } else {
        // User is logged out, show login and register
        document.querySelectorAll('.show-logged-out').forEach(element => {
            element.style.display = 'inline-block';
        });
        document.querySelectorAll('.show-logged-in').forEach(element => {
            element.style.display = 'none';
        });
    }
}

// Function to clear session token cookie
function clearSessionToken() {
    document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("Session token cleared");
}

// Call toggleAuthLinks when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    toggleAuthLinks();

    // Logout functionality
    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault();
            clearSessionToken();
            window.location.href = "index.html"; // Redirect to home page
        });
    }
});