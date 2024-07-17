import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import secureLocalStorage from "react-secure-storage";
import {
  GetLeaveforApproval,
  GetLeaveforUserView,
  LeaveApproved,
  LeaveRejected,
} from "../Utils/action";

const ViewApproveLeave = () => {
  const { id } = useParams();
  let roleid = secureLocalStorage.getItem("UezU/D9QwECM6CHTuH6Iow==");
  const pid = secureLocalStorage.getItem("JX8tKX+J9YwrPaEdSEwF+w==");
  const [leavedetail, setLeaveDetails] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const values = { id, pid };
        const result =
          roleid === 4
            ? await GetLeaveforApproval(values)
            : await GetLeaveforUserView(values);
        // const result = await GetLeaveforApproval(values);
        if (result.data && result.data.length > 0) {
          setLeaveDetails(result.data[0]);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setError("Failed to fetch leave details.");
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id, pid]);

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
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  const getStatusText = (status) => {
    switch (status) {
      case "0":
        return {
          text: "Leave Deleted",
          color:
            "bg-gray-100 text-gray-800 dark:bg-gray-500/10 dark:text-gray-500",
        };
      case "2":
        return {
          text: "Leave Rejected",
          color: "bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500",
        };
      case "3":
        return {
          text: "Leave Requested",
          color:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500",
        };
      case "1":
        return {
          text: "Leave Approved",
          color:
            "bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-500",
        };
      default:
        return {
          text: "Unknown Status",
          color:
            "bg-gray-100 text-gray-800 dark:bg-gray-500/10 dark:text-gray-500",
        };
    }
  };

  const Leaveapprove = async () => {
    try {
      const values = { id, pid };
      const result = await LeaveApproved(values);
      if (result.data === -1) {
        setMessage("Leave Approved");
        setTimeout(() => {
          setMessage(""); // Hide message after 3 seconds
          navigate("/approveleave"); // Redirect after approval
        }, 3000);
      }
    } catch (error) {
      console.error("Error approving leave:", error);
      setError("Failed to approve leave.");
    }
  };

  const Leavereject = async () => {
    try {
      const values = { id, pid };
      const result = await LeaveRejected(values);
      if (result.data === -1) {
        setMessage("Leave Rejected");
        setTimeout(() => {
          setMessage(""); // Hide message after 3 seconds
          navigate("/approveleave"); // Redirect after rejection
        }, 3000);
      }
    } catch (error) {
      console.error("Error rejecting leave:", error);
      setError("Failed to reject leave.");
    }
  };

  const navigateasrole = () => {
    roleid == 4 ? navigate("/approveleave") : navigate("/leavetransaction");
  };
  if (!leavedetail) {
    return (
      <>
        <Header />
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <Header />
      {message && (
        <div
          id="toast-top-right"
          className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-black bg-lime-400 divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-20 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
          role="alert"
        >
          <div className="text-sm font-normal">{message}</div>
        </div>
      )}
      {error && (
        <div
          id="toast-top-right"
          className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-white bg-red-500 divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-20 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
          role="alert"
        >
          <div className="text-sm font-normal">{error}</div>
        </div>
      )}
      <div>
        <button
          type="button"
          onClick={() => navigateasrole()}
          className="text-white bg-darkblue hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 ml-3 mt-10 text-center "
        >
          Back
        </button>
        <div className=" mb-5 mt-6 flex items-center text-md text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
          <div className="flex items-center gap-4">
            <div className="font-medium dark:text-white">
              <div>{leavedetail.fullName}</div>
              <div>
                <span
                  className={`inline-flex items-center gap-x-1 text-sm font-medium rounded-full ${
                    getStatusText(leavedetail.status).color
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
                    {getStatusText(leavedetail.status).text}
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Leave Details
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {leavedetail.fullName}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Leave Type
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-lime-600 dark:text-lime-600">
                    {leavedetail.leaveName}
                  </span>
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Leave Start Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatDate(leavedetail.start_Date)}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Leave End Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatDate(leavedetail.end_Date)}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  No. of Days
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {leavedetail.noofdays}
                </dd>
              </div>
            </dl>
          </div>

          {leavedetail.status === "3" && roleid == 4 && (
            <>
              <button
                type="button"
                onClick={() => Leaveapprove()}
                className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => Leavereject()}
                className="text-gray-900 bg-gradient-to-r from-red-200 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewApproveLeave;
