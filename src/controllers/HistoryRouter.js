const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');


router.post('/add', (req, res) => {
    const idBooking = req.body.idBooking
    let query = `select booking.idBooking, examination_hours.idTime, booking.date, patient.idPatient, staff.idStaff
                    from booking, examination_hours, patient, doctor_info, status, staff, doctor_time
                    where booking.idTime = doctor_time.idTime and booking.idPatient = patient.idPatient and
                    booking.idStaff = doctor_info.idStaff and doctor_info.idStaff = staff.idStaff
                    and doctor_time.idTime = examination_hours.idTime and idBooking and idBooking = ${idBooking} group by booking.idBooking`
    connection.query(query, (err, result) => {
        if (err) return res.status(400).json({ success: false, message: "Erorr get examination schedule success",err})
         
        let idBooking = result[0].idBooking;
        let idTime = result[0].idTime;
        let date = result[0].date;
        let idStaff = result[0].idStaff;
        let idPatient = result[0].idPatient;
       
        let queryAddHistory = `insert into history(idBooking, slotTime, date, nameDoctor, namePatient) values(${idBooking}, ${idTime}, '${date}', ${idStaff}, ${idPatient})`
        connection.query(queryAddHistory, (err, resultAdd) => {
            if(err) return res.status(400).json({success: false, message: "Erorr add history",err});
            let queryUpdateBooking = `update booking set active = 0 where idBooking = ${idBooking}`
            connection.query(queryUpdateBooking, (err) => {
                if(err) return res.status(400).json({success: false, message: "Erorr update booking"})
                return res.status(200).json({success: true, message: "Add history success"})
            })
        })
        
    })

})
router.get('/getAllHistoryPatient', (req, res) => {
    const idPatient = req.query.idPatient;
    let query = `select booking.idBooking, examination_hours.slotTime, booking.date, patient.name as namePatient, staff.name as nameDoctor
                from booking, examination_hours, patient, doctor_info, staff, doctor_time
                where booking.idTime = doctor_time.idTime and booking.idPatient = patient.idPatient and
                booking.idStaff = doctor_info.idStaff and doctor_info.idStaff = staff.idStaff
                and doctor_time.idTime = examination_hours.idTime and booking.idPatient = ${idPatient} group by idBooking`;
    connection.query(query, (err, result) => {  
        console.log(err)
         if (err) return res.status(400).json({ success: false, message: "Erorr get history patient success" })
         return res.status(200).json({ success: true, message: "Get history patient success", result })
    })
})

module.exports = router