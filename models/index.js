const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('MongoDB 연결 성공');
        })
        .catch((err) => {
            console.error('MongoDB 연결 실패', err);
        });
};

mongoose.connection.on('error', (err) => {
    console.error('MongoDB 연결 에러', err);
});

mongoose.connection.on('disconnected', () => {
    console.error('MongoDB 연결 끊김, 재연결 시도');
    connect();
});

module.exports = connect;