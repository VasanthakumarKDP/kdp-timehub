import React, { useState } from "react";
import { login } from "../../Utils/action";

const LoginScreen = () => {
  const [info, setInfo] = useState({ email: "", password: "" });
  const [pending, setPending] = useState(false); // Add state for pending

  function handleInput(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value })); // Fix updating the state
  }

  const onFinish = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setPending(true);
      const res = await login(info); // Pass the info state to the login function
      console.log("Login successful:", res);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setPending(false);
    }
  };

  return (
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
              className="block py-2.5  px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              onChange={(e) => handleInput(e)}
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
              className="block py-2.5 px-0 w-full text-[15px] text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => handleInput(e)}
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
  );
};

export default LoginScreen;
