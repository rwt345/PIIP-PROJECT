const customerTable = document.getElementById("customerTable");
const customerTableBody = document.querySelector("#customerTable tbody");
const searchInput = document.getElementById("search");


// Select the back button
const backButton = document.getElementById("backButton");

// Add click event listener
backButton.addEventListener("click", function () {
    // Go to the previous page in browser history
    if (window.history.length > 1) {
        window.history.back();
    } else {
        alert("No previous page in history.");
    }
});



let customers =[]; 

document.addEventListener('DOMContentLoaded', fetchCustomers);

async function fetchCustomers() { 
        const response = await fetch('http://localhost:3000/Creg/all');
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();        
        renderCustomers(data.customers);        
        customers = data.customers;
        console.log(customers);
}

function renderCustomers(c) {
    customerTableBody.innerHTML = ""; // Clear the table body
    c.forEach((customer, index) => {
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

function renderFilteredCustomers(filteredCustomers) {
    customerTableBody.innerHTML = ""; // Clear the table body
    filteredCustomers.forEach((customer) => {
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

// Function to edit a customer
function editCustomer(customerId) {
    // Find the customer object based on the customerId
    const customerToEdit = customers.find((customer) => customer.customerId === customerId);
    if (!customerToEdit) {
        alert("Customer not found!");
        return;
    }
    // Populate the form fields with the existing customer data
    document.getElementById("customerId").value = customerToEdit.customerId;
    document.getElementById("customerName").value = customerToEdit.customerName;
    document.getElementById("contact").value = customerToEdit.contact;
    document.getElementById("address").value = customerToEdit.address;
    document.getElementById("customerType").value = customerToEdit.customerType;
    // Scroll to the form for better user experience
    document.getElementById("customerTable").scrollIntoView();
}

// Handle form submission for editing or adding a customer
customerTable.addEventListener("submit", function (e) {
    e.preventDefault();
    const customer = {
        customerId: document.getElementById("customerId").value,
        customerName: document.getElementById("customerName").value,
        contact: document.getElementById("contact").value,
        address: document.getElementById("address").value,
        customerType: document.getElementById("customerType").value,
    };
    
    // Check if the customer exists for updating
    const existingCustomerIndex = customers.findIndex((c) => c.customerId === customer.customerId);
    
    if (existingCustomerIndex >= 0) {        
        // Update the existing customer on the backend
        fetch(`/Creg/${customer.customerId}`, {
            method: 'PUT', // Use PUT for updating the record
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to update customer response not ok");
            }
            return response.json();
        })
        .then(() => {
            fetchCustomers();
        })
        .catch((error) => {
            console.error("Error updating customer:", error);
        });
    } 
    else {
        fetch('/Creg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to create customer");
            }
            return response.json();
        })
        .then(() => {
            // Refresh the table
            fetchCustomers();
        })
        .catch((error) => {
            console.error("Error adding customer:", error);
            alert("Failed to create customer catch block.");
        });
    }
    // Reset the form
    customerTable.reset();
});

// Delete Customer
function deleteCustomer(customerId) {
    if (confirm("Are you sure you want to delete this customer record?")) {
    const existingCustomerIndex = customers.findIndex((c) => c.customerId === customerId);
    if (existingCustomerIndex >= 0) {        
        // Update the existing customer on the backend
        fetch(`/Creg/${customerId}`, {
            method: 'DELETE', // Use PUT for updating the record
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to update customer response not ok");
            }
            return response.json();
        })
        .then(() => {
            fetchCustomers();
        })
        .catch((error) => {
            console.error("Error updating customer:", error);
            alert("Failed to update customer catch block");
        });
      }
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
            <td>${customer.contact}</td>
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

