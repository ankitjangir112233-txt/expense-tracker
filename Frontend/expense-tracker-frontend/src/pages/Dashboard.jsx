import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";
import TotalSpending from "../components/TotalSpending";
import CategorySummary from "../components/CategorySummary";

function Dashboard() {

  const [expenses, setExpenses] = useState([]);

  const [search, setSearch] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [refreshVersion, setRefreshVersion] = useState(0);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const fetchExpenses = async (searchValue = "") => {
    try {

      const res = await API.get(`/expenses?search=${searchValue}`, { headers });

      setExpenses(res.data);
      setRefreshVersion((v) => v + 1);

    } catch (error) {

      if (error.response?.status === 404) {
        // No expenses found for this search – show empty list
        setExpenses([]);
        setRefreshVersion((v) => v + 1);
      } else {
        console.log(error);
      }

    }
  };

  const filterExpenses = async () => {
    try {

      const res = await API.get(
        `/expenses?startDate=${startDate}&endDate=${endDate}`,
        { headers }
      );

      setExpenses(res.data);
      setRefreshVersion((v) => v + 1);

    } catch (error) {

      if (error.response?.status === 404) {
        // No expenses found for this date range – show empty list
        setExpenses([]);
        setRefreshVersion((v) => v + 1);
      } else {
        console.log(error);
      }

    }
  };

  const refreshData = () => {
    fetchExpenses(search);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (

    <div className="dashboard" style={{ textAlign: "center" }}>

      <h1 className="title">Expense Tracker</h1>

      {/* ADD EXPENSE */}

      <div className="section">
        <AddExpense refreshData={refreshData} />
      </div>

      {/* SEARCH */}

      <div className="section">

        <h2>Search Expense</h2>

        <input
          type="text"
          placeholder="Search expense..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            fetchExpenses(e.target.value);
          }}
        />

      </div>

      {/* DATE FILTER */}

      <div className="section">

        <h2>Filter by Date</h2>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button onClick={filterExpenses}>
          Filter
        </button>

      </div>

      {/* EXPENSE LIST */}

      <div className="section">

        <ExpenseList
          expenses={expenses.slice(0, 3)}
          refreshData={refreshData}
          showFullButton
        />

      </div>

      {/* SUMMARY SECTION */}

      <div className="summary">

        <TotalSpending refreshVersion={refreshVersion} />

        <CategorySummary refreshVersion={refreshVersion} />

      </div>

    </div>

  );
}

export default Dashboard;