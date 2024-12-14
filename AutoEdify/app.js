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
// const { Customer, Vehicle } = require("./src/models/registers.js");
const Vehicle = require("./src/models/registers.js")
const Customer = require("./src/models/customer.js");

const ServiceRecord = require("./src/models/service.js");
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;
app.use(express.json()); // converting data into json format
app.use(express.urlencoded({extended: true }));
app.use(express.static(path.join (__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index")
});
       // vehicle registration form
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
        
   // save the new vehicle to the database
   await newVehicle.save();
        // Redirect or send a success response
        res.redirect('/Creg'); // Redirect to the desired page after successful submission
    }
    
    catch (error) {
        console.error('Error saving vehicle:', error);
        res.status(500).send('Error saving vehicle. Please try again.');
    }
});


//customer registration form
app.get("/Creg", async (req, res) => {
    res.render("Creg");

});


// app.get('/Creg', async (req, res) => {
//     try {
//         const customers = await Customer.find(); // Fetch all customers from MongoDB
//         res.json({ customers }); // Respond with JSON object
//     } catch (error) {
//         console.error('Error fetching customers:', error);
//         res.status(500).json({ error: 'Failed to fetch customers' });
//     }
// });



// app.get('/Creg', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'Creg.ejs')); // Ensure the correct path to your HTML file
// });



// 2. Add a new customer
app.post("/Creg", async (req, res) => {
    const { customerId, customerName, contact, address, customerType } = req.body;
console.log(req.body);

    try {
        const newCustomer = new Customer({
            customerId,
            customerName,
            contact,
            address,
            customerType,
        });

        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error("Error creating customer:", error);
        res.status(400).json({ message: "Failed to create customer." });
    }
});



app.get("/Sreg", async (req, res) => {
    res.render("Sreg");
});


// // GET /Sreg - Fetch all service records
// app.get('/Sreg', async (req, res) => {
//     try {
//         const services = await ServiceRecord.find();
//         res.status(200).json(services);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch service records.' });
//     }
// });

// POST /Sreg - Add a new service record
app.post('/Sreg', async (req, res) => {
    const { id, vehicleId, date, type, cost } = req.body;

    try {
        const newServiceRecord = new ServiceRecord({
            serviceId:id,
            vehicleId: vehicleId,
            serviceDate:date,
            serviceType:type,
            cost:cost,
        });


        await newServiceRecord.save();
        res.status(201).json({ message: 'Service record added successfully.' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to add service record.' });
    }
});




// PUT /Sreg/:id - Update an existing service record
app.put('/Sreg/:id', async (req, res) => {
    const { id } = req.params;
    const { serviceId, vehicleId, serviceDate, serviceType, cost } = req.body;

    try {
        const updatedServiceRecord = await ServiceRecord.findByIdAndUpdate(
            id,
            { serviceId, vehicleId, serviceDate, serviceType, cost },
            { new: true, runValidators: true } // Return the updated record and validate inputs
        );

        if (!updatedServiceRecord) {
            return res.status(404).json({ error: 'Service record not found.' });
        }

        res.status(200).json({ message: 'Service record updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update service record.' });
    }
});

// DELETE /Sreg/:id - Delete a service record
app.delete('/Sreg/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedServiceRecord = await ServiceRecord.findByIdAndDelete(id);

        if (!deletedServiceRecord) {
            return res.status(404).json({ error: 'Service record not found.' });
        }

        res.status(200).json({ message: 'Service record deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete service record.' });
    }
});

app.get('/Sreg/all', async (req, res) => {

    try {
        const services = await ServiceRecord.find();

        res.status(200).json({services, message: 'Service record found successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete service record.' });
    }
});

app.get('/Creg/all', async (req, res) => {

    try {
        const customers = await Customer.find();

        res.status(200).json({customers, message: 'Service record found successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete service record.' });
    }
});















// app.get
// app.get("/Creg", async (req, res) => {
//     try {
//         const customers = await Customer.find();
//         res.json("Creg");
//     } catch (error) {
//         console.error("Error fetching customers:", error);
//         res.status(500).json({ message: "Failed to fetch customers." });
//     }
// });


// 3. Update an existing customer
// app.put("/Creg/:id", async (req, res) => {
//     const { id } = req.params;
//     const { customerId, customerName, contact, address, customerType } = req.body;

//     try {
//         const updatedCustomer = await Customer.findByIdAndUpdate(
//             id,
//             { customerId, customerName, contact, address, customerType },
//             { new: true } // Return the updated document
//         );

//         if (!updatedCustomer) {
//             return res.status(404).json({ message: "Customer not found." });
//         }

//         res.json(updatedCustomer);
//     } catch (error) {
//         console.error("Error updating customer:", error);
//         res.status(400).json({ message: "Failed to update customer." });
//     }
// });

// // 4. Delete a customer
// app.delete("/Creg/:id", async (req, res) => {
//     const { id } = req.params;

//     try {
//         const deletedCustomer = await Customer.findByIdAndDelete(id);

//         if (!deletedCustomer) {
//             return res.status(404).json({ message: "Customer not found." });
//         }

//         res.json({ message: "Customer deleted successfully." });
//     } catch (error) {
//         console.error("Error deleting customer:", error);
//         res.status(500).json({ message: "Failed to delete customer." });
//     }
// });





// // Call fetchCustomers when the page loads
// fetchCustomers();


// //Get all customers
// app.get("/customers", async (req, res) => {
//     try {
//         const customers = await Customer.find();
//         res.json(customers); // Return customers as JSON
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Create a new customer
// app.post("/Creg", async (req, res) => {
//     const { customerId, customerName, contact, address, customerType } = req.body;
//     // Create a new customer instance
//     const customer = new Customer({
//         customerId,
//         customerName,
//         contact,
//         address,
//         customerType
//     });
//     try {
//         const newCustomer = await customer.save();
//         //res.redirect('/Creg');
//         res.status(201).json(newCustomer); // Respond with the newly created customer
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// app.get("/Sreg", (req, res) => {
//     res.render("Sreg");
// });

app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
})


// Redirect to the Service Records page
// app.get("/Sreg", (req, res) => {
//     res.redirect("/Sreg");
// });

// // Update an existing customer
// app.put("/:id", async (req, res) => {
//     const { customerId, customerName, contact, address, customerType } = req.body;

//     try {
//         const updatedCustomer = await Customer.findByIdAndUpdate(
//             req.params.id,
//             { customerId, customerName, contact, address, customerType },
//             { new: true }
//         );
//         res.json(updatedCustomer); // Respond with updated customer
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Delete a customer
// app.delete("/:id", async (req, res) => {
//     try {
//         const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
//         res.json(deletedCustomer); // Respond with the deleted customer data
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });





// app.get("/Creg", (req, res) => {
//     res.render("Creg");
// });




// app.get("/register", (req, res) => {
//     res.render("register");
// });

// app.use('/');

// Route for login
// app.post('/login', async (req, res) => {
//     const { name, password } = req.body;
//     try {
//         const user = await User.findOne({ name });
//         if (user && await bcrypt.compare(password, user.password)) {
//             res.redirect('/dashboard'); // Redirect to dashboard or home page on success
//         } else {
//             res.status(401).send('Invalid username or password');
//         }
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// });

// Route for Registration

// app.post('/register', async (req, res) => {
//     const { name, email, password, confirmpassword } = req.body;
//     if (password !== confirmpassword) {
//         return res.status(400).send('Passwords do not match');
//     }
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();
//         res.redirect('/'); // Redirect to login page on success
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// });


// const { body, validationResult } = require('express-validator');

// app.post(
//     '/register',
//     [
//         body('email').isEmail().withMessage('Enter a valid email'),
//         body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
//     ],
//     async (req, res) => {
//         try {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ errors: errors.array() });
//             }

//             // Replace this with actual registration logic
//             // Example: save user to a database
//             console.log(req.body); // Log the request body
//             res.status(200).json({ message: "User registered successfully" });
//         } catch (err) {
//             console.error(err.message); // Log the error
//             res.status(500).json({ message: "Server error" });
//         }
//     }
// );




// Register User
// app.post("/register", async (req,res) => {
//    try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10); 
//     const data = {
//         name: req.body.name,
//         password: req.body.password
//     };
//     const userdata = await collection.create(data); 

//     console.log(userdata);
//     res.status(200).send("User registered successfully");
// } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).send("Server error");
// }
// });



// app.post("/register",async (req, res) => {
    

//     try {
//         const registerEmployee = new Register({
//             name: req.body.name,
//             password: req.body.password
//         })
//    const registered =  await  registerEmployee.save();
//    res.render("registered");

//     }
    
//     catch (error) {
//         res.status(400).send(error);
//     }
// });





// app.post("/register", async (req, res) => {
//     let {name, password} = req.body;
    
//   let createdUser = await RegisterModel.create({
//         name: name,
//         password: password
//     });
//     res.render(createdUser);
// })

