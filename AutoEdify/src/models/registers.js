const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create the schema for vehicle details
const vehicleSchema = new Schema({
    vehicleName: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        min: 1886,  // The first car was made in 1886
        max: 2024   // Current year
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    stateOfRegistration: {
        type: String,
        required: true,
        enum: ['Dublin', 'Cork', 'Galway']  // You can add more states here
    },
    purchaseType: {
        type: String,
        required: true,
        enum: ['new', 'used']
    },
    yearOwned: {
        type: Number,
        required: true,
        min: 1900,
        max: 2024
    },
    currentMileage: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true 
});

// // Create the model based on the schema
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;










// Schema for login/logout


// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// const collection = mongoose.model('User', userSchema);
// module.exports = collection;


// Schema for login/logout


// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// const collection = mongoose.model('User', userSchema);
// module.exports = collection;



// Define Login Schema
// const employeeSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//       },
//       password: {
//         type: String,
//         required: true
//       },
// });

// const Register = new mongoose.model("Register", employeeSchema);
// module.exports = Register;

// // Define login Schema
// const LoginSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// // Collection part 
// const collection = new mongoose.model("users", LoginSchema);
// module.exports = collection;





// // Define the Vehicle Schema
// const vehicleSchema = new mongoose.Schema({
//   vehicleName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   year: {
//     type: Number,
//     required: true,
//     min: 1886, // The year the first car was invented
//     max: new Date().getFullYear(),
//   },
//   make: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   model: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   stateOfRegistration: {
//     type: String,
//     enum: ['Dublin', 'Cork', 'Galway'], // Restrict to specific options
//     required: true,
//   },
//   purchaseType: {
//     type: String,
//     enum: ['New', 'Used'], // Restrict to 'New' or 'Used'
//     required: true,
//   },
//   yearOwnedSince: {
//     type: Number,
//     required: true,
//     min: 1886,
//     max: new Date().getFullYear(),
//   },
//   currentMileage: {
//     type: Number,
//     required: true,
//     min: 0,
//   },
//   image: {
//     type: String, // URL or path to the uploaded image
//     required: false,
//   },
// }, { timestamps: true }); // Adds createdAt and updatedAt fields

// // Create the Vehicle model
// const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// module.exports = Vehicle;