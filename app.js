const express = require("express"); // express 임포트
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const { sequelize } = require("./models");

const app = express(); // app생성
const port = process.env.PORT;
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
app.use("/", router);
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});
app.listen(port, () => console.log(`PORT: ${port}`));
