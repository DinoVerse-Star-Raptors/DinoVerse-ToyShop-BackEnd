import express from "express";

import { CODpayment , userOrders} from "../controllers/orderController.js";


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
orderRouter.post("/myOrder", userOrders);


export default orderRouter;