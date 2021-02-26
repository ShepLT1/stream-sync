import axios from "axios";

export default {
  // Logs in User
  loginUser: function (userData) {
    return axios({
      method: "post",
      data: userData,
      withCredentials: true,
      url: "/api/user/login",
    });
  },
  // retrieves usernames and emails to check for uniqueness upon registration
  getAllUsernameEmail: function () {
    return axios({
      method: "get",
      url: "/api/user/register",
    });
  },
  // register new user
  registerUser: function (userData) {
    return axios({
      method: "post",
      data: userData,
      withCredentials: true,
      url: "/api/user/register",
    });
  },
  // logout user
  logoutUser: function (userData) {
    return axios({
      method: "post",
      data: userData,
      withCredentials: true,
      url: "/api/user/logout",
    });
  },
  // gets all user data for main user dashboard
  getUserData: function (userData) {
    return axios({
      method: "get",
      data: userData,
      withCredentials: true,
      url: "/api/user",
    });
  },
  // gets all party data for main user dashboard
  getPartyData: function (partyData) {
    return axios({
      method: "get",
      data: partyData,
      withCredentials: true,
      url: "/api/party",
    });
  },
  // gets all party names to check for uniqueness upon registration
  getAllPartyNames: function () {
    return axios({
      method: "get",
      url: "/api/party/register",
    });
  },
  // create party
  registerParty: function (partyData) {
    return axios({
      method: "post",
      data: partyData,
      withCredentials: true,
      url: "/api/party/register",
    });
  },
  // Updates user settings
  updateUserSettings: function (userData) {
    return axios({
      method: "put",
      data: userData,
      url: "/api/user/settings",
    });
  },
  // updates party settings
  updatePartySettings: function (partyData) {
    return axios({
      method: "put",
      data: partyData,
      url: "/api/party/settings",
    });
  },
  // add liked title to user doc
  likeTitle: function (userData) {
    return axios({
      method: "post",
      data: userData,
      url: "/api/user/like"
    })
  },
  // remove liked title from user doc
  unlikeTitle: function (userData) {
    return axios({
      method: "put",
      data: userData,
      url: "/api/user/like"
    })
  },
  // add watched title to user and party doc
  watchedTitle: function (userData) {
    return axios({
      method: "post",
      data: userData,
      url: "/api/user/watched"
    })
  },
  // remove watched title from user and party doc
  removeWatchedTitle: function (userData) {
    return axios({
      method: "delete",
      data: userData,
      url: "/api/user/watched"
    })
  },
  // update a watched title's rating
  updateRating: function (userData) {
    return axios({
      method: "put",
      data: userData,
      url: "/api/user/rating"
    })
  },
  // log a party memeber's liked title as already viewed
  viewedPartyTitles: function (userData) {
    return axios({
      method: "post",
      data: userData,
      url: "/api/user/viewed"
    })
  },
  // add title to movie or show queue
  addToQueue: function (userData) {
    return axios({
      method: "post",
      data: userData,
      url: "/api/user/queue"
    })
  },
  // remove title from movie or show queue
  removeFromQueue: function (userData) {
    return axios({
      method: "put",
      data: userData,
      url: "/api/user/queue"
    })
  },
  // delete party
  deleteParty: function (userData) {
    return axios({
      method: "delete",
      data: userData,
      url: "/api/party"
    })
  },
};
