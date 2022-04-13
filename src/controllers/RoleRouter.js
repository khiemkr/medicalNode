const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');


router.post('/add', async (req, res) => {
    const name = req.body.roleName;

    let query = `insert into role(roleName, active) values('${name}', 1)`;
    connection.query(query, (err, result) => {

        if (err) return res.status(400).json({ success: false, message: "Erorr" });
        return res.status(200).json({ success: true, message: "Create success"})
    })
})

router.get('/getAll', (req, res) => {
    let query = `select * from role`;
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"})
        return res.status(200).json({success: true, message: "Get success", result});
    })
})

router.patch('/edit', (req, res) => {
    const idRole = req.body.idRole;
    const roleName = req.body.roleName;
    let query = `select * from role where idRole='${idRole}' `;

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"})

        let oldRoleName = result[0].roleName;
        

        let roleNames;


        if(roleName === '') {roleNames = oldRoleName} else {roleNames = roleName}
        

        let query1 = `update role set roleName = '${roleNames}' where idRole='${idRole}'`

        connection.query(query1, (err, result) => {
            if(err) return res.status(400).json({success: false, message: "Erorr1"})
            return res.status(200).json({success: true, message: "Edit success"})
        })
    
    })
})

router.delete('/delete', (req, res) => {
    const idRole = req.body.idRole;
    let query = `select * from role  where idRole='${idRole}'`

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});

        if(result[0].active ==! 1) return res.status(200).json({success: true, message: "Has been deleted"})

        let query1 = `update role set active = 0 where idRole='${idRole}'`
        connection.query(query1, (err, result) => {
            if(err) return res.status(400).json({success: false, message: "Erorr1"});
            return res.status(200).json({success: true, message: "Delete success"});
        })
    })
})

module.exports = router;