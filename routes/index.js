const express = require("express");
const { authMiddleWare } = require("../middleWares");
const {
  signUpController,
  loginController,
} = require("../controller/authcontroller");
const {
  createPostController,
  getPostController,
  singlePostController,
  updatePostController,
  deletePostController,
} = require("../controller/postcontroller");
const router = express.Router();

// Routes for Authentication
router.post("/api/signUp", signUpController);
router.post("/api/login", loginController);

// Routes for Posts
router.post("/api/post", [authMiddleWare], createPostController);
router.get("/api/post", [authMiddleWare], getPostController);
router.get("/api/post/:id", [authMiddleWare], singlePostController);
router.put("/api/post/:id", [authMiddleWare], updatePostController);
router.delete("/api/post/:id", authMiddleWare, deletePostController);

module.exports = router;
