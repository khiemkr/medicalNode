const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');
const bcrypt = require('bcrypt');


// Login for Staff (email, password)

router.post('/staff', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // const { email, password} = req.body;
    let user = {}
    if(email === '') return res.status(200).json({success: false, message: "email empty"});
    if(password === '') return res.status(200).json({success: false, message: "password empty"});


    let query = `select * from staff where email='${email}' and active = 1`;
    let query1 = `select password from staff where email='${email}'`;

    connection.query(query, (err, result) => {

        if(err) return res.status(400).json({success: false, message: "fail"});

        if(result.length > 0) {
            connection.query(query1,async (errs, results) => {

                if(errs) return res.status(400).json({success: false, message: "fail1"});

                if(results.length > 0) {
                    // const condition = await bcrypt.compareSync(password, results[0].password);
                    user = result;
                    if(password === password) {
                        return res.status(200).json({success: true, message: "login success", email, user}); 
                    }
                    return res.status(200).json({success: true, message: "password false"});
                } else {
                    return res.status(200).json({success: true, message: "password empty"});
                }
            })        
        } else {
            return res.status(200).json({success: true, message: "email invalid"});
        }
    })

    
})
router.post('/patient', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // const { email, password} = req.body;
    let user = {}
    if(email === '') return res.status(200).json({success: false, message: "email empty"});
    if(password === '') return res.status(200).json({success: false, message: "password empty"});


    let query = `select * from patient where email='${email}' and active = 1`;
    let query1 = `select password from patient where email='${email}'`;

    connection.query(query, (err, result) => {

        if(err) return res.status(400).json({success: false, message: "fail"});
        if(result.length > 0) { 
            connection.query(query1,async (errs, results) => {

                if(errs) return res.status(400).json({success: false, message: "fail1"});

                if(results.length > 0) {
                    // const condition = await bcrypt.compareSync(password, results[0].password);
                    user = result;
                    if(password === password) {
                        return res.status(200).json({success: true, message: "login success", email, user}); 
                    }
                    return res.status(200).json({success: true, message: "password false"});
                } else {
                    return res.status(200).json({success: true, message: "password empty"});
                }
            })        
        } else {
            return res.status(200).json({success: true, message: "email invalid"});
        }
    })

    
})
module.exports = router;