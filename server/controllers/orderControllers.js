const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const RazorPay = require("razorpay");

// Import Utils
const { updateInventoryQuantity } = require("../utils/inventoryUtils");

// Import Schemas
const Order = require("../schemas/orderSchema");
const Pizza = require("../schemas/pizzaSchema");
const User = require("../schemas/userSchema");
const sendEmail = require("../middlewares/nodemailerMiddleware");


// ==============================
// Create Razorpay Order
// ==============================

const createRazorpayOrder = asyncHandler(async (req, res) => {
  try {
    const { amount } = req.body;

    const instance = new RazorPay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount,
      currency: "INR",
      receipt: new mongoose.Types.ObjectId().toString(),
      payment_capture: 1,
    };

    const order = await instance.orders.create(options);

    if (!order) {
      res.status(500);
      throw new Error("Order Creation Failed!");
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error(error.message);
  }
});


// ==============================
// Create Order
// ==============================

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    deliveryAddress,
    salesTax,
    deliveryCharges,
    totalPrice,
    payment,
  } = req.body;

  // Validations
  if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  }

  if (
    !deliveryAddress ||
    !deliveryAddress.phoneNumber ||
    !deliveryAddress.address ||
    !deliveryAddress.city ||
    !deliveryAddress.postalCode ||
    !deliveryAddress.country
  ) {
    res.status(400);
    throw new Error("No Delivery Address");
  }

  if (isNaN(totalPrice) || totalPrice <= 0) {
    res.status(400);
    throw new Error("Invalid Total Price");
  }

  if (deliveryCharges < 0) {
    res.status(400);
    throw new Error("Invalid Delivery Charges");
  }

  if (salesTax < 0) {
    res.status(400);
    throw new Error("Invalid Sales Tax");
  }

  if (!payment || !["stripe", "razorpay"].includes(payment.method)) {
    res.status(400);
    throw new Error("Invalid Payment Method");
  }

  if (payment.method === "stripe" && !payment.stripePaymentIntentId) {
    res.status(400);
    throw new Error("Invalid Stripe Payment Intent Id");
  }

  if (payment.method === "razorpay" && !payment.razorpayOrderId) {
    res.status(400);
    throw new Error("Invalid Razorpay Order Id");
  }

  // Deduct Inventory
  for (const orderItem of orderItems) {
    const pizza = await Pizza.findById(orderItem.pizza || orderItem._id);
    if (!pizza) {
      res.status(404);
      throw new Error("Pizza Not Found");
    }

    await updateInventoryQuantity(pizza, orderItem.qty);
  }

  // Prepare items for email
  const orderItemsWithNames = [];

  for (const orderItem of orderItems) {
    const pizza = await Pizza.findById(orderItem.pizza || orderItem._id);
    if (!pizza) {
      res.status(404);
      throw new Error("Pizza Not Found");
    }

    orderItemsWithNames.push({
      name: pizza.name,
      qty: orderItem.qty,
      price: orderItem.price,
    });
  }

  // Create Order
  const order = new Order({
    user: req.user._id,
    orderItems: orderItems.map((item) => ({
      pizza: item.pizza || item._id,
      qty: item.qty,
      price: item.price,
    })),
    deliveryAddress,
    salesTax,
    deliveryCharges,
    totalPrice,
    payment,
  });

  const createdOrder = await order.save();

  if (!createdOrder) {
    res.status(500);
    throw new Error("Order Creation Failed!");
  }

  // Send Confirmation Email
  const user = await User.findById(req.user._id);

  if (user && user.email) {
    try {
      await sendEmail({
        to: user.email,
        subject: "Order Confirmation",
        html: `
          <h1>Order Confirmation</h1>
          <p>Hi ${user.name || ""},</p>
          <p>Your order has been successfully placed!</p>

          <h3>Order Details:</h3>
          <ul>
            ${orderItemsWithNames
              .map((item) => `<li>${item.qty} x ${item.name}</li>`)
              .join("")}
          </ul>

          <p><strong>Total Price:</strong> ₹${totalPrice}</p>

          <p>
            <strong>Delivery Address:</strong><br/>
            ${deliveryAddress.address},<br/>
            ${deliveryAddress.city}, ${deliveryAddress.postalCode},<br/>
            ${deliveryAddress.country}
          </p>

          <p>Thank you for choosing PizzaHub!</p>
        `,
      });
    } catch (emailError) {
      console.error("Order created but email failed:", emailError.message);
    }
  }

  res.status(200).json({
    createdOrder,
    message: "Order Created Successfully!",
  });
});


// ==============================
// Get Orders by User
// ==============================

const getOrdersByUserId = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("user", "name")
    .populate("orderItems.pizza", "name");

  if (!orders) {
    res.status(404);
    throw new Error("Orders Not Found!");
  }

  res.status(200).json(orders);
});


// ==============================
// Get All Orders (Admin)
// ==============================

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "name email")
    .populate("orderItems.pizza", "name");

  if (!orders) {
    res.status(404);
    throw new Error("Orders Not Found!");
  }

  res.status(200).json(orders);
});


// ==============================
// Get Order By ID
// ==============================

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("orderItems.pizza", "name");

  if (!order) {
    res.status(404);
    throw new Error("Order Not Found!");
  }

  res.status(200).json(order);
});


// ==============================
// Update Order
// ==============================

const updateOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order Not Found!");
  }

  order.status = req.body.status || order.status;

  if (order.status === "Delivered") {
    order.deliveredAt = Date.now();

    const user = await User.findById(order.user);

    try {
      if (user && user.email) {
        await sendEmail({
          to: user.email,
          subject: "Your Pizza Order Has Been Delivered!",
          html: `
            <h1>Order Delivered</h1>
            <p>Hi ${user.name || ""},</p>
            <p>Your order <b>${order._id}</b> has been delivered!</p>
            <p>We hope you enjoy your meal.</p>
            <p>Thank you for choosing PizzaHub!</p>
          `,
        });
      }
    } catch (emailError) {
      console.error("Delivery email failed:", emailError.message);
    }
  } else {
    order.deliveredAt = undefined;
  }

  const updatedOrder = await order.save();

  res.status(200).json({
    updatedOrder,
    message: "Order Updated Successfully!",
  });
});


// ==============================
// Delete Order
// ==============================

const deleteOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order Not Found!");
  }

  res.status(200).json({
    message: "Order Deleted Successfully!",
  });
});


// ==============================
// Export Controllers
// ==============================

module.exports = {
  createRazorpayOrder,
  createOrder,
  getOrdersByUserId,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
