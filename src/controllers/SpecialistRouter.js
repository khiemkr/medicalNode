const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');

 // them chuyen khoa moi
router.post('/add', (req, res) => {
    const { departmentName, price, image, description } = req.body;
    let query = `select departmentName from specialists where departmentName = "${departmentName}"`;
    connection.query(query, async (err, result) => {
        if (err) return res.status(400).json({ success: false, message: "Erorr", result,err});
        if (result.length != 0) {
            return res.status(200).json({ success: true, message: "Specialist already exist" });
        } else {
            let query1 = `insert into specialists(departmentName, price, image, description, active) values('${departmentName}', ${price},'${image}', '${description}', 1)`;
            connection.query(query1, (err, result) => {
                if (err) return res.status(401).json({ success: false, message: "Erorr1",err });
                return res.status(200).json({ success: true, message: "Create success", departmentName, price, image, description })
            }); 
        }
    })
})
 
// sua chuyen khoa
router.patch('/edit', (req, res) => {
    const { idSpecialist, departmentName, price, image, description } = req.body;
    let query = `select * from specialist where idSpecialist = "${idSpecialist}" `;

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"})

        let oldDepartmentName = result[0].departmentName;
        let oldPrice = result[0].price;
        let oldImage = result[0].image;
        let olddescription = result[0].description;
        

        let departmentNames ,prices ,images ,descriptions;


        if(departmentName === '') {departmentNames = oldDepartmentName} else {departmentNames = departmentName}
        if(price === '') {prices = oldPrice} else {prices = price}
        if(image === '') {images = oldImage} else {images = image}
        if(description === '') {descriptions = olddescription} else {descriptions = description}

        let query1 = `update specialist set departmentName = '${departmentNames}', price = '${prices}',  image = '${images}', description = '${descriptions}' where idSpecialist='${idSpecialist}'`

        connection.query(query1, (err, result) => {
            if(err) return res.status(400).json({success: false, message: "Erorr1"})
            return res.status(200).json({success: true, message: "Edit success"})
        })
    
    })
})

router.delete('/delete', (req, res) => {
    const idSpecialist = req.body.idSpecialist;
    let query = `select * from specialist where idSpecialist = '${idSpecialist}'`;
    
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});
        
        let query1 = `update specialist set  active = 0 where idSpecialist='${idSpecialist}'`;
      
        connection.query(query1, (err, result) => {
            if(err) return res.status(400).json({success: false, message: "Erorr1"});
            return res.status(200).json({success: true, message: "Delete specialist success"});
        })
    })
}) 


router.get('/getAll', (req, res) => {
    let query = `select * from specialists`;
    connection.query(query, (err, result) => {
        if (err) return res.status(400).json({ success: false, message: "Erorr",err })
        if(result.length <= 0) return res.status(200).json({success: true, message: "Specialist empty"})
        return res.status(200).json({ success: true, message: "Get success", result })
    })
})

router.get('/getSingle', (req, res) => {
    const idSpecialist = req.query.idSpecialist;
    let query = `select * from specialists where idSpecialist = '${idSpecialist}'`
    connection.query(query, (err, result) => {
        if (err) return res.status(400).json({ success: false, message: "Erorr",err })
        if(result.length <= 0) return res.status(200).json({success: true, message: "Specialist empty"})
        return res.status(200).json({ success: true, message: "Get success", result})
    })
})



module.exports = router;