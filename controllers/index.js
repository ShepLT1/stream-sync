const db = require("../models");

const movieShowSwitch = (type) => {
  switch (type) {
    case "movie":
      return "likedMovies"
    case "show":
      return "likedShows"
    default:
      return
  }
}

module.exports = {

  getUser: function (req, res) {
    db.User.find({ _id: req.body.id })
      .then((userData) => {
        userData[0].password = undefined
        res.json(userData)
      })
      .catch((err) => res.status(422).json(err));
  },

  getUsernamesEmails: function (req, res) {
    db.User.find()
      .select(['uName', 'email'])
      // send only emails/usernames to front end
      .then((userData) => {
        let usernames = {}
        let emails = {}
        userData.forEach(function (item) {
          usernames[item.uName] = true;
          emails[item.email] = true;
        })
        res.json({ usernames, emails })
      })
      .catch((err) => res.status(422).json(err));
  },

  createUser: function (req, res) {
    db.User.create(req.body)
      .then((data) => res.json(data))
      .catch((err) => res.status(422).json(err));
  },

  loginUser: function (req, res) {
    db.User.find({ _id: req.body.id })
      .then((data) => res.json(data))
      .catch((err) => res.status(422).json(err));
  },

  logoutUser: function (req, res) {
    db.User.find({ _id: req.body.id })
      .then((data) => res.json(data))
      .catch((err) => res.status(422).json(err));
  },

  // updateUserSettings: function (req, res) {
  //   // switch statement to determine which settings to update
  //   db.User.findOneAndUpdate({ _id: req.body.id }, {/*keyToUpdate*/: /*valueToUpdate*/ })
  //     .then((data) => res.json(data))
  //     .catch((err) => res.status(422).json(err));
  // },

  likeTitle: function (req, res) {
    let likedList = movieShowSwitch(req.body.type);
    db.User.find({ _id: req.body.id })
      .select([likedList])
      .then(async (data) => {
        let list = data[0][likedList]
        let titleId = req.body.titleId
        list[titleId] = {
          "title": req.body.titleName,
          "imdb": req.body.imdbRating,
          "next": null
        }
        let tailId = list.tail
        list[tailId].next = titleId
        list.tail = titleId
        // await data.save()
        res.json(data)
      })
      .catch((err) => res.status(422).json(err));
  },

  unlikeTitle: function (req, res) {
    let likedList = movieShowSwitch(req.body.type);
    db.User.find({ _id: req.body.id })
      .select([likedList])
      .then(async (data) => {
        let list = data[0][likedList]
        let titleId = req.body.titleId
        if (titleId === list.head) {
          let headId = list.head
          list.head = list[headId].next
        } else {
          let current = list.head
          while (current.next !== req.body.titleId) {
            current = list[current.next]
          }
          current.next = list[current.next].next
          if (!current.next) {
            list.tail = current.next
          }
        }
        list[titleId] = undefined;
        // await data.save()
        res.json(data)
      })
      .catch((err) => res.status(422).json(err));
  },

  watchedTitle: function (req, res) {
    db.User.find({ _id: req.body.id })
      .populate("partyId")
      // add watched title to user/party list
      .then(async (userData) => {
        const title = req.body.titleId
        db.Party.find({ _id: userData[0].partyId._id })
          .then(async (partyData) => {
            partyData[0].watched.push(title)
            // await partyData.save()
          })
        userData[0].watchedTitles.push(title)
        // await userData.save()
        res.json(userData)
      })
      .catch((err) => res.status(422).json(err));
  },

  removeWatchedTitle: function (req, res) {
    db.User.find({ _id: req.body.id })
      .populate("partyId")
      // delete watched title from user/party list
      .then(async (userData) => {
        const title = req.body.titleId
        db.Party.find({ _id: userData[0].partyId._id })
          .then(async (partyData) => {
            let partyWatched = partyData[0].watched
            let i = partyWatched.length - 1
            let found = false;
            while (!found || i !== -1) {
              if (title === partyWatched[i]) {
                found = true;
              } else {
                i--
              }
            }
            if (i === partyWatched.length - 1) {
              partyWatched.pop()
            } else if (i === 0) {
              partyWatched.shift()
            } else {
              partyWatched = partyWatched.slice(0, i).concat(partyWatched.slice(i + 1))
            }
            partyData[0].watched = partyWatched
            // await partyData.save()
          })
        let userWatched = userData[0].watched
        let j = userWatched.length - 1
        let found = false;
        while (!found || j !== -1) {
          if (title === userWatched[j]) {
            found = true;
          } else {
            j--
          }
        }
        if (j === userWatched.length - 1) {
          userWatched.pop()
        } else if (i === 0) {
          userWatched.shift()
        } else {
          userWatched = userWatched.slice(0, j).concat(userWatched.slice(j + 1))
        }
        userData[0].watched = userWatched
        // await userData.save()
        res.json(userData)
      })
      .catch((err) => res.status(422).json(err));
  },

  updateRating: function (req, res) {
    db.User.find({ _id: req.body.id })
      .populate("partyId")
      // may need to .find() for party in order to update
      // grab move/show from watchedTitles and update rating
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.status(422).json(err));
  },

  viewedPartyTitle: function (req, res) {
    db.User.find({ _id: req.body.id })
      // add title to viewedPartyLikes
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.status(422).json(err));
  },

  addToQueue: function (req, res) {
    // switch statement to determine if movie or show
    db.User.find({ _id: req.body.id })
      // add to movie/show queue
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.status(422).json(err));
  },

  removeFromQueue: function (req, res) {
    // switch statement to determine if movie or show
    db.User.find({ _id: req.body.id })
      // remove from movie/show queue
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.status(422).json(err));
  },

  getParty: function (req, res) {
    db.Party.find({ _id: req.body.id })
      .populate("members")
      .then((data) => res.json(data))
      .catch((err) => res.status(422).json(err));
  },

  deleteParty: function (req, res) {
    db.Party.findOneAndDelete({ _id: req.body.id })
      .then((data) => res.json(data))
      .catch((err) => res.status(422).json(err));
  },

  getPartyNames: function (req, res) {
    db.Party.find()
      // send only party names to front end
      .then((data) => res.json(data))
      .catch((err) => res.status(422).json(err));
  },

  createParty: function (req, res) {
    db.Party.create(req.body)
      .then((data) => res.json(data))
      .catch((err) => res.status(422).json(err));
  },

  updatePartySettings: function (req, res) {
    db.Party.find({ _id: req.body.id })
      // switch statement to determine which settings to be updated
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.status(422).json(err));
  },
};
