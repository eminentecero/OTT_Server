const passport = require("passport");
const localUser = require("./userLocalStrategy");
const Teacher = require("../database/Teacher_Schema");
const Student = require("../database/Student_Schema");
const Lecture = require("../database/Lecture_Schema");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser((email, done) => {
    Teacher.findOne({
      where: { email },
      include: [
        {
          model: Student,
          attributes: ["T_Code"],
        },
        {
          model: Lecture,
          attributes: ["T_Code"],
        },
      ],
    }).then((user) => {
      if (user) {
        done(null, user);
      }
    });
  });

  localUser();
};
