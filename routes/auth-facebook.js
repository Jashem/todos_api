var express = require("express");
var router = express.Router();
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var User = require("../models").User;
var keys = require("../config/key");

passport.use(
  new FacebookStrategy(keys.facebook, function(
    token,
    tokenSecret,
    profile,
    done
  ) {
    User.findOne({ facebookId: profile.id })
      .then(function(foundUser) {
        if (foundUser) {
          done(null, foundUser);
        } else {
          User.create({ facebookId: profile.id, name: profile.displayName })
            .then(function(newUser) {
              done(null, newUser);
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id)
    .then(function(user) {
      done(null, user);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.get("/", passport.authenticate("facebook"));

router.get(
  "/redirect",
  passport.authenticate("facebook", {
    successRedirect: "/todos",
    failureRedirect: "/"
  })
);

module.exports = router;
