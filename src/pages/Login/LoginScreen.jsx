import React, { useState, useEffect } from "react";
import { login } from "../../Utils/action";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [info, setInfo] = useState({ email: "", password: "" });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function handleInput(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // Reset error on input change
  }

  const onFinish = async (e) => {
    e.preventDefault();
    try {
      setPending(true);
      const res = await login(info);
      if (res === "Invalid Credentials") {
        setError("Access Denied: Check Your Email and Password");
        setTimeout(() => {
          setError(""); // Hide error after 3 seconds
        }, 3000);

        return;
      } else {
         navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An unexpected error occurred. Please try again.");

      setTimeout(() => {
        setError(""); // Hide error after 3 seconds
      }, 3000);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      {error && (
        <div
          id="toast-top-right"
          className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-black bg-red-400 divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
          role="alert"
        >
          <div className="text-sm font-normal">{error}</div>
        </div>
      )}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-500 to-slate-800 w-full">
        <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-35 relative w-[450px]">
          <div className="text-2xl font-bold text-center mb-6 text-white">
            Welcome Back
          </div>
          <form onSubmit={onFinish}>
            <div className="relative my-4">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-[12px] text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                required
                onChange={handleInput}
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <div className="relative my-4">
              <input
                type="password"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-[12px] text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleInput}
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            <button
              type="submit"
              className="w-full mb-4 text-[18px] rounded mt-6 bg-blue-500 py-2 hover:bg-blue-600 transition-colors duration-300 text-white"
              disabled={pending}
            >
              {pending ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
