import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Getsingleprofile } from "../Utils/action";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const result = await Getsingleprofile(id);
        if (result.data && result.data.length > 0) {
            setEmployee(result.data[0]); // Update state with the first object in result.data
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id]);
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()]; // Get month name
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  return (
    <>
      <Header />
      <div>
        <button
          type="button"
          onClick={() => navigate("/employee")}
          className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Back
        </button>
        <div className="py-3 flex items-center text-md text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
          <div className="flex items-center gap-4">
            <div className="font-medium dark:text-white">
              <div>{employee.fullname}</div>
              <div>
                <span
                  className={`inline-flex items-center gap-x-1 text-sm font-medium rounded-full ${
                    employee.isActive
                      ? "bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-500"
                      : "bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500"
                  }`}
                >
                  <svg
                    className="flex-shrink-0 size-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <p className="items-center">
                    {employee.isActive ? "Active" : "Not Active"}
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>

        {employee ? (
          <>
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Profile Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  This is the information about the Employee.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {employee.fullname}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Role Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-lime-600 dark:text-lime-600">
                        {employee.rolename}
                      </span>
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {employee.email}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Phone number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {employee.phonenumber}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Date of Birth
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formatDate(employee.dob)}
                      <br />
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Assigned Project
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      NIL
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ViewEmployee;
