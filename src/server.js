const nodemailer = require('nodemailer')
const express = require('express')
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
const staffRouter = require('./controllers/StaffRouter')
const loginRouter = require('./controllers/LoginRouter')
const patientRouter = require('./controllers/PatientRouter')
const roleRouter = require('./controllers/RoleRouter')
const specialistRouter = require('./controllers/SpecialistRouter')
const doctorinfoRouter = require('./controllers/DoctorInfoRouter');
const examinationHoursRouter = require('./controllers/ExaminationHourRouter');
const statusRouter = require('./controllers/StatusRouter');
const doctorTimeRouter = require('./controllers/DoctorTimeRouter')
const BookingRouter = require('./controllers/BookingRouter')
const HistoryRouter = require('./controllers/HistoryRouter')
const EmailRouter = require('./controllers/EmailRouter.js')



import cors from 'cors' 
// import cors from 'cors';
let app = express();
app.use(cors({origin:true}))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })) // use req.body
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended: true}))
viewEngine(app);

require('dotenv').config();

app.use('/api/login', loginRouter)
app.use('/api/staff', staffRouter)
app.use('/api/patient', patientRouter)
app.use('/api/role', roleRouter)
app.use('/api/specialist', specialistRouter)
app.use('/api/doctorinfo', doctorinfoRouter)
app.use('/api/examinationhours', examinationHoursRouter)
app.use('/api/status', statusRouter)
app.use('/api/doctorTime', doctorTimeRouter)
app.use('/api/booking', BookingRouter)
app.use('/api/history',HistoryRouter)
app.use('/api/email', EmailRouter)

let port = process.env.PORT || 6969;
// Port === undefined => port = 6969
app.listen(port, () => {
    console.log("Backend Nodejs is runing on the port: " + port);
})