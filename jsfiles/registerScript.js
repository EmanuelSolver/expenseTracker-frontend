const api = require('../utils/utils');

document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${api.apiDomain}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            window.location.href = '/login.html'; // Redirect to login page
        } else {
            const data = await response.json();
            alert(data.message); // Display error message
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
