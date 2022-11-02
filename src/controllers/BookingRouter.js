const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');


router.post('/add', (req, res) => {

     const { idTime, idStaff, idStatus, idPatient, date, idSpecialist, idPayment } = req.body;

     let queryCheck = `select idTime, date, idPatient, idStaff from booking where active = 1`;
     connection.query(queryCheck, (err, resultCheck) => {
          if (err) return res.status(400).json({ success: false, message: "Erorr check " });
          
          var checkDate = true;

          for (let i = 0; i < resultCheck.length; i++) {
               if (date === resultCheck[i].date) {
                    checkDate = false;
                    break;
               }
          }

          if (checkDate) {
               let queryUpdateDoctorTime = `update doctor_time set active = 0 where idStaff = ${idStaff} and idTime = ${idTime} and date = '${date}'`;
               connection.query(queryUpdateDoctorTime, (err, resultUDT) => {
                    if (err) return res.status(400).json({ success: false, message: "Erorr update time", err })

                    let query = `insert into booking(idTime, idStaff, idStatus, idPatient, date, idSpecialist, idPayment, paymentStatus, active)
                              values(${idTime}, ${idStaff}, 1, ${idPatient}, '${date}', ${idSpecialist}, ${idPayment}, 1, 1)`;
                    connection.query(query, (err, result) => {
                         if (err) return res.status(400).json({ success: false, message: "Erorr add booking",err });
                         return res.status(200).json({ success: true, message: "Booking success" });
                    })
               })

          } else {
               var checkTime = true;
               for (let i = 0; i < resultCheck.length; i++) {
                    if (idTime === resultCheck[i].idTime.toString()) {
                         checkTime = false;
                         break;
                    }
               }

               var checkPatien = true;
               for (let i = 0; i < resultCheck.length; i++) {
                    if (idPatient === resultCheck[i].idPatient.toString()) {
                         checkPatien = false;
                         break;
                    }
               }

               var checkStaff = true;
               for (let i = 0; i < resultCheck.length; i++) {
                    if (idStaff === resultCheck[i].idStaff.toString()) {
                         checkStaff = false;
                         break;
                    }
               }

               if ((!checkTime && !checkPatien && checkStaff) || (!checkTime && checkPatien && !checkStaff) || (!checkTime && !checkPatien && !checkStaff)) {
                    return res.status(200).json({ success: true, message: "Dont booking" ,err})
               } else {
                    let queryUpdateDoctorTime = `update doctor_time set active = 0 where idStaff = ${idStaff} and idTime = ${idTime} and date = '${date}'`;
                    connection.query(queryUpdateDoctorTime, (err, resultUDT) => {
                         if (err) return res.status(400).json({ success: false, message: "Erorr update time", err })

                         let query = `insert into booking(idTime, idStaff, idStatus, idPatient, date, idSpecialist, idPayment, paymentStatus, active)
                              values(${idTime}, ${idStaff}, 1, ${idPatient}, '${date}', ${idSpecialist}, ${idPayment}, 1, 1)`;
                         connection.query(query, (err, result) => {
                              if (err) return res.status(400).json({ success: false, message: "Erorr add booking",err });
                              return res.status(200).json({ success: true, message: "Booking success" });
                         })
                    })
               }
          }
     })
})
router.get('/getAll', (req, res) => {
     let query = `select * from booking`;

     connection.query(query, (err, result) => {
          if (err) return res.status(400).json({ success: false, message: "Erorr get all booking" });
          return res.status(200).json({ success: true, message: "Get all booking success", result });
     })
})

router.post('/getSingle', (req, res) => {
     const idBooking = req.body.idBooking;
     let query = `select * from booking where idBooking = ${idBooking}`;

     connection.query(query, (err, result) => {
          if (err) return res.status(200).json({ success: false, message: "Erorr get single booking" });
          return res.status(200).json({ success: true, message: "Get single booking success", result });
     })
})

router.delete('/delete', (req, res) => {
     const idBooking = req.body.idBooking;
     let query = `update booking set active = 0 where idBooking = ${idBooking}`;

     connection.query(query, (err, result) => {
         if(err) return res.status(400).json({success: false, message: "Erorr"})
         return res.status(200).json({success: true, message: "Delete success"})
     })
})


router.post('/getDoctorTime', (req, res) => {
     const idStaff = req.body.idStaff;
     let query = `select idTime from booking where idStaff = ${idStaff}`;

     connection.query(query, (err, result) => {
          if (err) return res.status(200).json({ success: false, message: "Erorr get time doctor" });
          return res.status(200).json({ success: true, message: "Get time doctor success", result });
     })
})

router.get('/getBookingInfo', (req, res) => {
     let query = `select booking.idBooking, examination_hours.slotTime, booking.date, patient.name as namePatient, staff.name as nameDoctor
                 from booking, examination_hours, patient, doctor_info, staff, doctor_time
                 where booking.idTime = doctor_time.idTime and booking.idPatient = patient.idPatient and
                 booking.idStaff = doctor_info.idStaff and doctor_info.idStaff = staff.idStaff
                 and doctor_time.idTime = examination_hours.idTime`
     connection.query(query, (err, result) => {

          if (err) return res.status(400).json({ success: false, message: "Erorr get booking info success" })
          return res.status(200).json({ success: true, message: "Get booking info success", result })
     })
})
router.get('/getAllExaminationSchedule', (req, res) => {
     let query = `select booking.idBooking, examination_hours.slotTime, specialists.departmentName ,booking.date,patient.email, patient.name as namePatient, staff.name as nameDoctor, status.statusName, booking.active
                 from booking, examination_hours, patient, doctor_info, status, staff, doctor_time,specialists
                 where doctor_info.idSpecialist = specialists.idSpecialist and booking.idTime = doctor_time.idTime and booking.idPatient = patient.idPatient and
                 booking.idStaff = doctor_info.idStaff and booking.idStatus = status.idStatus and doctor_info.idStaff = staff.idStaff
                 and doctor_time.idTime = examination_hours.idTime group by booking.idBooking`
     connection.query(query, (err, result) => {
           
          if (err) return res.status(400).json({ success: false, message: "Erorr get examination schedule success",err })
          return res.status(200).json({ success: true, message: "Get examination schedule success", result })
     })
})
router.get('/getAllExaminationScheduleInPatient', (req, res) => {
     const idPatient = req.query.idPatient;
     let query = `select booking.idBooking, examination_hours.slotTime, booking.date, patient.name as namePatient, staff.name as nameDoctor, status.statusName, booking.active
                 from booking, examination_hours, patient, doctor_info, status, staff, doctor_time
                 where booking.idTime = doctor_time.idTime and booking.idPatient = patient.idPatient and
                 booking.idStaff = doctor_info.idStaff and booking.idStatus = status.idStatus and doctor_info.idStaff = staff.idStaff
                 and doctor_time.idTime = examination_hours.idTime and booking.idPatient = ${idPatient} group by booking.idBooking`
     connection.query(query, (err, result) => {
           console.log(err)
          if (err) return res.status(400).json({ success: false, message: "Erorr get examination schedule success",err })
          return res.status(200).json({ success: true, message: "Get examination schedule success", result })
     })
})
router.get('/getAllTimeInDoctor', (req, res) => {
     const idStaff = req.query.idStaff
     let query = `select patient.name, examination_hours.slotTime, booking.date from booking, examination_hours, patient, doctor_time
                 where booking.idTime = doctor_time.idTime and doctor_time.idTime = examination_hours.idTime
                 and patient.idPatient = booking.idPatient and booking.idStatus = 1 and booking.active = 0 and booking.idStaff = ${idStaff} group by idBooking`;
     connection.query(query, (err, result) => {
         if (err) return res.status(400).json({ success: false, message: "Erorr get all time doctor", err })
         return res.status(200).json({ success: true, message: "Get all time doctor success", result });
     })
 })

router.get('/getAllPaymentMethod', (req, res) => {
     let query = `select * from methodpayment`
     connection.query(query, (err, result) => {
          if(err) return res.status(400).json({success: false, message: "Erorr get all payment method"})
          return res.status(200).json({success: true, message: "Get all success",result})
     })
})


module.exports = router 