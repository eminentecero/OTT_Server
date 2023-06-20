const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const passport = require("passport");

const school = require("../database/School_Schema");
const lecture = require("../database/Lecture_Schema");
const teacher = require("../database/Teacher_Schema");

router.get("/create", isLoggedIn, async (req, res) => {
  console.log(req.user);
  res.render("../views/instructor-create-course.ejs");
});

router.post("/create", isLoggedIn, async (req, res) => {
  try {
    const result = await lecture.create({
      Code: `${req.user.School_Code}${req.user.T_code}${req.body.lDate}${req.body.lecTime}`,
      class: parseInt(`${req.body.lGrade}${req.body.lClass}`),
      T_name: req.user.name,
      time: req.body.lHour,
      date: req.body.lDate,
      title: req.body.lName,
      content: req.body.lContent.replace("\r\n", "<br />"),
      video: `${req.user.School_Code}${req.user.T_code}${req.body.lDate}${req.body.lecTime}`,
      subject: req.body.lSubject,
      T_code: req.user.T_code,
    });

    if (result) {
      res.redirect("/courses/list");
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/list", isLoggedIn, async (req, res) => {
  try {
    const result = await lecture.findAll({
      include: {
        model: teacher,
        where: {
          T_code: req.user.T_code,
        },
      },
    });
    console.log(result);
    if (result) {
      res.render("../views/course-list.ejs", { rowsBefore: result });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
