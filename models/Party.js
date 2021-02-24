const mongoose = require("mongoose");
const { Schema } = mongoose;

const PartySchema = new Schema({

  name: {
    type: String,
  },

  members: {
    type: Array
  },

  recentlyWatched: Schema.Types.Mixed

});

const Party = mongoose.model("Party", PartySchema);

module.exports = Party;