const router = require("express").Router();
const controller = require("../../controllers");

router.get("/", (req, res) => {
  controller.getUser(req, res);
});

router.get("/register", (req, res) => {
  controller.getUsernamesEmails(req, res);
});

router.post("/register", (req, res) => {
  controller.createUser(req, res);
});

router.post("/login", (req, res) => {
  controller.loginUser(req, res);
});

router.post("/logout", (req, res) => {
  controller.logoutUser(req, res);
});

router.put("/settings", (req, res) => {
  controller.updateUserSettings(req, res);
});

router.post("/like", (req, res) => {
  controller.likeTitle(req, res);
});

router.put("/like", (req, res) => {
  controller.unlikeTitle(req, res);
});

router.post("/watched", (req, res) => {
  controller.watchedTitle(req, res);
});

router.delete("/watched", (req, res) => {
  controller.removeWatchedTitle(req, res);
});

// router.put("/rating", (req, res) => {
//   controller.updateRating(req, res);
// });

router.post("/viewed", (req, res) => {
  controller.viewedPartyTitle(req, res);
});

router.post("/queue", (req, res) => {
  controller.addToQueue(req, res);
});

router.put("/queue", (req, res) => {
  controller.removeFromQueue(req, res);
});

module.exports = router;