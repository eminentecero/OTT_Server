const passport = require("passport");
const localUser = require("./userLocalStrategy");
const Teacher = require("../database/Teacher_Schema");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("serializeUser");
    done(null, user.email);
  });

  passport.deserializeUser((email, done) => {
    Teacher.findOne({
      where: { email },
    }).then((user) => {
      if (user) {
        done(null, user);
      }
    });
  });

  localUser();
};
