"use strict";

const express = require("express");
const commentsController = require("../controllers/comments.controller");
const router = express.Router();

module.exports = function () {
  router.get("/", (req, res) => {
    commentsController.getComments(req, res);
  });
  
  router.post("/:commentId/like", (req, res) => {
    commentsController.likeComment(req, res);
  });

  router.get("/:userId", (req, res) => {
    commentsController.getCommentsForUser(req, res);
  });
  
  router.post("/", (req, res) => {
    commentsController.addComment(req, res);
  });
  

  return router;
};