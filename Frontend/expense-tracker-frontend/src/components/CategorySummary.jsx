import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function CategorySummary({ refreshVersion }) {

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const getCategorySummary = async () => {
    try {

      const res = await API.get("/expenses/summary/category", { headers });

      setCategories(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    getCategorySummary();
  }, [refreshVersion]);

  const topThree = categories.slice(0, 3);

  return (
    <div>

      <h2>Category Summary</h2>

      {topThree.length === 0 && <p>No category data</p>}

      {topThree.map((item, index) => (
        <div key={index}>
          <p>
            {item._id} : ₹{item.totalAmount}
          </p>
        </div>
      ))}

      <br />

      <button onClick={() => navigate("/categories")}>
        Open Full Category Summary
      </button>

    </div>
  );
}

export default CategorySummary;