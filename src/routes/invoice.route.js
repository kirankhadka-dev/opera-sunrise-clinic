import express from "express";

import {
  getAllInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getAllPayments,
  getPayment,
  processPayment,
  deletePayment,
} from "../controllers/invoice.controller.js";
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const paymentInvoiceRouter = express.Router();

// Invoice Routes (Admin & Accountant can manage invoices)
router.get(
  "/invoices",
  protect,
  authorize(["admin", "accountant"]),
  getAllInvoices
);
router.get(
  "/invoices/:id",
  protect,
  authorize(["admin", "accountant", "patient"]),
  getInvoice
);
router.post(
  "/invoices",
  protect,
  authorize(["admin", "accountant"]),
  createInvoice
);
router.put(
  "/invoices/:id",
  protect,
  authorize(["admin", "accountant"]),
  updateInvoice
);
router.delete("/invoices/:id", protect, authorize(["admin"]), deleteInvoice);

// Payment Routes (Admin & Accountant can manage payments)
router.get(
  "/payments",
  protect,
  authorize(["admin", "accountant"]),
  getAllPayments
);
router.get(
  "/payments/:id",
  protect,
  authorize(["admin", "accountant", "patient"]),
  getPayment
);
router.post(
  "/payments",
  protect,
  authorize(["admin", "accountant"]),
  processPayment
);
router.delete("/payments/:id", protect, authorize(["admin"]), deletePayment);

export default paymentInvoiceRouter;
