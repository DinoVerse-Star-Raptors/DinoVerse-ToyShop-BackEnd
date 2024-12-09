import Order from '../models/orderModel.js';
import Cart from '../models/Cart.js';
import mongoose from 'mongoose';
import Stripe from 'stripe';
// import { mode } from 'crypto-js';

// global variables
const currency = 'thb';
const deliveryCharge = 20;

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing orders using Stripe Method
const CODpayment = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now()
    };

    const newOrder = new Order(orderData);
    console.log('ตัวบน', newOrder);
    await newOrder.save();
    console.log('ตัวล่าง', newOrder);

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

    const itemIdsToRemove = items.map((item) => item._id);
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

const stripepayment = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'stripe',
      payment: false,
      date: Date.now()
    };

    const newOrder = new Order(orderData);
    // console.log("ตัวบน", newOrder);
    await newOrder.save();
    // console.log("ตัวล่าง", newOrder);

    const itemIdsToRemove = items.map((item) => item._id);
    // console.log('ไอดีไอเทมที่เราต้องการกำจัด', itemIdsToRemove);

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
    console.log('ไอเทม', items);

    const line_items = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Product Name' // ชื่อสินค้า
        },
        unit_amount: 5000 // ราคา (ในหน่วยเล็กสุด เช่น 5000 = $50.00)
      },
      quantity: 1 // จำนวนสินค้า
    }));

    console.log('ไลน์ไอเทม', line_items);
    // line_items.push({
    //   price_data: {
    //     currency: currency,
    //     product_data: {
    //       name: "Delivery Charges",
    //     },
    //     unit_amount: 20,
    //   },
    //   quantity: 1,
    // });
    //console.log(line_items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [...line_items],
      mode: 'payment',
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`
    });

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'], // ประเภทการชำระเงินที่รองรับ
    //   mode: 'payment', // โหมดชำระเงิน
    //   line_items: [

    //   ],
    //   success_url: 'https://your-site.com/success', // URL หลังชำระเงินสำเร็จ
    //   cancel_url: 'https://your-site.com/cancel' // URL หลังยกเลิกการชำระเงิน
    // });

    // res.json({ success: true, session_url: session.url });

    res.json({ success: true, message: newOrder });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

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

export { CODpayment, userOrders, stripepayment };
