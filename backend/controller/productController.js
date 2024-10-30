const Product = require("../models/productModel");
const AppError = require("../utilis/appError");
const catchAsyncError = require("../utilis/catchAsyncError");
const APIFeatures = require("../utilis/apiFeatures");
const cloudinary = require("cloudinary");

// Create product -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    // if we get only one image
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "product",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user._id;

  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    product: newProduct,
  });
});

// Get all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const totalProducts = await Product.countDocuments();
  const resultPerPage = 8;
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeatures.query;
  res.status(200).json({
    status: "success",
    totalProducts,
    resultPerPage,
    products,
  });
});

// Get all products for admin
exports.getAllProductsForAdmin = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    totalProducts: products.length,
    products,
  });
});

// Get Single products
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError(`No product found with ${req.params.id} id`, 404));
  }
  res.status(200).json({
    status: "success",
    product,
  });
});

// Update product -- Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError(`No product found with ${req.params.id} id`, 404));
  }
  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "product",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    product: updateProduct,
  });
});

// Delete Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError(`No product found with ${req.params.id} id`, 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    status: "success",
    message: "Product has been deleted successfully",
  });
});

// Create a review or update a review if it exists
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const reviewData = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
    productId,
  };

  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError(`No Product found with ${productId} id`, 400));
  }

  const isUserReviewExist = product.reviews.find(
    (currReview) => currReview.user.toString() === req.user._id.toString()
  );
  if (isUserReviewExist) {
    isUserReviewExist.rating = rating;
    isUserReviewExist.comment = comment;
  } else {
    product.reviews.push(reviewData);
    product.numOfReviews = product.reviews.length;
  }

  let totalRating = 0;
  product.reviews.forEach((currReview) => {
    totalRating += currReview.rating;
  });
  product.ratings = totalRating / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    review: "Review has been updated",
  });
});

// Get All reviews of a single product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(
      new AppError(`No Product found with ${req.query.productId} id`, 400)
    );
  }

  res.status(200).json({
    status: "success",
    result: product.reviews.length,
    reviews: product.reviews,
  });
});

// delete a review
exports.deleteProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(
      new AppError(`No Product found with ${req.query.productId} id`, 400)
    );
  }

  const reviews = product.reviews.filter(
    (currReview) => currReview._id.toString() !== req.query.id.toString()
  );

  let averageRating = 0;
  if (reviews.length === 0) {
    averageRating = 0;
  } else {
    let totalRating = 0;
    reviews.forEach((currReview) => {
      totalRating += currReview.rating;
    });
    averageRating = totalRating / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings: averageRating,
  });

  res.status(200).json({
    status: "success",
    message: "Review has been deleted successfully",
  });
});
