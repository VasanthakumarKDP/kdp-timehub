import React, { useState, useEffect } from "react";

import { GiBugNet } from "react-icons/gi";
import { FaBug, FaBugSlash } from "react-icons/fa6";

import { VscDebugAll } from "react-icons/vsc";
import WelcomeBanner from "../components/WelcomeBanner";
import Header from "../components/Header";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
const Dashboard = () => {
  const [greeting, setGreeting] = useState("");
  let id = secureLocalStorage.getItem("JX8tKX+J9YwrPaEdSEwF+w==");
  const [leaveData, setLeaveData] = useState([]);
  useEffect(() => {
    // Get the current hour
    const currentHour = new Date().getHours();

    // Set greeting based on the current time
    if (currentHour >= 0 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
    // API call to fetch leave data
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get(
          `https://samplerouting.findinternship.in/api/Leave/GetLeaveTransactiondashboard/${id}`
        );
        setLeaveData(response.data);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaveData();
  }, []);

  return (
    <>
      <div>
        {" "}
        <Header />
        {/* <h2 className="text-sm "> Hi {` ${username},${greeting}`}</h2> */}
        {/* For Weather */}
        {/* <div className=" flex w-[550px] bg-slate-300 h-[40px] rounded-md">
          <div>Hi {` ${username},${greeting}`}</div>
        </div> */}
      </div>
      <WelcomeBanner />
      <>
        {/* <h1 className=" m-5 text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
          Leave Transaction
        </h1>
        <hr class="border-blue-500"></hr> */}
        <div className="container">
          <div className="flex flex-wrap -m-4 text-center">
            {/* <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="flex border-b-4 gap-4 items-center shadow-lg bg-lightblue border-b-darkblue px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 group ">
                <GiBugNet className="w-[35px] h-[35px] font-bold " />
                <h2 className="title-font font-medium text-3xl text-white">
                  15500
                </h2>
                <p className="leading-relaxed text-white font-semibold text-[17px]">
                  Total bugs
                </p>
              </div>
            </div> */}
            {/* <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className=" flex border-b-4 gap-4 items-center shadow-lg  bg-lightblue border-b-darkblue px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <FaBug className="w-[35px] h-[35px]  " />
                <h2 className="title-font font-medium text-3xl text-white">
                  1.3K
                </h2>
                <p className="leading-relaxed text-white font-semibold text-[17px]">
                  Open Bugs
                </p>
              </div>
            </div> */}
            {/* <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="flex border-b-4 gap-4 items-center shadow-lg  bg-lightblue border-b-darkblue px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <FaBugSlash className="w-[35px] h-[35px]  " />
                <h2 className="title-font font-medium text-3xl text-white">
                  74
                </h2>
                <p className="leading-relaxed text-white font-semibold text-[17px]">
                  Closed Bugs
                </p>
              </div>
            </div> */}
            {/* <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="flex border-b-4 gap-4 items-center shadow-lg  bg-lightblue border-b-darkblue px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <VscDebugAll className="w-[35px] h-[35px] " />
                <h2 className="title-font font-medium text-3xl text-white">
                  46
                </h2>
                <p className="leading-relaxed text-white font-semibold text-[17px]">
                  Assigned Bugs
                </p>
              </div>
            </div> */}
          </div>

          <div className="p-4 md:w-1/4 sm:w-1/2 w-full ">
            <div className="weather flex min-h-[10em] min-w-[16em] flex-col items-center justify-center shadow-lg  rounded-lg border-b-4 border-b-darkblue bg-gradient-to-r from-indigo-500 to-blue-300  text-[#fff]  ">
              <div className="flex h-fit w-full items-center justify-center gap-[1em]">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/fluency/48/leave-house.png"
                  alt="leave-house"
                />
              </div>

              <div className="flex h-fit w-full items-center justify-between">
                <div className="flex h-fit w-full flex-col items-start justify-between text-[0.75em]">
                  <div className="flex flex-row items-center justify-center gap-[0.5em] p-[0.25em]">
                    <span className="h-[0.5em] w-[1px] rounded-full "></span>
                    <p>Planned Leave</p>
                    <span className="h-[1.5em] w-[1px] rounded-full bg-[#000000]"></span>
                    <p>
                      {leaveData.length > 0
                        ? `  ${leaveData[0].takenPlannedDays} / ${leaveData[0].plannedLeave}`
                        : "Loading..."}
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-[0.5em] p-[0.25em]">
                    <span className="h-[0.5em] w-[1px] rounded-full "></span>
                    <p>Unplanned Leave</p>
                    <span className="h-[1.5em] w-[1px] rounded-full bg-[#000000]"></span>
                    <p>
                      {leaveData.length > 0
                        ? `  ${leaveData[0].takenUnplannedDays} / ${leaveData[0].unPlannedLeave}`
                        : "Loading..."}
                    </p>
                  </div>
                </div>
                <div className="flex h-full w-[6rem] flex-col items-center py-[0.25em] text-[0.625em]"></div>
              </div>
            </div>
          </div>
        </div>
      </>

      {/* <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 "
      >
        <li className="col-span-1 flex flex-col divide-y divide-gray-200  rounded-lg bg-white text-center shadow-lg ">
          <div className="flex flex-1 flex-col p-8 ">
            <img
              className="mx-auto h-24 w-24 flex-shrink-0 rounded-full shadow-lg "
              src={login}
              alt=""
            />
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              Login - Logout
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-gray-500">Paradigm Representative</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Admin
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200 ">
              <div className="flex w-0 flex-1">
                <a
                  href="mailto:najibgafar@gmail.com"
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <svg
                    className="h-5 w-5 text-lime-500 hover:text-lime-200"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                  Email
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href="tel:+4407393145546"
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <svg
                    className="h-5 w-5 text-lime-500 hover:text-lime-200"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Call
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href="tel:+4407393145546"
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <svg
                    className="h-5 w-5 text-lime-500 hover:text-lime-200"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Call
                </a>
              </div>
            </div>
          </div>
        </li>

        <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
          <div className="flex flex-1 flex-col p-8">
            <img
              className="mx-auto h-24 w-24 flex-shrink-0 rounded-full shadow-lg"
              src={lunch}
              alt=""
            />
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              Lunch In - Lunch Out
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-gray-500">Paradigm Representative</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-green-600/20">
                  staff
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href="mailto:najibgafar@gmail.com"
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <svg
                    className="h-5 w-5 text-lime-500 hover:text-lime-200"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                  Email
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href="tel:+4407393145546"
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <svg
                    className="h-5 w-5 text-yellow-500 hover:text-gray-50"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Call
                </a>
              </div>
            </div>
          </div>
        </li>
        <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
          <div className="flex flex-1 flex-col p-8">
            <img
              className="mx-auto h-24 w-24 flex-shrink-0 rounded-full shadow-lg"
              src={tea}
              alt=""
            />
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              Break In - Break Out
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-gray-500">Paradigm Representative</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                <span className="inline-flex items-center rounded-full bg-black px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-green-600/20">
                  teacher
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-white">
              <div className="flex w-0 flex-1">
                <a
                  href="mailto:najibgafar@gmail.com"
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <svg
                    className="h-5 w-5 text-white hover:text-black"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                  Email
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href="tel:+4407393145546"
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <svg
                    className="h-5 w-5 text-black hover:text-gray-50"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Call
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul> */}
    </>
  );
};

export default Dashboard;
