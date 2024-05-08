const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const validator = require("../validators/roomValidator");

/* CREATE ROOM  */
router.post("/createRoom", validator.createRoomValidator, roomController.createRoom);

/* EDIT ROOM  */
router.put("/editRoom/:id", validator.editRoomValidator, roomController.editRoom);

/* VIEW ROOMS  */
router.get("/viewRooms", validator.viewRoomValidator, roomController.viewRooms);

/* DELETE ROOMS  */
router.delete("/deleteRoom/:id", validator.deleteRoomValidator, roomController.deleteRoom);



module.exports = router;
