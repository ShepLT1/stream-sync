const router = require("express").Router();
const controller = require("../../controllers");

router.get("/", (req, res) => {
  controller.getParty(req, res);
});

router.delete("/", (req, res) => {
  controller.deleteParty(req, res);
});

router.get("/register", (req, res) => {
  controller.getPartyNames(req, res);
});

router.post("/register", (req, res) => {
  controller.createParty(req, res);
});

router.put("/settings", (req, res) => {
  controller.updatePartySettings(req, res);
});

module.exports = router;