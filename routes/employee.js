const express = require('express');
const Employee = require('../models/employee');


const router = express.Router();

// 단일 조회
router.get('/:id', async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        res.json(employee);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 상태 변경
router.patch('/:id/status', async (req, res, next) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(employee);
    } catch (error) {
        console.error(err);
        next(err);
    }
})

module.exports = router;