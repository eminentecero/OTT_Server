const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const passport = require("passport");
const { Op } = require("sequelize");
const timetable = require("../database/TimeTable_Schema");
const student = require("../database/Student_Schema");
const lecture = require("../database/Lecture_Schema");
const { Lecture } = require("../models");

// 앱 로그인 api
router.post("/login", isNotLoggedIn, async (req, res) => {
  try {
    const user = await student.findOne({
      where: {
        School_Code: req.body.sSchool,
        name: req.body.sName,
        class: req.body.sClass,
      },
    });
    if (user) {
      res.send(user);
    } else {
      console.log("존재하지 않습니다.");
    }
  } catch (error) {
    console.log(error);
  }
});

// 해당 주차 시간표 조회 api
router.get("/timetable/week", async (req, res) => {
  const Monday = new Date();
  // 요일 정보
  const day = Monday.getDay();

  // Monday 날짜 데이터 계산
  const setMonday = new Date(Monday.setDate(Monday.getDate() - day + 1));
  // Monday 날짜 데이터 바탕으로 Sunday 날짜 계산
  const Sunday = new Date(setMonday.setDate(setMonday.getDate() + 6));

  // 해당 날짜 사이에 존재하는 수업 조회
  // 1. 날짜별로 정렬 후, 2. 날짜 내에서 교시에 따라 정렬
  const result = await lecture.findAll({
    where: {
      T_code: req.body.T_code,
      class: req.body.class,
      date: { [Op.between]: [Monday, Sunday] },
    },
    order: [
      ["date", "asc"],
      ["time", "asc"],
    ],
  });
  const LectureList = result.map((v) => ({
    lecture: v.dataValues,
  }));

  res.json({
    classCode: req.body.class,
    rows: LectureList,
  });
});

// 해당 주차 시간표 조회 api
router.get("/timetable/today", async (req, res) => {
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  const result = await lecture.findAll({
    where: {
      T_code: req.body.T_code,
      class: req.body.class,
      date: `${year}-${month}-${day}`,
    },
    order: [["time", "asc"]],
  });
  const LectureList = result.map((v) => ({
    lecture: v.dataValues,
  }));

  res.json({
    classCode: req.body.class,
    rows: LectureList,
  });
});

module.exports = router;
