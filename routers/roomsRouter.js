const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const validator = require("../validators/roomValidator");
const authMiddleware = require("../middlewares/authMiddleware");

/* CREATE ROOM  */
router.post(
  "/createRoom",
  authMiddleware.verifyUserToken,
  validator.createRoomValidator,
  roomController.createRoom
);

/* EDIT ROOM  */
router.put(
  "/editRoom/:id",
  authMiddleware.verifyUserToken,
  validator.editRoomValidator,
  roomController.editRoom
);

/* VIEW ROOMS  */
router.get(
  "/viewRooms",
  authMiddleware.verifyUserToken,
  validator.viewRoomValidator,
  roomController.viewRooms
);

/* DELETE ROOMS  */
router.delete(
  "/deleteRoom/:id",
  authMiddleware.verifyUserToken,
  validator.deleteRoomValidator,
  roomController.deleteRoom
);

module.exports = router;
