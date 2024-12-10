const { log } = require("console");
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");
const { name } = require("ejs");
const { model } = require("mongoose");
const Vehicle = require("./models/registers");


const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register",async (req, res) => {
    // res.render("register");

    try {
        const registerEmployee = new Register({
            name: req.body.name,
            password: req.body.password
        })
   const registered =  await  registerEmployee.save();
   res.status(201).render("index");

    }
    
    catch (error) {
        res.status(400).send(error);
    }
});



app.get("/vehicleRegister", (req, res) => {
    res.render("Vreg");
});

app.post("/vehicleRegister",async (req, res) => {
    /

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
   res.status(201).render("Vreg");

    }
    
    catch (error) {
        res.status(400).send(error);
    }
});





app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
    
})