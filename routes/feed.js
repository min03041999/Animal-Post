const express = require("express");

const { body } = require("express-validator");

const feedController = require("../controllers/feed");

const router = express.Router();

// GET / feed / postspage
router.get("/postspage", feedController.getPostsPage);

module.exports = router;
