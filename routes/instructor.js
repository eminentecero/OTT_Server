const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const passport = require("passport");

const timetable = require("../database/TimeTable_Schema");

// 시간표 생성 페이지
router.get("/create-timetable", isLoggedIn, async (req, res) => {
  res.render("../views/instructor-create-timetable.ejs");
});

router.post("/create-timetable", isLoggedIn, async (req, res) => {
  try {
    const result = await timetable.create({
      School_Code: req.user.School_Code,
      Class: req.user.class,
      Mon1: req.body.Mon1,
      Mon2: req.body.Mon2,
      Mon3: req.body.Mon3,
      Mon4: req.body.Mon4,
      Mon5: req.body.Mon5,
      Mon6: req.body.Mon6,
      Tue1: req.body.Tue1,
      Tue2: req.body.Tue2,
      Tue3: req.body.Tue3,
      Tue4: req.body.Tue4,
      Tue5: req.body.Tue5,
      Tue6: req.body.Tue6,
      Wed1: req.body.Wed1,
      Wed2: req.body.Wed2,
      Wed3: req.body.Wed3,
      Wed4: req.body.Wed4,
      Wed5: req.body.Wed5,
      Wed6: req.body.Wed6,
      Thu1: req.body.Thu1,
      Thu2: req.body.Thu2,
      Thu3: req.body.Thu3,
      Thu4: req.body.Thu4,
      Thu5: req.body.Thu5,
      Thu6: req.body.Thu6,
      Fri1: req.body.Fri1,
      Fri2: req.body.Fri2,
      Fri3: req.body.Fri3,
      Fri4: req.body.Fri4,
      Fri5: req.body.Fri5,
      Fri6: req.body.Fri6,
    });

    if (result) {
      res.redirect("/timetable");
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
