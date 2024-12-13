const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customerSchema = new Schema({
    customerId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    customerName: { 
        type: String, 
        required: true 
    },
    contact: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    customerType: { 
        type: String, 
        required: true, 
        enum: ['Individual', 'Corporate'], // Enum for Customer Type
    }
}, { timestamps: true }); // Include timestamps for created and updated times
const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;