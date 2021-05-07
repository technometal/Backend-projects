const express = require("express");
const router = express.Router();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

const { getRobots, addRobot, deleteRobot, goLeft, goRight, moveForward } = require('../controller/robotsController') 

router.route("/").get(getRobots).post(addRobot).delete(deleteRobot)

router.route("/left").post(goLeft);

router.route("/right").post(goRight);

router.route("/move").post(moveForward);

// export router to app.js
module.exports = router;