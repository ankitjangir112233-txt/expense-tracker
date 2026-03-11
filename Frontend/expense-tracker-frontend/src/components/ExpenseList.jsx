import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function ExpenseList({ expenses, refreshData, showFullButton }) {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const deleteExpense = async (id) => {
    try {

      await API.delete(`/expenses/${id}`, { headers });

      if (refreshData) refreshData();

    } catch (error) {

      alert("Failed to delete expense");

    }
  };

  return (
    <div style={{ textAlign: "center" }}>

      <h2>Expense List</h2>

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

      {showFullButton && (
        <>
          <br />
          <button onClick={() => navigate("/expenses")}>
            Open Full Expense List
          </button>
        </>
      )}

    </div>
  );
}

export default ExpenseList;