import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AllExpenses from "./pages/AllExpenses";
import CategorySummaryPage from "./pages/CategorySummaryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/expenses" element={<AllExpenses />} />

        <Route path="/categories" element={<CategorySummaryPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;