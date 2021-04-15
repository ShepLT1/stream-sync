let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/stream-sync",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose connected");
  }
);

let parties = [
  {
    name: "Party1",
    members: ["60371e08744d5e3681a40f00", "60371e08744d5e3681a40f01", "60371e08744d5e3681a40f02"],
    watched: [123480, 123481, 123482, 123483, 123484, 123485]
  }
];

db.Party.deleteMany({})
  .then(() => db.Party.collection.insertMany(parties))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });