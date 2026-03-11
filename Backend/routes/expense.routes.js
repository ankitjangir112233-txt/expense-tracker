const express = require("express");
const router = express.Router();

const {
    createExpense,
    getExpenses,
    deleteExpense,
    updateExpense,
    getSingleExpense,
    getMonthlyTotal,
    getCategorySummary,
    getTotalSpending
} = require("../controllers/expense.controller");
const authMiddleware = require("../middleware/auth");


// Create expense
router.post("/", authMiddleware, createExpense);

// List expenses
router.get("/", authMiddleware, getExpenses);
router.get("/summary/monthly", authMiddleware, getMonthlyTotal);
router.get("/summary/category", authMiddleware, getCategorySummary);
router.get("/total", authMiddleware, getTotalSpending);
router.get("/:id", authMiddleware, getSingleExpense);
router.put("/:id", authMiddleware, updateExpense);
router.delete("/:id", authMiddleware, deleteExpense);

module.exports = router;    