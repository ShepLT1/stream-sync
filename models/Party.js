const mongoose = require("mongoose");
const { Schema } = mongoose;

const PartySchema = new Schema({

  name: {
    type: String,
  },

  members: {
    type: Array,
    of: Schema.Types.ObjectId,
    ref: "User"
  },

  watched: {
    type: Array
  }

});

const Party = mongoose.model("Party", PartySchema);

module.exports = Party;