const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const Blog = require("../models/blog-model");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError")

const multerStorage = multer.diskStorage({});

const upload = multer({ storage: multerStorage });

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const result = await cloudinary.uploader.upload(req.file.path, {
    width: 500,
    height: 500,
    crop: "fill",
  });

  req.body.photo = result.url;
  req.body.cloudinary_id = result.public_id;
  
  next();
});

exports.createBlog = catchAsync(async (req, res, next)=>{
  const {title, article, photo, cloudinary_id }= req.body

  const doc = await Blog.create({
    title,
    article,
    author: req.user.id,
    photo,
    cloudinary_id
  });

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
})

exports.checkAuthor = catchAsync( async (req, res, next)=> {
  const blogId = req.params.id
  const blog = await Blog.findById(blogId)
  if (!blog || req.user.id !== blog.author.toString() ){
    return next(new AppError("You have no document with that ID", 404));

  }
  next()
})

exports.getMyBlogs = catchAsync(async (req, res, next) => {
  const doc = await Blog.find({author: req.user.id});

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

// exports.createBlog = factory.createOne(Blog);
exports.getBlog = factory.getOne(Blog);
exports.getAllBlogs = factory.getAll(Blog);

exports.updateBlog = factory.updateOne(Blog); 
exports.deleteBlog = factory.deleteOne(Blog);
