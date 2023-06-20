const passport = require("passport");
const localUser = require("./userLocalStrategy");
const Teacher = require("../database/Teacher_Schema");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("serializeUser");
    done(null, user.id);
  });

  passport.deserializeUser((email, done) => {
    Teacher.findOne({
      email: email,
    }).then((user) => {
      if (user) {
        done(null, user);
      }
    });
  });

  localUser();
};
