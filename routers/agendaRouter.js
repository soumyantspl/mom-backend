const express = require("express");
const router = express.Router();
const agendaController = require("../controllers/agendaController");
const agendaValidator = require("../validators/agendaValidator");

router.post(
  "/addAgenda",
  agendaValidator.createAgendaValidator,
  agendaController.createAgenda
);



module.exports = router;
