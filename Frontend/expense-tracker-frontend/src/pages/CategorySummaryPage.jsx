import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function CategorySummaryPage() {

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
  }, []);

  return (
    <div style={{ textAlign: "center" }}>

      <h1>Category Summary (All)</h1>

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

      <div style={{ marginTop: "20px" }}>
        {categories.length === 0 && <p>No category data</p>}

        {categories.map((item, index) => (
          <p key={index}>
            {item._id} : ₹{item.totalAmount}
          </p>
        ))}
      </div>

    </div>
  );
}

export default CategorySummaryPage;

