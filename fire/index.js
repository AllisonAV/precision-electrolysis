const firebase = require('firebase')

// -- // -- // -- // Firebase Config // -- // -- // -- //
const config = {
    apiKey: "AIzaSyAQcfyXfb5wx5ZiB3JtShSyrTDhBft6mdo",
    authDomain: "precision-electrolysis.firebaseapp.com",
    databaseURL: "https://precision-electrolysis.firebaseio.com",
    projectId: "precision-electrolysis",
    storageBucket: "precision-electrolysis.appspot.com",
    messagingSenderId: "312260956394"
  }
// -- // -- // -- // -- // -- // -- // -- // -- // -- //

// Initialize the app, but make sure to do it only once.
//   (We need this for the tests. The test runner busts the require
//   cache when in watch mode; this will cause us to evaluate this
//   file multiple times. Without this protection, we would try to
//   initialize the app again, which causes Firebase to throw.
//
//   This is why global state makes a sad panda.)
firebase.__bonesApp || (firebase.__bonesApp = firebase.initializeApp(config))

module.exports = firebase
