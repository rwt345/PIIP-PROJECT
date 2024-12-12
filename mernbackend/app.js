const { log } = require("console");
const express = require("express");
const path = require("path");
const app = express();
const ejs = require("ejs");

require("./src/db/conn.js");
const Register = require("./src/models/registers.js");
const mongoose = require("mongoose");
const Vehicle = require("./src/models/registers.js");

app.set("view engine", "ejs");


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join (__dirname, "public")));



app.get("/", (req, res) => {
    res.render("index")
});

app.get("/register", (req, res) => {
    res.render("register");
});



app.post("/register",async (req, res) => {
    

    try {
        const registerEmployee = new Register({
            name: req.body.name,
            password: req.body.password
        })
   const registered =  await  registerEmployee.save();
   res.render("registered");

    }
    
    catch (error) {
        res.status(400).send(error);
    }
});


// app.post("/register", async (req, res) => {
//     let {name, password} = req.body;
    
//   let createdUser = await RegisterModel.create({
//         name: name,
//         password: password
//     });
//     res.render(createdUser);
// })




app.get("/Vreg", (req, res) => {
    res.render("Vreg");
});

app.post("/Vreg", async (req, res) => {
    

    try {
        const registerVehicle = new Vehicle({
            vehicleName: req.body.vehicleName,
            year: req.body.year,
            make: req.body.make,
            model: req.body.make,
            stateOfRegistration: req.body.stateOfRegistration,
            purchaseType: req.body.purchaseType,
            yearOwnedSince: req.body.yearOwnedSince,
            currentMileage: req.body.currentMileage,
            image: req.body.image
        })
   const vehicleRegistered =  await  registerVehicle.save();
   res.render("vehicleRegistered");

    }
    
    catch (error) {
        res.send(error);
    }
});


app.get("/Creg", (req, res) => {
    res.render("Creg");
});

app.get("/Sreg", (req, res) => {
    res.render("Sreg");
});


app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
    
})
