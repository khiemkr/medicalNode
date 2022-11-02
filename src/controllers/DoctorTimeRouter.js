const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');
router.post('/add', (req, res) => { 
    const { idStaff, idTime, date } = req.body;
    console.log(idStaff,idTime,date)
    let queryCheck = `select idTime from doctor_time where idStaff = ${idStaff} and date = '${date}'`
    connection.query(queryCheck, (err, resultCheck) => {
        if (err) return res.status(400).json({ success: false, message: "Erorr check" });
        if (resultCheck.length === 0) {
            let query = `insert into doctor_time(idStaff, idTime, date, active) values (${idStaff}, ${idTime}, '${date}', 1)`;
            connection.query(query, (err, result) => {
                if (err) return res.status(200).json({ success: false, message: "Erorr add not time" });
                return res.status(200).json({ success: true, message: "Add time success 1" });
            })
        } else{
            var checkTime = true
            for (let i = 0; i < resultCheck.length; i++) {
                if (resultCheck[i].idTime === idTime) {
                    checkTime = false;
                    break;
                }
            }
         
            if (checkTime) {
                let query = `insert into doctor_time(idStaff, idTime, date, active) values (${idStaff}, ${idTime}, '${date}', 1)`;
                connection.query(query, (err, result) => {
                    if (err) return res.status(200).json({ success: false, message: "Erorr add not time" });
                    return res.status(200).json({ success: true, message: "Add time success" });
                })
            } else return res.status(200).json({ success: true, message: "Time revered" })
        }
    })

})
router.get('/getSingleTime', (req, res) => { 
    const idStaff = req.query.idStaff;

    let query = `select * from doctor_time, examination_hours, staff  where doctor_time.idTime = examination_hours.idTime and staff.idStaff = doctor_time.idStaff and staff.idStaff = ${idStaff} group by doctor_time.idTime `;
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr get all time doctor",err})
        return res.status(200).json({success: true, message: "Get all time doctor success", result});
    })
})
router.get('/getAllTime', (req, res) => {
    let query = `select * from doctor_time, examination_hours, staff  where doctor_time.idTime = examination_hours.idTime and staff.idStaff = doctor_time.idStaff`;
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr get all time doctor"})
        return res.status(200).json({success: true, message: "Get all time doctor success", result});
    })
})

router.get('/getAllDayDoctor', (req, res) => {
    const idStaff = req.query.idStaff
    let query = `select date from doctor_time where idStaff = ${idStaff} group by date`
    connection.query(query, (err, results) => {
        if (err) return res.status(400).json({ success: false, message: "Erorr get all day doctor",err })
        var dateCurrent = new Date();
        var dayCurrent = parseInt(('0' + dateCurrent.getDate()).slice(-2));
        var monthCurrent = parseInt(('0' + (dateCurrent.getMonth() + 1)).slice(-2));
        var yearCurrent = parseInt(dateCurrent.getFullYear().toString());
        var sumCurrentDate = dayCurrent + monthCurrent *30 + yearCurrent * 365
        var result = [];
        for (let i = 0; i < results.length; i++) {
            let year = parseInt(results[i].date.slice(0, 4))
            let month = parseInt(results[i].date.slice(5, 7))
            let day = parseInt(results[i].date.slice(8, 10))
            let sumDate = year * 365 + month * 30 + day        
            if (sumDate >= sumCurrentDate) {
                result.push({ day: results[i].date })
            }
        }
        return res.status(200).json({ success: true, message: "Get all day doctor success", result });
    })
})
router.get('/getAllTimeInDay', (req, res) => {
    const {idStaff,date} = req.query
    
    console.log('check',idStaff)
    let query = `select examination_hours.slotTime,doctor_time.active,doctor_time.idTime,doctor_time.date from examination_hours, doctor_time where doctor_time.idStaff = ${idStaff} and examination_hours.idTime = doctor_time.idTime and date = '${date}'`
    connection.query(query, (err, result) => {
        console.log(err)
        if(err) return res.status(400).json({success: false, message: "Erorr date",err})
        return res.status(200).json({success: true, message: "Success", result});
    })
})


module.exports = router;