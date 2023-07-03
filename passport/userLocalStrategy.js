const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Teacher = require("../database/Teacher_Schema");

module.exports = () => {
  passport.use(
    "local-user",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await Teacher.findOne({
            where: { email },
          });
          if (user) {
            if (user.password === password) {
              done(null, user);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "존재하지 않는 정보입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
