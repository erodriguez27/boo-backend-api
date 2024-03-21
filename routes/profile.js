"use strict";

const express = require("express");
const userProfileController = require("../controllers/userAccount.controller");
const router = express.Router();

module.exports = function () {
  router.get("/*", (function (req, res, next) {
    userProfileController.getUser(req, res);
  }));
  
  // I'll leave this approach commented as it was my original option but the requirement was to update the previous implementation of get, so I decided to extend it on another function on my controller
  // router.get("/:userId", (req, res) => {
  //   userProfileController.findUser(req, res);
  // });

  router.post("/", (req, res) => {
    userProfileController.addUser(req, res);
  });

  return router;
};
