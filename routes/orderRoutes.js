import express from "express";

import { CODpayment} from "../controllers/orderController.js";


const orderRouter = express.Router();
/*
// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/stripe", authUser, placeOrderStripe);

// User Feature
orderRouter.post("/userorders", authUser, userOrders);

// verify payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);
*/

orderRouter.post("/cod", CODpayment);


export default orderRouter;