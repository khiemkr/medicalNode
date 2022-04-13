const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');


router.post('/add', async (req, res) => {
    const statusName = req.body.statusName;

    let query = `insert into status(statusName, active) values('${statusName}', 1)`;
    connection.query(query, (err, result) => {

        if (err) return res.status(400).json({ success: false, message: "Erorr" });
        return res.status(200).json({ success: true, message: "Create success" })
    })
})


router.patch('/edit', (req, res) => {
    const { idStatus, statusName } = req.body;

    let query = `select * from status where idStatus='${idStatus}'`;

    connection.query(query, (err, result) => {
        if (err) return res.status(400).json({ success: false, message: "Erorr" })
        if(result[0].active==0) return res.status(200).json({success: true, message: "Null"});

        let oldStatusName = result[0].statusName;
        let statusNames;

        if (statusName === '') { statusNames = oldStatusName } else { statusNames = statusName }

        let query1 = `update status set statusName = '${statusNames}' where idStatus=${idStatus} and active = 1`

        connection.query(query1, (err, result) => {
            if (err) return res.status(400).json({ success: false, message: "Erorr1" })
            return res.status(200).json({ success: true, message: "Edit success" })
        })

    })
})

router.delete('/delete', (req, res) => {
    const idStatus = req.body.idStatus;

    let query = `update status set active = 0 where idStatus='${idStatus}'`
    connection.query(query, (err, result) => {
        if (err) return res.status(400).json({ success: false, message: "Erorr1" });
        return res.status(200).json({ success: true, message: "Delete success" });
    })
})


router.get('/getAll', (req, res) => {
    let query = `select idStatus, statusName from status`;
    connection.query(query, (err, result) => {
        if (err) return res.status(400).json({ success: false, message: "Erorr" })
        return res.status(200).json({ success: true, message: "Get success", result });
    })
})

module.exports = router;