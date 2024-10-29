const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 2,
    },
    lastName: {
      type: String,
      minLength: 2,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please use a valid email address"],
    },
    password: String,
    contactNumber: { type: Number },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    picture: String,
    verifyCode: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Array,
      default: [],
    },
    orders: {
      type: Array,
      default: [],
    },
    ownerReview: {
      type: Array,
      default: [],
    },
    customerReview: {
      type: Array,
      default: [],
    },
    shopName: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      default: "vendor",
    },
  },
  { collection: "vendor",timestamps: true,  }
  
);

const vendorModel =
  mongoose.models.vendor || mongoose.model("vendor", vendorSchema);
export default vendorModel;
