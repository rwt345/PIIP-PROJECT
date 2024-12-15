const serviceTable = document.getElementById("serviceTable");
const serviceTableBody = document.querySelector("#serviceTable tbody");
const searchInput = document.getElementById("search");

let services = [];

document.addEventListener('DOMContentLoaded', fetchServices);

async function fetchServices() { 
        const response = await fetch('http://localhost:3000/Sreg/all');
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        renderServices(data.services);
        services = data.services;
        // console.log(services);
}

function renderServices(c) {
    serviceTableBody.innerHTML = ""; // Clear the table body
    c.forEach((service, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${service.serviceId}</td>
            <td>${service.vehicleId}</td>
            <td>${service.serviceDate}</td>
            <td>${service.serviceType}</td>
            <td>${service.cost}</td>
            <td class="action-buttons">
                <button class="edit" onclick="editService('${service.serviceId}')">Edit</button>
                <button class="delete" onclick="deleteService('${service.serviceId}')">Delete</button>
            </td>
        `;
        serviceTableBody.appendChild(row);
    });
}

function renderFilteredServices(filteredServices) {
    serviceTableBody.innerHTML = ""; // Clear the table body
    filteredServices.forEach((service) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${service.serviceId}</td>
            <td>${service.vehicleId}</td>
            <td>${service.serviceDate}</td>
            <td>${service.serviceType}</td>
            <td>${service.cost}</td>
            <td class="action-buttons">
                <button class="edit" onclick="editService('${service.serviceId}')">Edit</button>
                <button class="delete" onclick="deleteService('${service.serviceId}')">Delete</button>
            </td>
        `;
        serviceTableBody.appendChild(row);
    });
}

// Function to edit a customer
function editService(serviceId) {
    const serviceToEdit = services.find((service) => service.serviceId === serviceId);
    if (!serviceToEdit) {
        alert("Service not found!");
        return;
    }
    // Populate the form fields with the existing service data
    document.getElementById("serviceId").value = serviceToEdit.serviceId;
    document.getElementById("vehicleId").value = serviceToEdit.vehicleId;
    document.getElementById("serviceDate").value = serviceToEdit.serviceDate.split("T")[0];
    document.getElementById("serviceType").value = serviceToEdit.serviceType;
    document.getElementById("cost").value = serviceToEdit.cost;
    // Scroll to the form for better user experience
    document.getElementById("serviceTable").scrollIntoView();
}

// Add or Edit Service Record
serviceTable.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    const service = {
        serviceId: document.getElementById("serviceId").value,
        vehicleId: document.getElementById("vehicleId").value,
        serviceDate: document.getElementById("serviceDate").value.split("T")[0],
        serviceType: document.getElementById("serviceType").value,
        cost: parseFloat(document.getElementById("cost").value).toFixed(2),
    };

    // Check if this is an existing service (edit) or a new service (add)
    const existingServiceIndex = services.findIndex((s) => s.serviceId === service.serviceId);

    if (existingServiceIndex !== -1) {
        // Update existing service
        fetch(`/Sreg/${service.serviceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(service),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update service");
                }
                return response.json();
            })
            .then(() => {
                fetchServices();
            })
            .catch((error) => console.error('Error updating service:', error));
    } 
    else {
        fetch('/Sreg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(service),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add service");
                }
                return response.json();
            })
            .then(() => {
                            // Refresh the table
                fetchServices();
            })
            .catch((error) => console.error('Error adding service:', error));
    }
    // Reset the form
    serviceTable.reset();
});

// Delete Record
function deleteService(serviceId) {
    if (confirm("Are you sure you want to delete this service record?")) {
        const existingServiceIndex = services.findIndex((c) => c.serviceId === serviceId);
        if (existingServiceIndex >= 0) {
        fetch(`/Sreg/${serviceId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to delete service");
                }
                return response.json();
        })
            .then(() => {
                fetchServices();
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
    const filteredServices = services.filter(
        (service) =>
            service.vehicleId.toLowerCase().includes(searchQuery) ||
            service.serviceType.toLowerCase().includes(searchQuery)
    );
    renderFilteredServices(filteredServices);
});

// Render Services Table
function renderFilteredServices(filteredServices) {
    serviceTableBody.innerHTML = ""; // Clear the table body
    filteredServices.forEach((service, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${service.serviceId}</td>
            <td>${service.vehicleId}</td>
            <td>${service.serviceDate}</td>
            <td>${service.serviceType}</td>
            <td>${service.cost}</td>
            <td class="action-buttons">
                <button class="edit" onclick="editService(${index})">Edit</button>
                <button class="delete" onclick="deleteService(${index})">Delete</button>
            </td>
        `;
        serviceTableBody.appendChild(row);
    });
}

// Select the back button
const backButton = document.getElementById("backButton");
backButton.addEventListener("click", function () {

    if (window.history.length > 1) {
        window.history.back();
    } else {
        alert("No previous page in history.");
    }
});