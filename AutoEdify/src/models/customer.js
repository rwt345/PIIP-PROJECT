const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customerSchema = new Schema({
    customerId: { 
        type: String, 
        unique: true 
    },
    customerName: { 
        type: String        
    },
    contact: { 
        type: String    
    },
    address: { 
        type: String    
    },
    customerType: { 
        type: String,         
        enum: ['Individual', 'Corporate']
    }
}, { timestamps: true }); // Include timestamps for created and updated times
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;