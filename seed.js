const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Employee = require('./models/employee');
const Manager = require('./models/manager');

const connect = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB 연결 성공');
};

const seed = async () => {
    await connect();

    // 기존 데이터 삭제
    await Employee.deleteMany({});
    await Manager.deleteMany({});

    // 직원 생성
    const hashedEmployeePassword = await bcrypt.hash('1234', 12);
    const employee = await Employee.create({
        name: '홍길동',
        password: hashedEmployeePassword,
        status: '보통',
    });

    // 관리자 생성
    const hashedManagerPassword = await bcrypt.hash('4567', 12);
    await Manager.create({
        name: '관리자',
        password: hashedManagerPassword,
        employees: [employee._id],
    });

    console.log('데이터 생성 완료');
    mongoose.disconnect();
};

seed().catch(console.error);