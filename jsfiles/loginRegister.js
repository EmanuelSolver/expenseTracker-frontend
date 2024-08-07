const api = require('../utils/utils');

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${api.apiDomain}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            window.location.href = `${api.apiDomain}/dashboard.html`; // Redirect to dashboard or home page
        } else {
            const data = await response.json();
            alert(data.message); // Display error message
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
