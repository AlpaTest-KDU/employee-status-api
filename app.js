require('dotenv').config();

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const connect = require('./models');
const employeeRouter = require('./routes/employee');
const managerRouter = require('./routes/manager');
const authRouter = require('./routes/auth');
const authMiddleware = require('./middlewares/auth');

const app = express();
app.set('port', process.env.PORT || 40000);
app.set('view engine', 'html');
nunjucks.configure('views',{
    express: app,
    watch: false,
});
connect();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/employee', (req, res) => {
    res.render('employee');
});
app.get('/manager', (req, res) => {
    res.render('manager');
});

app.use('/employee', authMiddleware, employeeRouter);
// app.use('/manager', managerRouter);
app.use('/auth', authRouter);
app.use('/manager', authMiddleware, managerRouter);



app.use((req,res,next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err,req,res,next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
