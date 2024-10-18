const express = require("express");

const router = express.Router();

// product controller file
const productController = require("../controller/productController");
const { authUser, authUserRole } = require("../middleware/auth");

// reviews
router.route("/reviews").patch(authUser, productController.createProductReview);
// reviews?productId=84hfy6t4rgry4664
router
  .route("/reviews")
  .get(productController.getProductReviews)
  .delete(authUser, productController.deleteProductReview);

router
  .route("/")
  .post(authUser, authUserRole("admin"), productController.createProduct)
  .get(productController.getAllProducts);

router.get(
  "/admin/products",
  authUser,
  authUserRole("admin"),
  productController.getAllProductsForAdmin
);

router
  .route("/:id")
  .get(productController.getSingleProduct)
  .patch(authUser, authUserRole("admin"), productController.updateProduct)
  .delete(authUser, authUserRole("admin"), productController.deleteProduct);

module.exports = router;
