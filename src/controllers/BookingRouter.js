const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');
// const { checkvaluesBooking, checkvaluesTime, checkvaluesStatus } = require('./middleware/booking_middleware');
const middleware = require('./middleware/middleware_booking');

const arrMiddleware = [middleware.checkvaluesPatient, middleware.checkvaluesSpecialist,
middleware.checkvaluesStaff,  middleware.checkvaluesTime];





// router.post('/add', arrMiddleware, (req, res) => {

//      const { idTime, idStaff, idStatus, idPatient, date, idSpecialist } = req.body;

//      let queryCheck = `select idTime, idPatient from booking where idStaff = ${idStaff}`;
//      connection.query(queryCheck, (err, resultCheck) => {
//           if (err) return res.status(400).json({ success: false, message: "Erorr" });
//           var checkTime = true;
//           var checkPatient = true;
//           for (let i = 0; i < resultCheck.length; i++) {
//                if (idTime === resultCheck[i].idTime.toString()) {
//                     checkTime = false;
//                     break;
//                }
//           }          
//           for (let i = 0; i < resultCheck.length; i++) {
//                if (idPatient === resultCheck[i].idPatient.toString()) {
//                     checkPatient = false;
//                     break;
//                }
//           }

//           if (checkTime && checkPatient) {
//                let query = `insert into booking(idTime, idStaff, idStatus, idPatient, date, idSpecialist, active)
//                values(${idTime}, ${idStaff},1, ${idPatient}, '${date}', ${idSpecialist}, 1)`;
//                connection.query(query, (err, result) => {
//                     if (err) return res.status(400).json({ success: false, message: "Erorr add booking" ,err});
//                     return res.status(200).json({ success: true, message: "Add booking success" });
//                })
//           } else return res.status(200).json({ success: true, message: "Time reverved" })

//      })


// })
router.post('/add', arrMiddleware, (req, res) => {

     const { idTime, idStaff, idStatus, idPatient, date, idSpecialist } = req.body;

     let queryCheckStaff = `select idTime, idPatient from booking where idStaff = ${idStaff} and active = 1`;
     connection.query(queryCheckStaff, (err, resultCheckStaff) => {
          if (err) return res.status(400).json({ success: false, message: "Erorr" });
          var checkTimeStaff = true;
          for (let i = 0; i < resultCheckStaff.length; i++) {
               if (idTime === resultCheckStaff[i].idTime.toString()) {
                    checkTimeStaff = false;
                    break;
               }
          }
          if (checkTimeStaff) {
               let queryChekPatient = `select idTime, idStaff from booking where idPatient = ${idPatient}`;
               connection.query(queryChekPatient, (err, resultCheckPatient) => {
                    if (err) return res.status(400).json({ success: false, message: "Erorr check patient" })
                    var checkTimePatient = true;
                    for (let i = 0; i < resultCheckPatient.length; i++) {
                         if (idTime === resultCheckPatient[i].idTime.toString()) {
                              checkTimePatient = false;
                              break;
                         }
                    } 
                    if (checkTimePatient) {
                         let query = `insert into booking(idTime, idStaff, idStatus, idPatient, date, idSpecialist, active)
                         values(${idTime}, ${idStaff}, 1 , ${idPatient}, '${date}', ${idSpecialist}, 1)`;
                         connection.query(query, (err, result) => {
                              if (err) return res.status(400).json({ success: false, message: "Erorr add booking" ,err});

                              let queryUpdateDoctorTime = `update doctor_time set active = 0 where idTime = ${idTime} and idStaff = ${idStaff}` ;
                              connection.query(queryUpdateDoctorTime, (err, resultUDT) => {
                                   if (err) return res.status(400).json({ success: false, message: "Erorr update time" })
                                   return res.status(200).json({ success: true, message: "Booking success" });
                              })
                         })

                    }
               })
          } else return res.status(200).json({ success: true, message: "Time reverved" })
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
                 and patient.idPatient = booking.idPatient and booking.idStatus = 1 and booking.idStaff = ${idStaff} group by idBooking`;
     connection.query(query, (err, result) => {
         if (err) return res.status(400).json({ success: false, message: "Erorr get all time doctor", err })
         return res.status(200).json({ success: true, message: "Get all time doctor success", result });
     })
 })
module.exports = router 