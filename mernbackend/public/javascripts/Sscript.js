const serviceForm = document.getElementById("serviceForm");
const serviceTableBody = document.querySelector("#serviceTable tbody");

let services = [];

// Add Service Record
serviceForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const service = {
        id: document.getElementById("serviceId").value,
        vehicleId: document.getElementById("vehicleId").value,
        date: document.getElementById("serviceDate").value,
        type: document.getElementById("serviceType").value,
        cost: parseFloat(document.getElementById("cost").value).toFixed(2),
    };

    // Add service to the array
    services.push(service);

    // Refresh the table
    renderServices();

    // Reset the form
    serviceForm.reset();
});

// Render Services Table
function renderServices() {
    serviceTableBody.innerHTML = ""; // Clear the table body

    services.forEach((service, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${service.id}</td>
            <td>${service.vehicleId}</td>
            <td>${service.date}</td>
            <td>${service.type}</td>
            <td>${service.cost}</td>
            <td class="action-buttons">
                <button class="edit" onclick="editService(${index})">Edit</button>
                <button class="delete" onclick="deleteService(${index})">Delete</button>
            </td>
        `;

        serviceTableBody.appendChild(row);
    });
}

// Edit Service Record
function editService(index) {
    const service = services[index];

    // Populate form fields with service details
    document.getElementById("serviceId").value = service.id;
    document.getElementById("vehicleId").value = service.vehicleId;
    document.getElementById("serviceDate").value = service.date;
    document.getElementById("serviceType").value = service.type;
    document.getElementById("cost").value = service.cost;

    // Remove the old record from the array
    services.splice(index, 1);

    // Refresh the table
    renderServices();
}

// Delete Service Record
function deleteService(index) {
    if (confirm("Are you sure you want to delete this service record?")) {
        services.splice(index, 1);
        renderServices();
    }
}
