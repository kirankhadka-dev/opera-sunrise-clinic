const InvoiceModel = require("../models/Invoice");
const PaymentModel = require("../models/Payment");
const PatientModel = require("../models/Patient");

// @desc Get all invoices (Admin, Accountant)
// @route GET /api/invoices
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceModel.find().populate(
      "patientId",
      "name email"
    );
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get a specific invoice (Admin, Accountant, Patient)
// @route GET /api/invoices/:id
const getInvoice = async (req, res) => {
  try {
    const invoice = await InvoiceModel.findById(req.params.id).populate(
      "patientId",
      "name email"
    );
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Create an invoice (Admin, Accountant)
// @route POST /api/invoices
const createInvoice = async (req, res) => {
  try {
    const { patientId, issueDate, amount, paymentStatus } = req.body;
    const patientExists = await PatientModel.findById(patientId);
    if (!patientExists)
      return res.status(404).json({ message: "Invalid Patient ID" });

    const invoice = await InvoiceModel.create({
      patientId,
      issueDate,
      amount,
      paymentStatus,
    });
    res.status(201).json({ message: "Invoice created successfully", invoice });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Update an invoice (Admin, Accountant)
// @route PUT /api/invoices/:id
const updateInvoice = async (req, res) => {
  try {
    const invoice = await InvoiceModel.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    Object.assign(invoice, req.body);
    await invoice.save();
    res.json({ message: "Invoice updated successfully", invoice });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete an invoice (Admin Only)
// @route DELETE /api/invoices/:id
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await InvoiceModel.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    await invoice.deleteOne();
    res.json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get all payments (Admin, Accountant)
// @route GET /api/payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentModel.find().populate(
      "invoiceId",
      "amount paymentStatus"
    );
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get a specific payment (Admin, Accountant, Patient)
// @route GET /api/payments/:id
const getPayment = async (req, res) => {
  try {
    const payment = await PaymentModel.findById(req.params.id).populate(
      "invoiceId",
      "amount paymentStatus"
    );
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Process a payment (Admin, Accountant)
// @route POST /api/payments
const processPayment = async (req, res) => {
  try {
    const { invoiceId, paymentDate, amount } = req.body;
    const invoiceExists = await InvoiceModel.findById(invoiceId);
    if (!invoiceExists)
      return res.status(404).json({ message: "Invalid Invoice ID" });

    const payment = await PaymentModel.create({
      invoiceId,
      paymentDate,
      amount,
    });
    res
      .status(201)
      .json({ message: "Payment processed successfully", payment });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete a payment record (Admin Only)
// @route DELETE /api/payments/:id
const deletePayment = async (req, res) => {
  try {
    const payment = await PaymentModel.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    await payment.deleteOne();
    res.json({ message: "Payment record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  getAllInvoices,
  getInvoice,
  createInvoice,
  getAllPayments,
  getPayment,
  processPayment,
  deleteInvoice,
  deletePayment,
  updateInvoice,
};
