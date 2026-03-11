import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function AllExpenses() {

  const [expenses, setExpenses] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const fetchAllExpenses = async () => {
    try {

      const res = await API.get("/expenses", { headers });

      const sorted = [...res.data].sort((a, b) =>
        a.expenseName.localeCompare(b.expenseName)
      );

      setExpenses(sorted);

    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpense = async (id) => {
    try {

      await API.delete(`/expenses/${id}`, { headers });

      fetchAllExpenses();

    } catch (error) {
      alert("Failed to delete expense");
    }
  };

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  return (
    <div className="all-expenses" style={{ textAlign: "center" }}>

      <h1>All Expenses (A–Z)</h1>

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

      <div style={{ marginTop: "20px" }}>
        {expenses.length === 0 && <p>No expenses found</p>}

        {expenses.map((expense) => (
          <div key={expense._id} style={{ marginBottom: "10px" }}>
            <span>
              {expense.expenseName} - ₹{expense.amount} - {expense.category}
            </span>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => deleteExpense(expense._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default AllExpenses;

