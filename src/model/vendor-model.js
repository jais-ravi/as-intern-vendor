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
    ownerReview: {
      type: Array,
      default: [],
    },
    customerReview: {
      type: Array,
      default: [],
    },
    shop: {
      type: String,
    },
    verifyCodeExpiry: {
      type: Date,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      default: "vendor",
    },
    bankDetails: {
      accountNumber: { type: String, default: null },
      ifsc: { type: String, default: null },
      accountHolderName: { type: String, default: null },
    },
    razorpayContactId: {
      type: String,
      default: null,
    },
    fundAccountId: {
      type: String,
      default: null,
    },
  },
  { collection: "vendor", timestamps: true }
);

const vendorModel =
  mongoose.models.vendor || mongoose.model("vendor", vendorSchema);
export default vendorModel;
