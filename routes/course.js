const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const passport = require("passport");
const { format } = require("util");
const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");

const school = require("../database/School_Schema");
const lecture = require("../database/Lecture_Schema");
const teacher = require("../database/Teacher_Schema");

const projectId = process.env.PROJECT_ID;
const storage = new Storage({
  projectId,
});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
const multer = Multer({
  storage: Multer.memoryStorage(),
});

router.get("/create", isLoggedIn, async (req, res) => {
  res.render("../views/instructor-create-course.ejs");
});

// 수업 생성
router.post("/create", isLoggedIn, multer.single("file"), async (req, res) => {
  // 강의 영상이 없다면 400
  if (!req.file) {
    res.status(400).send("No file uploaded");
    return;
  } else {
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.on("error", async (err) => {
      console.error(err);
    });

    blobStream.on("finish", async () => {
      const publicUrl = await format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      try {
        const result = await lecture.create({
          Code: `${req.user.School_Code}${req.user.T_code}${req.body.lDate}${req.body.lecTime}`,
          class: parseInt(`${req.body.lGrade}${req.body.lClass}`),
          T_name: req.user.name,
          time: req.body.lHour,
          date: req.body.lDate,
          title: req.body.lName,
          content: req.body.lContent.replace("\r\n", "<br />"),
          video: publicUrl,
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

    blobStream.end(req.file.buffer);
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
    if (result) {
      res.render("../views/course-list.ejs", { rows: result });
    } else {
      res.render("../views/course-not-list.ejs");
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/detail/:lecture_code", isLoggedIn, async (req, res) => {
  const result = await lecture.findOne({
    where: { Code: req.params.lecture_code },
  });
  if (result) {
    res.render("../views/course-detail.ejs", { rows: result.dataValues });
  }
});

module.exports = router;
