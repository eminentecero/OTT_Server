const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const passport = require("passport");
const timetable = require("../database/TimeTable_Schema");
const student = require("../database/Student_Schema");

// 메인 페이지
// 로그인 안 되어 있을 경우 자동으로 로그인 페이지 렌더
router.get("/", isLoggedIn, async (req, res) => {
  res.render("../views/index.ejs");
});

router.get("/", isNotLoggedIn, async (req, res) => {
  res.render("../views/sign-in.ejs");
});

router.post("/login", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local-user", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(400).send(info);
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

// TODO: res: json 형식으로 보내주기
router.post("/app/login", isNotLoggedIn, async (req, res, next) => {
  try {
    const user = await student.findOne({
      where: {
        School_Code: req.body.sSchool,
        name: req.body.sName,
        class: req.body.sClass,
      },
    });
    if (user) {
      res.send(user);
    } else {
      console.log("존재하지 않습니다.");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/timetable", async (req, res) => {
  try {
    const result = await timetable.findOne({
      where: { Class: req.user.class, School_Code: req.user.School_Code },
    });
    if (result) {
      res.render("instructor-timetable.ejs", { rows: result });
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/studentList", async (req, res) => {
  res.render("instructor-studentlist.ejs", { rows: [] });
});

module.exports = router;
