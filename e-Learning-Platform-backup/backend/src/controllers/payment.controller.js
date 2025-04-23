import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import crypto from "crypto";
import { payment } from "../models/payment.model.js";
import { Teacher } from "../models/teacher.model.js";

const coursePayment = asyncHandler(async (req, res) => {
  const { fees, phonepe_order_id } = req.body;

  if (!fees || !phonepe_order_id) {
    throw new ApiError(400, "Fees and PhonePe order ID are required");
  }

  // Simulate creating an order (PhonePe typically requires an order ID from their API)
  const order = {
    order_id: phonepe_order_id,
    amount: fees,
    currency: "INR",
  };

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order created successfully"));
});

const getKey = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { key: process.env.PHONEPE_KEY }, "PhonePe key fetched"));
});

const coursePaymentConfirmation = asyncHandler(async (req, res) => {
  const { phonepe_order_id, phonepe_transaction_id, phonepe_signature } = req.body;

  const studentID = req.Student._id;
  const courseID = req.params.courseID;

  if (!phonepe_order_id || !phonepe_transaction_id || !phonepe_signature) {
    throw new ApiError(400, "All payment details are required");
  }

  // Verify the signature
  const body = phonepe_order_id + "|" + phonepe_transaction_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.PHONEPE_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === phonepe_signature;

  if (isAuthentic) {
    const orderDetails = await payment.create({
      phonepe_order_id,
      phonepe_transaction_id,
      phonepe_signature,
      courseID,
      studentID,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, { orderDetails }, "Payment confirmed"));
  } else {
    throw new ApiError(400, "Payment verification failed");
  }
});

const teacherAmount = asyncHandler(async (req, res) => {
  const teacher = req.teacher;

  const newEnrolledStudentCount = await Teacher.aggregate([
    {
      $match: { _id: teacher._id },
    },
    {
      $unwind: "$enrolledStudent",
    },
    {
      $match: { "enrolledStudent.isNewEnrolled": true },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);

  const count = newEnrolledStudentCount.length > 0 ? newEnrolledStudentCount[0].count : 0;

  await Teacher.findByIdAndUpdate(
    teacher._id,
    { $inc: { Balance: count * 500 } }
  );

  const newTeacher = await Teacher.findOneAndUpdate(
    { _id: teacher._id, "enrolledStudent.isNewEnrolled": true },
    { $set: { "enrolledStudent.$[elem].isNewEnrolled": false } },
    {
      new: true,
      arrayFilters: [{ "elem.isNewEnrolled": true }],
    }
  );

  if (!newTeacher) {
    const newTeacher = await Teacher.findById(teacher._id);

    return res
      .status(200)
      .json(new ApiResponse(200, { newTeacher }, "Balance updated"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { newTeacher }, "Balance updated"));
});

const withdrawAmount = asyncHandler(async (req, res) => {
  const teacherId = req.teacher._id;
  const amount = req.body.amount;

  const teacher = await Teacher.findById(teacherId);

  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }

  if (teacher.Balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  teacher.Balance -= amount;
  teacher.WithdrawalHistory.push({ amount });
  await teacher.save();

  const newTeacher = await Teacher.findById(teacherId);

  return res
    .status(200)
    .json(new ApiResponse(200, { newTeacher }, "Balance updated"));
});

export { coursePayment, getKey, coursePaymentConfirmation, teacherAmount, withdrawAmount };