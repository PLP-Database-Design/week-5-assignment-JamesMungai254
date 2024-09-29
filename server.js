// Initialize dependencies

const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(express.json());
app.use(cors());    
dotenv.config();




// Connect to MySQL database

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log('Connection failed: ' + err);
    } 

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);

         // question 1: Retrieve all patients
         app.get('/patients', (req, res) => {
            const sqlSelect = "SELECT patient_id,first_name,last_name,date_of_birth FROM patients";
            db.query(sqlSelect, (err, result) => {
                res.send(result);
            });
        });

        // question 2: Retrieve all providers
        app.get('/providers', (req, res) => {
            const sqlSelect = "SELECT first_name,last_name,provider_specialty FROM providers";
            db.query(sqlSelect, (err, result) => {
                res.send(result);
            });
        });

        // question 3: Retrieve all patients by their first name
        app.get('/patients/:first_name', (req, res) => {
            const firstName = req.params.first_name;
            const sqlSelect = "SELECT * FROM patients WHERE first_name = ?";
            db.query(sqlSelect, firstName, (err, result) => {
                res.send(result);
            });
        });

        // Retrieve all providers by their specialty

        app.get('/providers/:provider_specialty', (req, res) => {
            const providerSpecialty = req.params.provider_specialty;
            const sqlSelect = "SELECT * FROM providers WHERE provider_specialty = ?";
            db.query(sqlSelect, providerSpecialty, (err, result) => {
                res.send(result);
            });
        });
        

    });
});

