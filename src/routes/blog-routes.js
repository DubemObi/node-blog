const express = require("express");
const BlogController = require("../controllers/blog-controller");
const authController = require("../controllers/auth-controller");

const router = express.Router();

router
  .route("/")
  .get(BlogController.getAllBlogs)
  .post(
    authController.protect,
    BlogController.uploadUserPhoto,
    BlogController.resizeUserPhoto,
    BlogController.createBlog
  );

router.get('/getMyBlogs', authController.protect, BlogController.getMyBlogs)
router
  .route("/:id")
  .get(BlogController.getBlog)
  .patch(
    authController.protect,
    BlogController.checkAuthor,
    BlogController.uploadUserPhoto,
    BlogController.resizeUserPhoto,
    BlogController.updateBlog
  )
  .delete(
    authController.protect,
    BlogController.checkAuthor,
    BlogController.deleteBlog
  );

module.exports = router;
