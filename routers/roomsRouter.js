const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const validator = require("../validators/roomValidator");
const authMiddleware = require("../middlewares/authMiddleware");

/* CREATE ROOM  */
router.post(
  "/createRoom",
  validator.createRoomValidator,
  authMiddleware.verifyUserToken,
  roomController.createRoom
);

/* EDIT ROOM  */
router.put(
  "/editRoom/:id",
  validator.editRoomValidator,
  authMiddleware.verifyUserToken,
  roomController.editRoom
);

/* VIEW ROOMS  */
router.get(
  "/viewRooms",
  validator.viewRoomValidator,
  authMiddleware.verifyUserToken,
  roomController.viewRooms
);

/* DELETE ROOMS  */
router.delete(
  "/deleteRoom/:id",
  validator.deleteRoomValidator,
  authMiddleware.verifyUserToken,
  roomController.deleteRoom
);

module.exports = router;
