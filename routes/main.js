const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const passport = require("passport");

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
module.exports = router;
