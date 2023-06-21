const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const passport = require("passport");
const timetable = require("../database/TimeTable_Schema");
const School = require("../database/School_Schema");
const student = require("../database/Student_Schema");

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

module.exports = router;
