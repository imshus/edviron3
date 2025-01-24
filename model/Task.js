const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    additional_data: {
      type: Object,
      default: {}
    },
    req_webhook_urls: {
      type: [String],
      default: []
    },
    custom_order_id: {
      type: String,
    },
    status: {
      type: String,
      enum: ["SUCCESS", "PENDING", "FAILED"],
    },
    transaction_amount: {
      type: Number,
      min: 0
    },
    payment_method: {
      type: String,
    },
    details: {
      type: String, 
    },
    bank_reference: {
      type: String,
      default: null
    },
    collect_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
    order_amount: {
      type: Number,
      min: 0
    },
    merchant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant", 
    },
    currency: {
      type: String,
      default: "INR"
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    merchant_name: {
      type: String,
    },
    student_id: {
      type: String,
    },
    student_name: {
      type: String
    },
    student_email: {
      type: String,
  
    },
    student_phone: {
      type: String,
    },
    receipt: {
      type: String,
      default: ""
    },
    school_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
    school_name: {
      type: String,
    }
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;

