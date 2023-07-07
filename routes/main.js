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

router.get("/logout", isLoggedIn, async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.redirect("/");
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

module.exports = router;
