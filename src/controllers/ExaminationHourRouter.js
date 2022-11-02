const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');


router.post('/add', (req, res) => { 
    const slotTime = req.body.slotTime;
    // const currentDate = req.body.currentDate;
    let query = `insert into examination_hours(slotTime, active) values('${slotTime}',1)`; 
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr",currentDate});
        return res.status(200).json({success: true, message: "Add success"});
    })
})
router.patch('/edit', (req, res) => {
    const {idTime, slotTime} = req.body;
    let query = `select idTime, slotTime from examination_hours where idTime = ${idTime}`;

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});
 
        let slotTimeOld = result[0].slotTime;
        let slotTimes;

        if(slotTime === '') {slotTimes = slotTimeOld} else {slotTimes = slotTime}
        
        let query1 = `update examination_hours set slotTime = '${slotTimes}' where idTime = ${idTime}`;
        connection.query(query1, (err, result1) => {
            if(err) return res.status(400).json({success: false, message: "Erorr1"});
            return res.status(200).json({success: true, message: "Edit success" });
        })
    })
})
 
router.delete('/delete', (req, res) => {
    let idTime = req.body.idTime;
    let query = `update examination_hours set active = 0 where idTime = ${idTime}`;

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"})
        return res.status(200).json({success: true, message: "Delete success"})
    })
})

router.get('/getAll', (req, res) => {
    let query = `select * from examination_hours where active = 1`;
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr",err});
        return res.status(200).json({success: true, message: "Get all success", result})
    })
})
router.get('/getAllDay', (req, res) => {
    let query = `select currentDate from examination_hours where active = 1 group by currentDate` ;
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr",err});
        return res.status(200).json({success: true, message: "Get all success", result})
    })
})
router.get('/getAllSlotTime', (req, res) => {
    let query = `select slotTime,idTime from examination_hours where active = 1 group by slotTime` ;
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr",err});
        return res.status(200).json({success: true, message: "Get all success", result})
    })
})
router.get('/getSingle', (req, res) => {
    const idTime = req.query.idTime;
    let query = `select slotTime from examination_hours where idTime = ${idTime} and active = 1`;
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});
        return res.status(200).json({success: true, message: "Get slot time success", result})
    })
})


module.exports = router;