const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");

const Post = require("../models/post");

exports.getPosts = async (req, res, next) => {
  // Query follow title
  try {
    const { title } = req.query;
    // const query = { title: title };
    const query = { title: new RegExp(title) };
    // console.log(query);
    const posts = await Post.find(query);
    res
      .status(200)
      .json({ message: "Fetched posts successfully.", posts: posts });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  // Post.find()
  //   .then((posts) => {
  //     res
  //       .status(200)
  //       .json({ message: "Fetched posts successfully.", posts: posts });
  //   })
  //   .catch((err) => {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     next(err);
  //   });
};

exports.getPostsPage = async (req, res, next) => {
  //Show by page
  const currentPage = req.query.page || 1;
  const perPage = 6;
  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "Fetched posts successfully.",
      posts: posts,
      totalItems: totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  // let totalItems;
  // Post.find()
  //   .countDocuments()
  //   .then((count) => {
  //     totalItems = count;
  //     return Post.find()
  //       .skip((currentPage - 1) * perPage)
  //       .limit(perPage);
  //   })
  //   .then((posts) => {
  //     res.status(200).json({
  //       message: "Fetched posts successfully.",
  //       posts: posts,
  //       totalItems: totalItems,
  //     });
  //   })
  //   .catch((err) => {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     next(err);
  //   });
};
