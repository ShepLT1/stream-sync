const db = require("../models");

const likedMovieShowSwitch = (type) => {
  switch (type) {
    case "movie":
      return "likedMovies"
    case "show":
      return "likedShows"
    default:
      return
  }
}

const queueMovieShowSwitch = (type) => {
  switch (type) {
    case "movie":
      return "movieQueue"
    case "show":
      return "showQueue"
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

  // TODO likely get rid of like & unlike title functions, just use queues instead

  likeTitle: function (req, res) {
    const likedList = likedMovieShowSwitch(req.body.titleType);
    db.User.find({ _id: req.body.id })
      .select([likedList])
      .then(async (data) => {
        let list = data[0][likedList]
        const titleId = req.body.titleId
        list[titleId] = {
          "title": req.body.titleName,
          "imdb": req.body.imdbRating,
          "next": null
        }
        if (list.head === null) {
          list.head = titleId
        } else {
          let tailId = list.tail
          list[tailId].next = titleId
        }
        list.tail = titleId
        // await data.save()
        res.json(data)
      })
      .catch((err) => res.status(422).json(err));
  },

  unlikeTitle: function (req, res) {
    const likedList = likedMovieShowSwitch(req.body.titleType);
    db.User.find({ _id: req.body.id })
      .select([likedList])
      .then(async (data) => {
        let list = data[0][likedList]
        const titleId = req.body.titleId
        let headId = list.head
        if (titleId === list.head) {
          list.head = list[headId].next
        } else if (list[headId].next === titleId && list[headId].next === list.tail) {
          list.tail = list.head
          list[headId].next = null
        } else {
          let current = list[headId]
          let prev = null;
          while (current.next !== titleId) {
            prev = current
            current = list[current.next]
          }
          current.next = list[current.next].next
          if (current.next === null) {
            list.tail = prev.next
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
        const titleId = req.body.titleId
        db.Party.find({ _id: userData[0].partyId._id })
          .then(async (partyData) => {
            partyData[0].watched.push(titleId)
            // await partyData.save()
          })
        userData[0].watchedTitles.push(titleId)
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
        const titleId = req.body.titleId
        db.Party.find({ _id: userData[0].partyId._id })
          .then(async (partyData) => {
            let partyWatched = partyData[0].watched
            let i = partyWatched.length - 1
            let found = false;
            while (!found || i !== -1) {
              if (titleId === partyWatched[i]) {
                found = true;
              } else {
                i--
              }
            }
            if (i > -1) {
              partyData[0].watched = partWatched.splice(i, 1)
              // await partyData.save()
            } else {
              res.send("Party title not found")
            }
          })
        let userWatched = userData[0].watched
        let j = userWatched.length - 1
        let found = false;
        while (!found || j !== -1) {
          if (titleId === userWatched[j]) {
            found = true;
          } else {
            j--
          }
        }
        if (j > -1) {
          userData[0].watched = userWatched.splice(j,1)
          // await userData.save()
        } else {
          res.send("User title not found")
        }
      })
      .catch((err) => res.status(422).json(err));
  },

  // updateRating: function (req, res) {
  //   db.User.find({ _id: req.body.id })
  //     .populate("partyId")
  //     // may need to .find() for party in order to update
  //     // grab movie/show from watchedTitles and update rating
  //     .then(async (userData) => {
  //       const titleId = req.body.titleId
  //       db.Party.find({ _id: userData[0].partyId._id })
  //         .then(async (partyData) => {

  //           // await partyData.save()
  //         })
  //       // await userData.save()
  //       res.json(userData)
  //     })
  //     .catch((err) => res.status(422).json(err));
  // },

  // TODO Add db call for adding titles to viewed party titles

  // list of party likes that have already been viewed by user
  viewedPartyTitle: function (req, res) {
    db.User.find({ _id: req.body.id })
      // add title to viewedPartyLikes
      .then(async (userData) => {
        const titleId = req.body.titleId
        userData[0].viewedPartyLikes.push(titleId)
        // await userData.save()
        res.json(userData)
      })
      .catch((err) => res.status(422).json(err));
  },

  // TODO change to addToList

  addToQueue: function (req, res) {
    // switch statement to determine if movie or show
    const queueType = queueMovieShowSwitch(req.body.titleType)
    db.User.find({ _id: req.body.id })
      .select([queueType])
      .then(async (userData) => {
        let queue = userData[0][queueType]
        const titleId = req.body.titleId
        queue[titleId] = {
          "title": req.body.titleName,
          "imdb": req.body.imdbRating,
          "next": null
        }
        if (queue.head === null) {
          queue.head = titleId
        } else {
          let tailId = queue.tail
          queue[tailId].next = titleId
        }
        queue.tail = titleId
        // await userData.save()
        res.json(userData)
      })
      .catch((err) => res.status(422).json(err));
  },

  // TODO change to remove from list

  removeFromQueue: function (req, res) {
    // switch statement to determine if movie or show
    const queueType = queueMovieShowSwitch(req.body.titleType)
    db.User.find({ _id: req.body.id })
      .select([queueType])
      // remove from movie/show queue
      .then((data) => {
        let queue = data[0][queueType]
        const titleId = req.body.titleId
        let headId = queue.head
        if (titleId === queue.head) {
          queue.head = queue[headId].next
        } else if (queue[headId].next === titleId && queue[headId].next === queue.tail) {
          queue.tail = queue.head
          queue[headId].next = null
        } else {
          let current = queue[headId]
          let prev = null;
          while (current.next !== titleId) {
            prev = current
            current = queue[current.next]
          }
          current.next = queue[current.next].next
          if (!current.next) {
            queue.tail = prev.next
          }
        }
        queue[titleId] = undefined;
        // await data.save()
        res.json(data)
      })
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
