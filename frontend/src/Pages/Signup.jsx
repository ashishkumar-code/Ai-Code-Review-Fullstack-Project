import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { handleError, handleSuccess } from "../utils/signup.util";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copysignUpInfo = { ...signupInfo };
    copysignUpInfo[name] = value;
    setSignupInfo(copysignUpInfo);
  };

  useEffect(() => {
  }, [signupInfo]);

  const handelSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("All fields are required!");
    }
     if (password.length < 4) {
    return handleError("Password must be longer than 4 characters");
  }
    try {
      const url = "http://localhost:8080/api/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
    const { success, message } = result;

if (success) {
  handleSuccess(message);
  setTimeout(() => {
    navigate("/login");
  }, 1000);
}else{
  return handleError(message || "Signup failed!");
}

    } catch (error) {
      handleError(error.message || "Signup failed!");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border m-4 p-4 rounded-lg">
        <div>
          <h1 className="mt-6 text-center text-3xl font-semibold ">
            Create an account
          </h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handelSignup}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium "
            >
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Enter your name.."
              value={signupInfo.name}
              autoFocus
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium "
            >
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email.."
              value={signupInfo.email}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium "
            >
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password.."
              value={signupInfo.password}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Signup
          </button>
          <p className="text-center text-sm ">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
