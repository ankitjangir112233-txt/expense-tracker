import { useState } from "react";
import API from "../api/axios";

function AddExpense({ refreshData }) {

  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const addExpense = async (e) => {
    e.preventDefault();

    try {

      await API.post(
        "/expenses",
        {
          expenseName,
          amount,
          category
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );  

      alert("Expense added");

      setExpenseName("");
      setAmount("");
      setCategory("");

      refreshData(); // refresh dashboard

    } catch (error) {

      alert(error.response?.data?.message || "Failed to add expense");

    }
  };

  return (
    <div>

      <h2>Add Expense</h2>

      <form onSubmit={addExpense}>

        <input
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">
          Add Expense
        </button>

      </form>

    </div>
  );
}

export default AddExpense;