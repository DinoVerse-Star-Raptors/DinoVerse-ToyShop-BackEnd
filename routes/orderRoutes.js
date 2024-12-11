import express from "express";

import { CODpayment , userOrders , stripepayment , verifyStripe} from "../controllers/orderController.js";


const orderRouter = express.Router();
/*
// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/stripe", authUser, placeOrderStripe);

// User Feature
orderRouter.post("/userorders", authUser, userOrders);
*/

orderRouter.post("/cod", CODpayment);
orderRouter.post("/stripe", stripepayment);
orderRouter.post("/myOrder", userOrders);
orderRouter.post("/verifyStripe", verifyStripe);


export default orderRouter;