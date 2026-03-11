const mongoose = require("mongoose");
const Expense = require("../models/expense");

const createExpense = async (req, res) => {
    try {
  
        console.log("BODY:", req.body);
        console.log("USER:", req.userId);

  
      const { expenseName, amount, category } = req.body;
  
      if (!expenseName || !expenseName.trim() || !amount || !category || !category.trim()) {
        return res.status(400).json({
          message: "expenseName, amount and category are required"
        });
      }
  
      if (amount <= 0) {
        return res.status(400).json({
          message: "Amount must be greater than 0"
        });
      }
  
      const expense = await Expense.create({
        user: req.userId,
        expenseName,
        amount,
        category
      });
  
      res.status(201).json(expense);
  
    } catch (error) {
      console.log("ERROR:", error);
      res.status(500).json({
        message: error.message
      });
    }
};

const getExpenses = async (req,res) => {
    try {

        const filter = { user: req.userId };

        if (req.query.startDate && req.query.endDate) {
            filter.date = {
                $gte: new Date(req.query.startDate),
                $lte: new Date(req.query.endDate)
            };
        }

        if (req.query.search) {
            filter.expenseName = {
                $regex: req.query.search,
                $options: "i"
            };
        }

        const expenses = await Expense.find(filter).sort({ date: -1 });

        if (!expenses.length) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }
        res.status(200).json(expenses);

    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const deleteExpense = async (req, res) => {
    try{
        const expense = await Expense.findOneAndDelete({
            _id : req.params.id,
            user : req.userId
        });
        if (!expense) {
            return res.status(404).json({
                message: "expense not found"
            });
        }

        res.status(200).json({
            message : "expense deleted"
        })
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
};

const updateExpense = async (req,res) => {
    try {
        const {amount} = req.body;

        if (amount && amount <= 0) {
            return res.status(400).json({
                message : "amount must be greater than 0"
            });
        }

        const expense = await Expense.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            req.body,
            { new : true }
        );
        if (!expense){
            return res.status(404).json({
                message : "Expense not found"
            });
        }

        res.status(200).json(expense);
    }catch(error) {
        res.status(500).json({
            message : error.message
        });
    }
};

const getSingleExpense = async (req,res) => {
    try {
        const expense = await Expense.findOne({
            _id : req.params.id,
            user : req.userId
        });
        if (!expense){
            return res.status(404).json({
                message: "expense not found"
            })
        }

        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
};


const getMonthlyTotal = async (req, res) => {
    try {
      const userId = req.userId;
  
      const monthlyData = await Expense.aggregate([
        {
          $match: { user: new mongoose.Types.ObjectId(userId) }
        },
        {
          $group: {
            _id: {
              year: { $year: "$date" },
              month: { $month: "$date" }
            },
            totalAmount: { $sum: "$amount" }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }
        }
      ]);
  
      res.status(200).json(monthlyData);
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const getCategorySummary = async (req,res) => {
    try{    
        const userId = req.userId;

        const categoryData = await Expense.aggregate([
            {
                $match : { user : new mongoose.Types.ObjectId(userId) }
            },
            {
                $group: {
                  _id: "$category",
                  totalAmount: { $sum: "$amount" }
                }
            },
            {
                $sort: { totalAmount : -1}
            }
        ]);

        res.status(200).json(categoryData);
    } catch(error) {
        res.status(500).json({message : error.message});
    }
  };


  const getTotalSpending = async (req,res) => {
    try {

        const result = await Expense.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(req.userId) }
            },
            {
                $group: {
                    _id: null,
                    totalSpent: { $sum: "$amount" }
                }
            }
        ]);

        res.status(200).json({
            totalSpent: result[0]?.totalSpent || 0
        });

    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }
};



module.exports = { createExpense, getExpenses, deleteExpense, updateExpense, getSingleExpense, getMonthlyTotal, getCategorySummary, getTotalSpending };
