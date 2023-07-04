const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const timetable = require("../database/TimeTable_Schema");
const School = require("../database/School_Schema");
const student = require("../database/Student_Schema");
const teacher = require("../database/Teacher_Schema");

// 시간표 조회 API
router.get("/timetable", isLoggedIn, async (req, res) => {
  try {
    const result = await timetable.findOne({
      where: { Class: req.user.class, School_Code: req.user.School_Code },
    });
    if (result) {
      console.log(result);
      res.render("instructor-timetable.ejs", { rows: result });
    }
  } catch (error) {
    console.error(error);
  }
});

// 학급 학생들 조회 API
router.get("/studentList", isLoggedIn, async (req, res) => {
  const result = await student.findAll({
    where: {
      School_Code: req.user.School_Code,
      class: req.user.class,
    },
  });
  res.render("instructor-studentlist.ejs", { rows: result });
});

// 비밀번호 초기화 페이지
router.get("/reset_password", isLoggedIn, async (req, res) => {
  res.render("reset_password.ejs");
});
router.post("/reset_password", isLoggedIn, async (req, res) => {
  console.log(req.body);
  try {
    const result = await teacher.update(
      {
        password: req.body.new_password,
      },
      {
        where: { T_code: req.user.T_code },
      }
    );
    if (result) {
      // 변경 완료하면 로그아웃하고 다시 로그인 하도록 설정
      req.logout((err) => {
        if (err) {
          return next(err);
        }
      });

      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    next;
  }
});

module.exports = router;
