import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { handleError, handleSuccess } from "../utils/signup.util";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  useEffect(() => {}, [loginInfo]);

  const handelLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("All fields are required!");
    }
    if (password.length < 4) {
      return handleError("Password must be longer than 4 characters");
    }
    try {
      const url = "http://localhost:8080/api/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name } = result;
      await localStorage.setItem("token", jwtToken);
      await localStorage.setItem("loggedInUser", name);

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        handleError(message || "Login failed!");
      }
    } catch (error) {
      handleError(error.message || "Login failed!");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
      <div className="max-w-md w-full space-y-8 border m-4 p-4 rounded-lg">
        <div>
          <h1 className="mt-6 text-center text-3xl font-semibold ">Login</h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handelLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email.."
              value={loginInfo.email}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password.."
              value={loginInfo.password}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="text-blue-600"><Link>Forget Password</Link></div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
          <p className="text-center text-sm ">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
