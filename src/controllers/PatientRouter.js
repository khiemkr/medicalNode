const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');
const bcrypt = require('bcrypt');




// const salt = bcrypt.genSaltSync(saltRounds); 

//Erorr 
router.post('/add', async (req, res) => {
    const {name, email, password, phoneNumber, address, date, gender} = req.body;
    // const hashPassword = await bcrypt.hashSync(password, 10);

    let query = `select email from patient where email = "${email}"`;
    connection.query(query, async (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});
        if(result.length != 0){
            return res.status(200).json({success: true, message:"Email already exist"});
        }else{
            let query1 = `insert into patient(name, email, password, phoneNumber, address, date, gender, active) 
            values('${name}', '${email}', '${password}', '${phoneNumber}', '${address}', '${date}', '${gender}' , 1)`;
                connection.query(query1, (err, result) => {
                    if(err) return res.status(401).json({success: false, message: "Erorr1",err,name});
                    return res.status(200).json({success: true, message: "Create success", name, email, password, phoneNumber, phoneNumber, date, gender})
                });
        }
    })
})
router.get('/getAll', (req, res) => {
    let query = `select * from patient`;

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});

        if(result.length > 0) return res.status(200).json({success: true, message: "Get data success", result});
        return res.status(200).json({success: true, message: "Data empty"});
    })
})

router.get('/getSingle',  (req, res) => {
    const id =  req.query.idPatient;

    let query = `select * from patient where idPatient='${id}'`;

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});

        if(result.length > 0) return res.status(200).json({success: true, message: "Get data success", result});
        return res.status(200).json({success: true, message: "Patient empty"});
    })
})

router.patch('/edit', (req, res) => {
    const {idPatient, name, email, phoneNumber, address, date, gender} = req.body;
    let query = `select * from patient where idPatient='${idPatient}' `;

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"})

        let oldName = result[0].name;
        let oldEmail = result[0].email;
        let oldAddress = result[0].address;
        let oldDate = result[0].date;
        let oldGender = result[0].gender;
        let oldPhoneNumber = result[0].phoneNumber;

        let names ,emails ,addresss ,genders,phoneNumbers,dates;


        if(name === '') {names = oldName} else {names = name}
        if(email === '') {emails = oldEmail} else {emails = email}
        if(phoneNumber === '') {phoneNumbers = oldPhoneNumber} else {phoneNumbers = phoneNumber}
        if(address === '') {addresss = oldAddress} else {addresss = address}
        if(date === '') {dates = oldDate} else {dates = date}
        if(gender === '') {genders = oldGender} else {genders = gender}

        let query1 = `update patient set name = '${names}', email = '${emails}',  phoneNumber = '${phoneNumbers}', address = '${addresss}', date = '${dates}', gender = ${genders} where idPatient='${idPatient}'`

        connection.query(query1, (err, result) => {
            if(err) return res.status(400).json({success: false, message: "Erorr1"})
            return res.status(200).json({success: true, message: "Edit success"})
        })
    
    })
})

router.delete('/delete', (req, res) => {
    const idPatient = req.body.idPatient;
    let query = `select * from patient  where idPatient='${idPatient}'`

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});

        if(result[0].active ==! 1) return res.status(200).json({success: true, message: "Patient has been deleted"})

        let query1 = `update patient set active = 0 where idPatient='${idPatient}'`
        connection.query(query1, (err, result) => {
            if(err) return res.status(400).json({success: false, message: "Erorr1"});
            return res.status(200).json({success: true, message: "Delete patient success"});
        })
    })
})




module.exports = router;