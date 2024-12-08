import Order from '../models/orderModel.js';
import Cart from '../models/Cart.js';
import mongoose from "mongoose";

// import Stripe from "stripe";

// global variables
// const currency = "thb";
// const deliveryCharge = 20;

// gateway initialize
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing orders using Stripe Method
const CODpayment = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    console.log("ตัวบน", newOrder);
    await newOrder.save();
    console.log("ตัวล่าง", newOrder);


    /*
    const itemIds = items.map(item => item._id); // ตัวต้องการซื้อ
    console.log("req.body items:", items) // มากับ req.body
    console.log("itemIds:", itemIds);

    const cartById = await Cart.findOne({ user: userId})
    console.log("cartById:", cartById)

    // Delete carts where _id is in the itemIds array
    // const result = await Cart.updateOne({ _id: { $in: itemIds } });
    const result = await Cart.updateOne({ user: userId}, {$set:{items:[]}});
    console.log(result)
    */

    const itemIdsToRemove = items.map(item => item._id);
    console.log('ไอดีไอเทมที่เราต้องการกำจัด', itemIdsToRemove);

    // Remove the items from the cart
    const result = await Cart.updateOne(
      { user: userId },
      {
        $pull: {
          items: {
            _id: { $in: itemIdsToRemove } // Remove items with matching product IDs
          }
        }
      }
    );
    console.log(result);

    res.json({ success: true, message: newOrder });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/*
// User Order Data For Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update order status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
*/
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { CODpayment, userOrders };