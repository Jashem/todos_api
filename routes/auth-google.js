var express = require("express");
var router = express.Router();
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var User = require("../models").User;
var keys = require("../config/key");

passport.use(
  new GoogleStrategy(keys.google, function(token, tokenSecret, profile, done) {
    User.findOne({ googleId: profile.id })
      .then(function(foundUser) {
        if (foundUser) {
          done(null, foundUser);
        } else {
          User.create({ googleId: profile.id, name: profile.displayName })
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

router.get("/", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/todos");
  }
);

module.exports = router;
