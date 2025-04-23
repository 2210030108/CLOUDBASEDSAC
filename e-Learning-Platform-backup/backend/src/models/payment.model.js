import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  phonepe_transaction_id: {
    type: String,
    required: true,
  },
  phonepe_order_id: {
    type: String,
    required: true,
  },
  phonepe_signature: {
    type: String,
    required: true,
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
});

export const payment = mongoose.model("payment", paymentSchema);