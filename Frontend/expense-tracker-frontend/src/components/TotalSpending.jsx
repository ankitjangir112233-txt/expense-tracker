import { useEffect, useState } from "react";
import API from "../api/axios";

function TotalSpending({ refreshVersion }) {

  const [total, setTotal] = useState(0);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const getTotal = async () => {
    try {

      const res = await API.get("/expenses/total", { headers });

      setTotal(res.data.totalSpent);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    getTotal();
  }, [refreshVersion]);

  return (
    <div>

      <h2>Total Spending</h2>

      <h3>₹{total}</h3>

    </div>
  );
}

export default TotalSpending;