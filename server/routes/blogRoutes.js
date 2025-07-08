const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const auth = require("../middleware/auth");

// Public
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Protected
router.post("/", auth, createBlog);
router.get("/user/me", auth, getMyBlogs);
router.put("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);

module.exports = router;
