document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const tableBody = document.querySelector('#userTable tbody');
    
    function loadFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem('userData')) || [];
        data.forEach(addRow);
    }

    function saveToLocalStorage(data) {
        const existingData = JSON.parse(localStorage.getItem('userData')) || [];
        existingData.push(data);
        localStorage.setItem('userData', JSON.stringify(existingData));
    }

    function addRow(userData) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${userData.firstName}</td>
            <td>${userData.lastName}</td>
            <td>${userData.age}</td>
        `;
        tableBody.appendChild(row);
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const age = parseInt(document.getElementById('age').value);

        if (firstName && lastName && age >= 18) {
            const userData = { firstName, lastName, age };
            addRow(userData);
            saveToLocalStorage(userData);
            form.reset();
        } else {
            alert('Please try again. Age must be 18 or older.');
        }
    });

    loadFromLocalStorage();
});
