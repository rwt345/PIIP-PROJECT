const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 6, // Ensure a minimum length for security
      },
});

const Register = new mongoose.model("Register", employeeSchema);
module.exports = Register;