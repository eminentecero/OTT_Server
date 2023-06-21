const express = require("express"); // express 임포트
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const { sequelize } = require("./models");
const passport = require("passport");
const passportConfig = require("./passport");

require("dotenv").config();

// routes
const mainRouter = require("./routes/main");
const courseRouter = require("./routes/course");
const instrucRouter = require("./routes/instructor");
const mypageRouter = require("./routes/mypage");

const app = express(); // app생성
const port = process.env.PORT;
const router = express.Router();
passportConfig();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.Student_Count = req.user ? req.user.Students.length : 0;
  res.locals.Courses_Count = req.user ? req.user.Lectures.length : 0;
  next();
});

// ==== 뷰 엔진은 ejs로 설정 ==== //
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// ==== static 경로 설정 ==== //
app.use(express.static(path.join(__dirname, "www")));
app.use(
  "/assets",
  express.static(path.join(__dirname, "bootstrap", "template", "assets"))
);
app.use(
  "/docs",
  express.static(path.join(__dirname, "bootstrap", "template", "docs"))
);
app.use(
  "/css",
  express.static(path.join(__dirname, "bootstrap", "template", "assets", "css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "bootstrap", "template", "assets", "js"))
);
app.use(
  "/images",
  express.static(
    path.join(__dirname, "bootstrap", "template", "assets", "images")
  )
);
app.use(
  "/scss",
  express.static(
    path.join(__dirname, "bootstrap", "template", "assets", "scss")
  )
);
app.use(
  "/vendor",
  express.static(
    path.join(__dirname, "bootstrap", "template", "assets", "vendor")
  )
);
app.use("/video", express.static(path.join(__dirname, "video")));

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB Connect");
  })
  .catch((err) => {
    console.error(err);
  });

// 라우터 등록
app.use("/", mainRouter);
app.use("/courses", courseRouter);
app.use("/instructor", instrucRouter);
app.use("/mypage", mypageRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});
app.listen(port, () => console.log(`PORT: ${port}`));
