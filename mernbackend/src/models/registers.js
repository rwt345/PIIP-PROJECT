const mongoose = require("mongoose");
// Define Login Schema
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      password: {
        type: String,
        required: true
      },
});

const Register = new mongoose.model("Register", employeeSchema);
module.exports = Register;


// Define the Vehicle Schema
const vehicleSchema = new mongoose.Schema({
  vehicleName: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1886, // The year the first car was invented
    max: new Date().getFullYear(),
  },
  make: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  stateOfRegistration: {
    type: String,
    enum: ['Dublin', 'Cork', 'Galway'], // Restrict to specific options
    required: true,
  },
  purchaseType: {
    type: String,
    enum: ['New', 'Used'], // Restrict to 'New' or 'Used'
    required: true,
  },
  yearOwnedSince: {
    type: Number,
    required: true,
    min: 1886,
    max: new Date().getFullYear(),
  },
  currentMileage: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String, // URL or path to the uploaded image
    required: false,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create the Vehicle model
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;