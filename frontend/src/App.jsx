import { Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import Profile from "./Pages/Profile";



function App() {
 



  return (
    <div className="App bg-gray-950 text-white h-100vh">
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={ <Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
