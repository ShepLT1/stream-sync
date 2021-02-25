const router = require("express").Router();
const userRoutes = require("./user");
const partyRoutes = require("./party");

router.use("/user", userRoutes);

router.use("/party", partyRoutes);

module.exports = router;
