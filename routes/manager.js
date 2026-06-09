const express = require('express');
const Employee = require('../models/employee');
const Manager = require('../models/manager');
const Task = require('../models/task');

const router = express.Router();

// 전체조회
router.get('/employee', async (req, res, next) => {
    try {
        const employees = await Employee.find( {} );
        res.json(employees);
    } catch (error) {
        console.error(error);
        next(error);     
    }
});

// 단일조회
router.get('/employee/:id', async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if(!employee) {
            return res.status(404).json({ message: '존재하지 않는 직원입니다.' });
        }
        res.json(employee);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 업무 할당
router.post('/task', async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.body.employeeId);
        if (!employee) {
            return res.status(404).json({message: '존재하지 않는 직원입니다.'});
        }

        // 파업중 차단
        if (employee.status === '파업중') {
            return res.status(400).json({ message: '현재 파업 중인 직원입니다. 업무 할당이 불가합니다.' }); 
        }

        // 상태별 최대 업무량
        const workloadLimit = {
            '보통' : 8,
            '기분 안좋음': 6,
            '아파요': 3,
        };

        const limit = workloadLimit[employee.status];

        // 업무량 초과 경고
        if (req.body.workload > limit) {
            return res.status(400).json( { message: `현재 직원 상태에서 최대 ${limit}시간까지 할당 가능합니다.` } );
        }

        const task = await Task.create({
            employeeId: req.body.employeeId,
            workload: req.body.workload,
        });

        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        next(error);
        
    }
});

module.exports = router;