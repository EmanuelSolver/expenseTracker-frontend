const api = require('../utils/utils');

document.getElementById('fetchExpensesBtn').addEventListener('click', async function () {
    try {
        const response = await fetch(`${api.apiDomain}/all-expenses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            displayExpenses(data);
        } else {
            alert('Failed to fetch expenses');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('showAddExpenseFormBtn').addEventListener('click', function () {
    document.getElementById('addExpenseForm').style.display = 'block';
});

document.getElementById('cancelAddExpenseBtn').addEventListener('click', function () {
    document.getElementById('addExpenseForm').style.display = 'none';
});

document.getElementById('addExpense').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    
    const expense = { description, amount, date };

    await addExpense(expense);
    
    // Hide the form and clear the inputs
    document.getElementById('addExpenseForm').style.display = 'none';
    document.getElementById('addExpense').reset();
});

async function addExpense(expense) {
    try {
        const response = await fetch(`${api.apiDomain}/add-expense`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
        });

        if (response.ok) {
            alert('Expense added successfully');
            // Optionally, refresh the expenses list
            document.getElementById('fetchExpensesBtn').click();
        } else {
            alert('Failed to add expense');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Edit an existing expense
async function editExpense(id, updatedExpense) {
    try {
        const response = await fetch(`${api.apiDomain}/edit-expense/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedExpense)
        });

        if (response.ok) {
            alert('Expense updated successfully');
            // Optionally, refresh the expenses list
            document.getElementById('fetchExpensesBtn').click();
        } else {
            alert('Failed to update expense');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Delete an expense
async function deleteExpense(id) {
    try {
        const response = await fetch(`${api.apiDomain}/trash-expense/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Expense deleted successfully');
            // Optionally, refresh the expenses list
            document.getElementById('fetchExpensesBtn').click();
        } else {
            alert('Failed to delete expense');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Display expenses in a table
function displayExpenses(expenses) {
    const container = document.getElementById('expensesContainer');
    container.innerHTML = ''; // Clear previous content

    if (expenses.length === 0) {
        container.innerHTML = '<p>No expenses found.</p>';
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${expenses.map(expense => `
                <tr>
                    <td>${expense.id}</td>
                    <td>${expense.description}</td>
                    <td>${expense.amount}</td>
                    <td>${expense.date}</td>
                    <td>
                        <button onclick="editExpense(${expense.id}, { description: 'New Description', amount: 100, date: '2024-01-01' })">Edit</button>
                        <button onclick="deleteExpense(${expense.id})">Delete</button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;

    container.appendChild(table);
}