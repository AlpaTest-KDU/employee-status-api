const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
const Manager = require('../models/manager');

const router = express.Router();

// 직원로그인
router.post('/employee', async (req, res, next) => {
    try {
        const employee = await Employee.findOne({ name: req.body.name });
        const isMatch = employee && await bcrypt.compare(req.body.password, employee.password);

        if (!employee || !isMatch) {
            return res.status(401).json({ message: '이름 또는 비밀번호가 틀렸습니다.' });
        }

        const token = jwt.sign(
            { id: employee._id, name: employee.name, role: 'employee' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 관리자 로그인
router.post('/manager', async (req, res, next) => {
    try {
        const manager = await Manager.findOne({ name: req.body.name });
        const isMatch = manager && await bcrypt.compare(req.body.password, manager.password);

        if (!manager || !isMatch) {
            return res.status(401).json({ message: '이름 또는 비밀번호가 틀렸습니다.' });
        }
        const token = jwt.sign(
            { id: manager._id, name: manager.name, role: 'manager' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;