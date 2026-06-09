# 🏢 Employee Status API

직원 상태에 따른 업무량 자동 조절 시스템

## 📌 프로젝트 소개
직원이 본인의 상태를 설정하면, 관리자가 업무를 할당할 때 상태에 따라 자동으로 업무 시간이 제한되는 API 서버입니다.

## 🛠 기술 스택
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Auth**: JWT, Bcrypt
- **Frontend**: HTML, Bootstrap 5

## 👤 직원 상태별 업무 제한
| 상태 | 최대 업무 시간 |
|------|-------------|
| 보통 | 8시간 |
| 기분 안좋음 | 6시간 |
| 아파요 | 3시간 |
| 파업중 | 할당 불가 |

## 📂 프로젝트 구조
employee-status-api
├── models
│   ├── employee.js
│   ├── manager.js
│   ├── task.js
│   └── index.js
├── routes
│   ├── employee.js
│   ├── manager.js
│   └── auth.js
├── middlewares
│   └── auth.js
├── views
│   ├── login.html
│   ├── employee.html
│   └── manager.html
├── app.js
├── seed.js
└── .env

## 🔌 API 명세
### 인증
| Method | URL | 설명 |
|--------|-----|------|
| POST | /auth/employee | 직원 로그인 |
| POST | /auth/manager | 관리자 로그인 |

### 직원
| Method | URL | 설명 |
|--------|-----|------|
| GET | /employee/:id | 직원 단일 조회 |
| PATCH | /employee/:id/status | 직원 상태 변경 |

### 관리자
| Method | URL | 설명 |
|--------|-----|------|
| GET | /manager/employee | 전체 직원 조회 |
| GET | /manager/employee/:id | 직원 단일 조회 |
| POST | /manager/task | 업무 할당 |

## ⚙️ 실행 방법
```bash
# 패키지 설치
npm install

# 테스트 데이터 생성
node seed.js

# 서버 실행
nodemon app.js
```

## 🔐 환경변수 설정
PORT=40000
MONGO_URI=mongodb://localhost:27017/employee-status-api
JWT_SECRET=시크릿키
