const Sequelize = require("sequelize");
const School = require("../database/School_Schema");
const Teacher = require("../database/Teacher_Schema");
const Student = require("../database/Student_Schema");
const Lecture = require("../database/Lecture_Schema");
const TimeTable = require("../database/TimeTable_Schema");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.School = School;
db.Teacher = Teacher;
db.Student = Student;
db.Lecture = Lecture;
db.TimeTable = TimeTable;

School.init(sequelize);
Teacher.init(sequelize);
Student.init(sequelize);
Lecture.init(sequelize);
TimeTable.init(sequelize);

School.associate(db);
Teacher.associate(db);
Student.associate(db);
Lecture.associate(db);
TimeTable.associate(db);

module.exports = db;
