const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({

  userName: {
    type: String,
    required: "Username required",
  },

  email: {
    type: String,
    required: "Email required",
    unique: true
  },

  password: {
    type: String,
    required: "Password required",
  },

  partyId: {
    type: Schema.Types.ObjectId,
    ref: "Party"
  },

  topCategories: Schema.Types.Mixed,

  viewedPartyLikes: {
    type: Map,
    of: String
  },

  // have a key "matched" that contains IDs of party members that also like movie
  likedMovies: Schema.Types.Mixed,

  likedShows: Schema.Types.Mixed,

  movieQueue: Schema.Types.Mixed,

  showQueue: Schema.Types.Mixed,

  watchedTitles: {
    type: Array
  }

});

const User = mongoose.model("User", UserSchema);

module.exports = User;