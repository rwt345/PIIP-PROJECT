const mongoose = require('mongoose');

const serviceRecordSchema = new mongoose.Schema({
    serviceId: {
        type: String,
        unique: true, // Ensure serviceId is unique
        trim: true,
    },
    vehicleId: {
        type: String,
        required: true,
        trim: true,
    },
    serviceDate: {
        type: Date,
        required: true,
    },
    serviceType: {
        type: String,
        enum: [
            "Oil Change",
            "Tire Rotation",
            "Brake Inspection",
            "Battery Replacement",
            "General Maintenance",
        ], // Restrict values to predefined service types
    },
    cost: {
        type: Number,
        required: true,
        min: 0, // Ensure cost is not negative
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

const ServiceRecord = mongoose.model('ServiceRecord', serviceRecordSchema);

module.exports = ServiceRecord;
