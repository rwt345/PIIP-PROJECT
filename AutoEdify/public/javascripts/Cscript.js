
const customerForm = document.getElementById("customerForm");
const customerTableBody = document.querySelector("#customerTable tbody");
const searchInput = document.getElementById("search");

let customers = []; // Local state to hold customer data


// Add or Update Customer
customerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const customer = {
        customerId: document.getElementById("customerId").value,
        customerName: document.getElementById("customerName").value,
        contact: document.getElementById("contact").value,
        address: document.getElementById("address").value,
        customerType: document.getElementById("customerType").value,
    };
    console.log(customer)

    fetch('/Creg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
    })
    .then((response) => {
        if (!response.ok) {
            console.log(response);
        } 
        return response.json(); // Assuming the server sends JSON response
    })
    .then((data) => {
        console.log('Server response:', data);

        // Optionally handle the response (e.g., show a success message)
        alert('Customer added successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to add customer.');
    });

    // Check if it's an update or a new addition    
    const existingIndex = customers.findIndex((c) => c.customerId === customer.customerId);
    if (existingIndex >= 0) {
        // Update the existing customer
        customers[existingIndex] = customer;
    } else {
        // Add a new customer
        customers.push(customer);
    }

    // Refresh the table and reset the form
    renderCustomers();
    customerForm.reset();
});

// Render Customer Table
function renderCustomers() {
    customerTableBody.innerHTML = ""; // Clear the table body
    customers.forEach((customer, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${customer.customerId}</td>
            <td>${customer.customerName}</td>
            <td>${customer.contact}</td>
            <td>${customer.address}</td>
            <td>${customer.customerType}</td>
            <td class="action-buttons">
                <button class="edit" onclick="editCustomer('${customer.customerId}')">Edit</button>
                <button class="delete" onclick="deleteCustomer('${customer.customerId}')">Delete</button>
            </td>
        `;
        customerTableBody.appendChild(row);
    });
}
// Edit Customer
function editCustomer(customerId) {
    const customer = customers.find((c) => c.customerId === customerId);
    if (customer) {
        document.getElementById("customerId").value = customer.customerId;
        document.getElementById("customerName").value = customer.customerName;
        document.getElementById("contact").value = customer.contact;
        document.getElementById("address").value = customer.address;
        document.getElementById("customerType").value = customer.customerType;
        customerForm.scrollIntoView();
    }
}

// Delete Customer
function deleteCustomer(customerId) {
    console.log(customerId)
    if (confirm("Are you sure you want to delete this customer record?")) {
        customers = customers.filter((c) => c.customerId !== customerId);
        renderCustomers();
    }
}

// Search Functionality
searchInput.addEventListener("input", function () {
    const searchQuery = searchInput.value.toLowerCase();
    const filteredCustomers = customers.filter(
        (customer) =>
            customer.customerName.toLowerCase().includes(searchQuery) ||
            customer.contact.toLowerCase().includes(searchQuery)
    );
    renderFilteredCustomers(filteredCustomers);
});

// Render Filtered Customers
function renderFilteredCustomers(filteredCustomers) {
    customerTableBody.innerHTML = ""; // Clear the table body
    filteredCustomers.forEach((customer, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${customer.customerId}</td>
            <td>${customer.customerName}</td>
            <td>${customer.contact}</td>customers
            <td>${customer.address}</td>
            <td>${customer.customerType}</td>
            <td class="action-buttons">
                <button class="edit" onclick="editCustomer(${index})">Edit</button>
                <button class="delete" onclick="deleteCustomer(${index})">Delete</button>
            </td>
        `;
        customerTableBody.appendChild(row);
    });
}




