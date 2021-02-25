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

let users = [
  {
    username: "User1",
    email: "user1@gmail.com",
    password: "User1234",
    partyId: ObjectId("6037246741a40939fbfcb93d"),
    topCategories: {
      1: "drama",
      2: "comedy",
      3: "thriller"
    },
    viewedPartyLikes: {
      123456: "User2",
      123457: "User3",
      123458: "User2",
      123459: "User2",
      123577: "User3"
    },
    likedMovies: {
      head: 123460,
      tail: 123463,
      123460: {
        title: "Batman",
        imdb: 9,
        next: 123461
      },
      123465: {
        title: "The Notebook",
        imdb: 5,
        next: 123463
      },
      123461: {
        title: "Tenet",
        imdb: 10,
        next: 123465
      },
      123463: {
        title: "Wonder Woman 1984",
        imdb: 1,
        next: null
      }
    },
    likedShows: {
      head: 123469,
      tail: 123472,
      123469: {
        title: "Rick and Morty",
        imdb: 9,
        next: 123470
      },
      123474: {
        title: "Pretty Little Liars",
        imdb: 5,
        next: 123472
      },
      123470: {
        title: "The Office",
        imdb: 10,
        next: 123474
      },
      123472: {
        title: "The Guild",
        imdb: 1,
        next: null
      }
    },
    movieQueue: {
      head: 123460,
      tail: 123465,
      123460: {
        title: "Batman",
        imdb: 9,
        next: 123461
      },
      123465: {
        title: "The Notebook",
        imdb: 5,
        next: null
      },
      123461: {
        title: "Tenet",
        imdb: 10,
        next: 123465
      }
    },
    showQueue: {
      head: 123469,
      tail: 123474,
      123469: {
        title: "Rick and Morty",
        imdb: 9,
        next: 123470
      },
      123474: {
        title: "Pretty Little Liars",
        imdb: 5,
        next: null
      },
      123470: {
        title: "The Office",
        imdb: 10,
        next: 123474
      }
    },
    watchedTitles: [
      123480, 123481, 123482
    ]
  },
  {
    username: "User2",
    email: "user2@gmail.com",
    password: "User1234",
    partyId: ObjectId("6037246741a40939fbfcb93d"),
    topCategories: {
      1: "mystery",
      2: "suspense",
      3: "romantic"
    },
    viewedPartyLikes: {
      123460: "User1"
    },
    likedMovies: {
      head: 123456,
      tail: 123459,
      123456: {
        title: "Iron Man",
        imdb: 7,
        next: 123458
      },
      123458: {
        title: "The Prestige",
        imdb: 9,
        next: 123459
      },
      123459: {
        title: "Up",
        imdb: 8,
        next: null
      }
    },
    likedShows: {
      head: null,
      tail: null
    },
    movieQueue: {
      head: 123456,
      tail: 123459,
      123456: {
        title: "Iron Man",
        imdb: 7,
        next: 123458
      },
      123458: {
        title: "The Prestige",
        imdb: 9,
        next: 123459
      },
      123459: {
        title: "Up",
        imdb: 8,
        next: null
      }
    },
    showQueue: {
      head: null,
      tail: null
    },
    watchedTitles: [
      123483, 123484, 123485
    ]
  },
  {
    username: "User3",
    email: "user3@gmail.com",
    password: "User1234",
    partyId: ObjectId("6037246741a40939fbfcb93d"),
    topCategories: {
      1: "sports",
      2: "documentary",
      3: "comedy"
    },
    viewedPartyLikes: {},
    likedMovies: {
      head: 123457,
      tail: 123457,
      123457: {
        title: "Batman",
        imdb: 9,
        next: null
      }
    },
    likedShows: {
      head: 123577,
      tail: 123578,
      123577: {
        title: "Friday Night Lights",
        imdb: 9,
        next: 123578
      },
      123578: {
        title: "Documentary Now",
        imdb: 6,
        next: null
      }
    },
    movieQueue: {
      head: null,
      tail: null
    },
    showQueue: {
      head: null,
      tail: null
    },
    watchedTitles: []
  }
];

db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(users))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
