import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default AppRoutes;
