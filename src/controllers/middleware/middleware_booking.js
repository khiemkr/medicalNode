const express = require('express');
const connection = require('../../config/connectDB');
const middleware = {
    checkvaluesTime: (req, res, next) => {
        const idTime = req.body.idTime;
        let query = `select * from examination_hours where idTime = ${idTime} and active = 1`;
        connection.query(query, (err, result) => {    
            if (err) return res.status(400).json({ success: false, message: "Erorr check time" });
            if (result.length === 0) return res.status(200).json({ success: true, message: "Values time empty!!!" })
            next()
        })
    },

    checkvaluesStaff: (req, res, next) => {
        const idStaff = req.body.idStaff;
        let query1 = `select * from staff where idStaff = ${idStaff} and idRole = 3 and active = 1`;
        connection.query(query1, (err, result1) => {
            if (err) return res.status(400).json({ success: false, message: "Erorr1 check staff" });
            if (result1.length === 0) return res.status(200).json({ success: true, message: "Values staff empty!!!" })
            next()
        })
    },
    checkvaluesPatient: (req, res, next) => {
        const idPatient = req.body.idPatient;
        let query2 = `select * from patient where idPatient = ${idPatient} and active = 1`;
        connection.query(query2, (err, result2) => {
            if (err) return res.status(400).json({ success: false, message: "Erorr2 check patient" });
            if (result2.length === 0) return res.status(200).json({ success: true, message: "Values patient empty!!!" })
            next()
        })
    },
    checkvaluesSpecialist: (req, res, next) => {
        const idSpecialist = req.body.idSpecialist;
        let query4 = `select * from specialists where idSpecialist = ${idSpecialist} and active = 1`;
        connection.query(query4, (err, result4) => {
            if (err) return res.status(400).json({ success: false, message: "Erorr4 check specialist" });
            if (result4.length === 0) return res.status(200).json({ success: true, message: "Values specialist empty!!!" })
            next()
        })
    },
    
}





module.exports = middleware;