const express = require("express");
const router = express.Router();
const agendaController = require("../controllers/agendaController");
const agendaValidator = require("../validators/agendaValidator");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/addAgenda",
  agendaValidator.createAgendaValidator,
  authMiddleware.verifyUserToken,
  agendaController.createAgenda
);

module.exports = router;
