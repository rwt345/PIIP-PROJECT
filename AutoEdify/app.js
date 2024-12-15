const { log } = require("console");
const express = require('express');
const bcrypt = require("bcrypt");
const path = require("path");
const app = express();
const ejs = require("ejs");
const connectDB = require("./src/db/conn.js");
connectDB();
const mongoose = require('mongoose');
const { connect } = require("http2");
const Vehicle = require("./src/models/registers.js")
const Customer = require("./src/models/customer.js");

const ServiceRecord = require("./src/models/service.js");
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;
app.use(express.json()); 
app.use(express.urlencoded({extended: true }));
app.use(express.static(path.join (__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index")
});

// vehicle form
app.get("/Vreg", async (req, res) => {
    res.render("Vreg");
});

app.post("/Vreg", async (req, res) => {
    try {
        const newVehicle = new Vehicle({
            vehicleName: req.body.vehicleName,
            year: req.body.year,
            model: req.body.model,
            stateOfRegistration: req.body.stateOfRegistration,
            purchaseType: req.body.purchaseType,
            yearOwned: req.body.yearOwned,
            currentMileage: req.body.currentMileage
        });       
   await newVehicle.save();
        res.redirect('/Creg');
    }   
    catch (error) {
        console.error('Error saving vehicle:', error);
        res.status(500).send('Error saving vehicle. Please try again.');
    }
});

app.get("/Creg", async (req, res) => {
    res.render("Creg");
});

// Add customer
app.post("/Creg", async (req, res) => {
    const { customerId, customerName, contact, address, customerType } = req.body;
    try {
        const newCustomer = new Customer({
            customerId,
            customerName,
            contact,
            address,
            customerType
        });
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error("Error creating customer:", error);
        res.status(400).json({ message: "Failed to create customer." });
    }
});

// Edit customer
app.put("/Creg/:customerId", async (req, res) => {
    const { customerId } = req.params;

    const { customerName, contact, address, customerType } = req.body;
    try {
        const updatedCustomer = await Customer.findOneAndUpdate(
            { customerId: customerId },     // Find by customerId
            {customerName: customerName, contact: contact, address: address, customerType: customerType },
            {new: true } 
        );
        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found." });
        }
        res.status(200).json(updatedCustomer);
    } catch (error) {
        console.error("Error updating customer:", error);
        res.status(500).json({ message: "Failed to update customer app .js." });
    }


});

app.delete("/Creg/:customerId", async (req, res) => {
    const { customerId } = req.params;
    try {
        const deletedCustomer = await Customer.findOneAndDelete({ customerId: customerId });

        //const deletedCustomer = await Customer.findByIdAndDelete(customerId);
        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found." });
        }
        res.json({ message: "Customer deleted successfully." });
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ message: "Failed to delete customer." + error });
    }
});

app.get('/Creg/all', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({customers, message: 'Customer record found successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to find Customer record.' });
    }
});

app.get("/Sreg", async (req, res) => {
    res.render("Sreg");
});

app.post('/Sreg', async (req, res) => {
    const { serviceId, vehicleId, serviceDate, serviceType, cost } = req.body;
    try {
        const newServiceRecord = new ServiceRecord({
            serviceId: serviceId,
            vehicleId: vehicleId,
            serviceDate: serviceDate,
            serviceType: serviceType,
            cost: cost,
        });
        await newServiceRecord.save();
        res.status(201).json(newServiceRecord);
    } catch (error) {
        console.log("Error creating Service details:", error)
        res.status(400).json({ error: 'Failed to add service record.' });
    }
});

// Update an existing service record
app.put('/Sreg/:serviceId', async (req, res) => {
    const { serviceId } = req.params;
    const { vehicleId, serviceDate, serviceType, cost } = req.body;
    try {
        const updatedServiceRecord = await ServiceRecord.findOneAndUpdate(
            { serviceId:serviceId },
            { vehicleId:vehicleId ,serviceDate:serviceDate, serviceType:serviceType,  cost:cost },
            { new: true }
        );
        if (!updatedServiceRecord) {
            return res.status(404).json({ error: 'Service record not found.' });
        }
        res.status(200).json({ message: 'Service record updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update service record.' });
    }
});

app.delete("/Sreg/:serviceId", async (req, res) => {
    const { serviceId } = req.params;
    try {
        const deletedService = await ServiceRecord.findOneAndDelete({ serviceId: serviceId });
        if (!deletedService) {
            return res.status(404).json({ message: "Customer not found." });
        }
        res.json({ message: "Service deleted successfully." });
    } catch (error) {
        console.error("Error deleting Service:", error);
        res.status(500).json({ message: "Failed to delete Service." + error });
    }
});

app.get('/Sreg/all', async (req, res) => {
    try {
        const services = await ServiceRecord.find();
        res.status(200).json({services, message: 'Service record found successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to find service record.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
})
