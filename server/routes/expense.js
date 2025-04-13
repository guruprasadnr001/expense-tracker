const { generatePDFStream } = require("../utils/generatePdf.js");
const express = require("express");
const { Expense } = require("../models");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware to check JWT
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Token required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Add Expense
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { amount, category, description } = req.body;

    if (!amount || !category) {
      return res
        .status(400)
        .json({ error: "Amount and category are required" });
    }

    const expense = await Expense.create({
      amount,
      category,
      description: description || "",
      userId: req.userId,
    });
    res.status(201).json(expense);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add expense", details: error.message });
  }
});

// Delete Expense
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Expense.destroy({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Expense not found or not authorized" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete expense", details: error.message });
  }
});

// List Expenses
router.get("/list", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const expenses = await Expense.findAll({
      where: { userId },
    });

    const totalIncome = expenses
      .filter((e) => e.category === "Income")
      .reduce((sum, e) => sum + (e.amount || 0), 0);

    const totalExpense = expenses
      .filter((e) => e.category === "Expense")
      .reduce((sum, e) => sum + (e.amount || 0), 0);

    res.json({
      expenses: expenses || [],
      totalIncome,
      totalExpense,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch expenses", details: error.message });
  }
});

//pdfExport
router.get("/export/pdf", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: { userId: req.userId },
    });

    if (!expenses.length) {
      return res.status(404).json({ error: "No expenses to export" });
    }

    generatePDFStream(req.userId, expenses, res);
  } catch (error) {
    res.status(500).json({
      error: "Failed to export PDF",
      details: error.message,
    });
  }
});

module.exports = router;
