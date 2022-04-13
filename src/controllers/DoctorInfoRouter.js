const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');

router.post('/add', (req, res) => {
    const {idStaff, idSpecialist, contentHTML, contentMarkdown,description} = req.body;
    let query = `insert into doctor_info(idStaff, idSpecialist, contentHTML, contentMarkdown,description)
                 values(${idStaff}, ${idSpecialist}, '${contentHTML}', '${contentMarkdown}','${description}')
                 ON DUPLICATE KEY UPDATE idSpecialist = ${idSpecialist}, 
                 contentHTML = '${contentHTML}', contentMarkdown = '${contentMarkdown}',description = '${description}'`;
    connection.query(query, (err, result) => {     
        if(err) return res.status(400).json({success: false, message: "Erorr",err});
        return res.status(200).json({success: true, message: "Add success", idStaff, idSpecialist, contentHTML, contentMarkdown,description});
    })
})

router.get('/getAllDoctor', (req, res) => {
    let query = `select idStaff,name,image from staff where idRole = 3 `;

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});
        return res.status(200).json({success: true, message: "Get all doctor success", result});
    })
})

router.get('/getDetailDoctor', (req, res) => {
    const idStaff = req.query.idStaff; 
    let query = `select *,staff.image,specialists.image as imgspec from staff,doctor_info, specialists where staff.idStaff = doctor_info.idStaff and doctor_info.idSpecialist = specialists.idSpecialist and doctor_info.idStaff = ${idStaff} `
    connection.query(query, async (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr",err})
        
            return res.status(200).json({success: true, message: "get success",result})
        
    })

    
})

router.post('/getSpecialist', (req, res) => {
    const idSpecialist = req.body.idSpecialist;
    let query = `select idSpecialist, departmentName from specialist where idSpecialist = ${idSpecialist}`
    connection.query(query, async (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"})
        return res.status(200).json({success: true, message: "Get specialist success", result});
    })
})

router.get('/getAllSpecialist', (req, res) => {
    let query = `select idSpecialist, departmentName from Specialist`;

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});
        return res.status(200).json({success: true, message: "Get all specialist success", result});
    })
})

router.get('/getDoctorSpecialist', (req, res) => {
    const idSpecialist = req.query.idSpecialist;
    let query = `select * from staff, doctor_info where staff.idStaff= doctor_info.idStaff and idSpecialist = ${idSpecialist}`
    connection.query(query, async (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"})
        return res.status(200).json({success: true, message: "Get specialist success", result});
    })
})







module.exports = router;