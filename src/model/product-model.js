const mongoose = require("mongoose");

// Review schema for product reviews
const reviewSchema = new mongoose.Schema({
  customerName: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String, minLength: 5 },
  date: { type: Date, default: Date.now },
});
const imageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String, // To store the content type
});
// Product schema definition
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      minLength: 3,
      required: [true, "Product name is required"],
    },
    productDes: {
      type: String,
      minLength: 10,
      // required: [true, "Product description is required"],
    },
    productImages: [imageSchema],
    productPrice: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0, // Ensure the price is positive
    },
    sellingPrice: {
      type: Number,
      required: [true, "Selling price is required"],
      min: 0, // Ensure selling price is positive
      validate: {
        validator: function (value) {
          return value <= this.productPrice; // Selling price cannot exceed product price
        },
        message: "Selling price cannot be greater than product price",
      },
    },
    discount: {
      type: Number,
      min: 0,
      max: 100, // Discount is in percentage, should be between 0 and 100
    },
    size: {
      type: [String], // Array of sizes (e.g., "S", "M", "L", "XL")
      default: [],
      // validate: {
      //   validator: function (value) {
      //     return value.length > 0; // Ensure at least one size is selected
      //   },
      //   message: "At least one size must be selected",
      // },
    },
    review: {
      type: [reviewSchema], // Use review schema for structured reviews
      default: [],
    },
    freeDelivery: {
      type: Boolean,
      default: true, // Default is free delivery
    },
    deliveryCharge: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return this.freeDelivery ? value === 0 : value > 0; // Delivery charge should be 0 if freeDelivery is true
        },
        message:
          "Delivery charge should be 0 when free delivery is available, or greater than 0 otherwise",
      },
    },
    category: {
      type: String,
      // required: [true, "Product category is required"],
    },
    tags: {
      type: [String], // Store tags as an array of strings
      default: [],
    },
  },
  {
    collection: "products", // Specify the collection name in MongoDB
    timestamps: true, // Automatically add `createdAt` and `updatedAt` timestamps
  }
);

// Create or retrieve the product model
const productModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = productModel;
