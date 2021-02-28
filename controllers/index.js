const db = require("../models");

module.exports = {

  getUser: function (req, res) {
    db.User.find({ _id: req.id })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  getUsernamesEmails: function (req, res) {
    db.User.find()
      // send only emails/usernames to front end
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  createUser: function (req, res) {
    db.User.create(req)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  loginUser: function (req, res) {
    db.User.find({ _id: req.id })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  logoutUser: function (req, res) {
    db.User.find({ _id: req.id })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  updateUserSettings: function (req, res) {
    // switch statement to determine which settings to update
    db.User.findOneAndUpdate({ _id: req.id }, {/*keyToUpdate*/: /*valueToUpdate*/ })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  likeTitle: function (req, res) {
    // switch statement to determine if show or movie
    db.User.find({ _id: req.id })
      // add to likedMovies/Shows
      .save()
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  unlikeTitle: function (req, res) {
    // switch statement to determine if show or movie
    db.User.find({ _id: req.id })
      // remove from likedMovies/Shows
      .save()
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  watchedTitle: function (req, res) {
    db.User.find({ _id: req.id })
      .populate("partyId")
      // may need to .find() for party in order to update
      // add watched title to user/party list
      .save()
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  removeWatchedTitle: function (req, res) {
    db.User.find({ _id: req.id })
      .populate("partyId")
      // may need to .find() for party in order to update
      // delete watched title from user/party list
      .save()
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  updateRating: function (req, res) {
    db.User.find({ _id: req.id })
      .populate("partyId")
      // may need to .find() for party in order to update
      // grab move/show from watchedTitles and update rating
      .save()
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  viewedPartyTitle: function (req, res) {
    db.User.find({ _id: req.id })
      // add title to viewedPartyLikes
      .save()
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  addToQueue: function (req, res) {
    // switch statement to determine if movie or show
    db.User.find({ _id: req.id })
      // add to movie/show queue
      .save()
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  removeFromQueue: function (req, res) {
    // switch statement to determine if movie or show
    db.User.find({ _id: req.id })
      // remove from movie/show queue
      .save()
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  getParty: function (req, res) {
    db.Party.find({ _id: req.id })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  deleteParty: function (req, res) {
    db.Party.findOneAndDelete({ _id: req.id })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  getPartyNames: function (req, res) {
    db.Party.find()
      // send only party names to front end
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  createParty: function (req, res) {
    db.Party.create(req)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  updatePartySettings: function (req, res) {
    db.Party.find({ _id: req.id })
      // switch statement to determine which settings to be updated
      .save()
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
