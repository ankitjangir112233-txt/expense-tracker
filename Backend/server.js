require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");


const app = express();

// Allow frontend from any localhost port during development
app.use(cors());


app.use(express.json());

app.use((req, res, next) => {
  console.log("REQUEST HIT:", req.method, req.url);
  next();
}); //extra added for testing purposes


const authRoutes = require("./routes/auth.routes");
const expenseRoutes = require("./routes/expense.routes");

app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));



app.listen(3000, () => console.log("Server running on port 3000"));