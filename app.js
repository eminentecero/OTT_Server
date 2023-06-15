const express = require("express"); // express 임포트
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");

const app = express(); // app생성
const port = 5000;
const router = express.Router();

passportConfig();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", router);

server.listen(port, () => console.log(`${port}포트입니다.`));
