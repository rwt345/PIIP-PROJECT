const customerForm = document.getElementById("customerForm");
const customerTableBody = document.querySelector("#customerTable tbody");
const searchInput = document.getElementById("search");

let customers = [];

// Add or Update Customer
customerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const customer = {
        id: document.getElementById("customerId").value,
        name: document.getElementById("customerName").value,
        contact: document.getElementById("contact").value,
        address: document.getElementById("address").value,
        type: document.getElementById("customerType").value,
    };

    // Check if it's an update or a new addition
    const existingIndex = customers.findIndex((c) => c.id === customer.id);
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
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.contact}</td>
            <td>${customer.address}</td>
            <td>${customer.type}</td>
            <td class="action-buttons">
                <button class="edit" onclick="editCustomer(${index})">Edit</button>
                <button class="delete" onclick="deleteCustomer(${index})">Delete</button>
            </td>
        `;

        customerTableBody.appendChild(row);
    });
}

// Edit Customer
function editCustomer(index) {
    const customer = customers[index];

    // Populate form fields with customer details
    document.getElementById("customerId").value = customer.id;
    document.getElementById("customerName").value = customer.name;
    document.getElementById("contact").value = customer.contact;
    document.getElementById("address").value = customer.address;
    document.getElementById("customerType").value = customer.type;

    // Scroll to the form for better user experience
    customerForm.scrollIntoView();
}

// Delete Customer
function deleteCustomer(index) {
    if (confirm("Are you sure you want to delete this customer record?")) {
        customers.splice(index, 1);
        renderCustomers();
    }
}

// Search Functionality
searchInput.addEventListener("input", function () {
    const searchQuery = searchInput.value.toLowerCase();

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.name.toLowerCase().includes(searchQuery) ||
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
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.contact}</td>
            <td>${customer.address}</td>
            <td>${customer.type}</td>
            <td class="action-buttons">
                <button class="edit" onclick="editCustomer(${index})">Edit</button>
                <button class="delete" onclick="deleteCustomer(${index})">Delete</button>
            </td>
        `;

        customerTableBody.appendChild(row);
    });
}

