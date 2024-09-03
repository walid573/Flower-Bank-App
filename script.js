let balance = 0;
let transactions = [];

// Function to update the balance display
function updateBalanceDisplay() {
    document.getElementById('balance').textContent = balance.toFixed(2);
}

// Function to add a transaction
function addTransaction(type, amount) {
    const date = new Date().toLocaleString();
    transactions.push({ date, type, amount, balance });
    renderTransactionHistory();
}

// Function to render transaction history
function renderTransactionHistory() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        const row = `
            <tr>
                <td class="border px-4 py-2">${transaction.date}</td>
                <td class="border px-4 py-2">${transaction.type}</td>
                <td class="border px-4 py-2">${transaction.amount}</td>
                <td class="border px-4 py-2">${transaction.balance.toFixed(2)}</td>
            </tr>
        `;
        transactionList.innerHTML += row;
    });
}

// Show Add Money Modal
document.getElementById('add-money-btn').addEventListener('click', () => {
    document.getElementById('add-money-modal').style.display = 'flex';
});

// Show Withdraw Money Modal
document.getElementById('withdraw-money-btn').addEventListener('click', () => {
    document.getElementById('withdraw-money-modal').style.display = 'flex';
});

// Confirm Add Money
document.getElementById('confirm-add').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('add-money-input').value);
    if (!isNaN(amount) && amount > 0) {
        balance += amount;
        addTransaction('Add', amount);
        updateBalanceDisplay();
        document.getElementById('add-money-modal').style.display = 'none';
        document.getElementById('add-money-input').value = ''; // Clear input
    } else {
        alert('Please enter a valid positive number.');
    }
});

// Confirm Withdraw Money
document.getElementById('confirm-withdraw').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('withdraw-money-input').value);
    if (!isNaN(amount) && amount > 0) {
        if (amount <= balance) {
            balance -= amount;
            addTransaction('Withdraw', amount);
            updateBalanceDisplay();
            document.getElementById('withdraw-money-modal').style.display = 'none';
            document.getElementById('withdraw-money-input').value = ''; // Clear input
        } else {
            alert('Insufficient balance.');
        }
    } else {
        alert('Please enter a valid positive number.');
    }
});

// Close Add Money Modal
document.getElementById('close-add-modal').addEventListener('click', () => {
    document.getElementById('add-money-modal').style.display = 'none';
});

// Close Withdraw Money Modal
document.getElementById('close-withdraw-modal').addEventListener('click', () => {
    document.getElementById('withdraw-money-modal').style.display = 'none';
});

// Show Transaction History
document.getElementById('transaction-history-btn').addEventListener('click', () => {
    const historyDiv = document.getElementById('transaction-history');
    historyDiv.classList.toggle('hidden');
});
