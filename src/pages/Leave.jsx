import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import DownloadBtn from "../Utils/DownloadBtn";
import DebouncedInput from "../Utils/DebouncedInput";
import { SearchIcon } from "../Utils/Icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  Getsingleprofile,
  GetMasterRole,
  getallholidaylist,
  getallleavemaster,
  createnewleavereq,
  deleteleavereq,
} from "../Utils/action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { eachDayOfInterval, format, isSameDay, parseISO } from "date-fns";

const Leave = () => {
  const navigate = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState("");
  const [startDateSelected, setStartDateSelected] = useState(false);
  const [leavemaster, setleavemaster] = useState([]);
  const [holidayss, setHolidayss] = useState([]);
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(null);
  const [leaveId, setLeaveId] = useState(null);
  const [roles, setRoles] = useState([]);
  const [createFormData, setCreateFormData] = useState({
    selectedLeaveId: "",
    totalDays: 0,
    startDate: null, // You might want to set a default start date
    endDate: null, // You might want to set a default end date
  });
  const handleOpenCreateModal = async () => {
    setCreateModalOpen(true);
    const response = await getallholidaylist();
    const leavemaster = await getallleavemaster();
    const holidayDatesArray = response.data.map(
      (holiday) => holiday.holidayDate.split("T")[0]
    ); // Extract only the date part
    // Join the dates with a comma and space
    setHolidayss(holidayDatesArray);
    setleavemaster(leavemaster.data);
  };
  const [days, setDays] = useState(0);

  const calculateWeekdays = (startDate, endDate) => {
    const daysArray = eachDayOfInterval({ start: startDate, end: endDate });
    const weekdays = daysArray.filter((day) => {
      const dayOfWeek = format(day, "i"); // 1 (Monday) to 7 (Sunday)
      return (
        dayOfWeek !== "6" &&
        dayOfWeek !== "7" &&
        !holidayss.some((holiday) => isSameDay(day, holiday))
      );
    });
    return weekdays.length;
  };
  useEffect(() => {
    setDays(
      calculateWeekdays(createFormData.startDate, createFormData.endDate)
    );
  }, [createFormData.startDate, createFormData.endDate]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "ID",
    }),
    columnHelper.accessor("employeeName", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Leave Applied By",
    }),
    columnHelper.accessor("leaveName", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Leave Name",
    }),
    columnHelper.accessor("noofdays", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Days Applied",
    }),
    columnHelper.accessor("startDate", {
      cell: (info) => (
        <span>{format(new Date(info.getValue()), "dd-MM-yyyy")}</span>
      ),
      header: "Start Date",
    }),
    columnHelper.accessor("endDate", {
      cell: (info) => (
        <span>{format(new Date(info.getValue()), "dd-MM-yyyy")}</span>
      ),
      header: "End Date",
    }),
    columnHelper.accessor("status", {
      cell: (info) => {
        const status = info.getValue();
        let statusText, statusColor;

        switch (status) {
          case "3":
            statusText = "Leave Applied";
            statusColor = "bg-yellow-300 text-yellow-800";
            break;
          case "1":
            statusText = "Approved";
            statusColor = "bg-green-300 text-green-800";
            break;
          case "2":
            statusText = "Rejected";
            statusColor = "bg-red-300 text-red-800";
            break;
          case "0":
            statusText = "Deleted";
            statusColor = "bg-gray-300 text-gray-800";
            break;
        }

        return (
          <span className={`px-2.5 py-0.5 rounded ${statusColor}`}>
            {statusText}
          </span>
        );
      },
      header: "Status",
    }),
    columnHelper.accessor("approvedBy", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Approved By",
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => {
        const status = info.row.original.status;

        return (
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => handleViewProfile(info.row.original.id)}
              className="flex flex-shrink-0 justify-center items-center gap-2 size-[38px] text-sm font-semibold rounded-lg border border-transparent bg-slate-600 text-white hover:bg-darkblue disabled:opacity-50 disabled:pointer-events-none"
            >
              <FaEye />
            </button>

            <button
              type="button"
              onClick={() =>
                handleOpenModal("hs-small-modal", info.row.original.id)
              }
              className="flex flex-shrink-0 justify-center items-center gap-2 size-[38px] text-sm font-semibold rounded-lg border border-transparent bg-slate-600 text-white hover:bg-darkblue disabled:opacity-50 disabled:pointer-events-none"
            >
              <FaRegEdit />
            </button>

            <button
              type="button"
              onClick={() =>
                handleDeleteOpenModal("hs-small-modal", info.row.original.id)
              }
              className={`flex flex-shrink-0 justify-center items-center gap-2 size-[38px] text-sm font-semibold rounded-lg border border-transparent ${
                status === "0"
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-slate-600 text-white hover:bg-darkblue"
              } disabled:opacity-50 disabled:pointer-events-none`}
              disabled={status === "0" || status === "1" || status === "2"}
            >
              <MdDeleteForever size={20} />
            </button>
          </div>
        );
      },
    }),
  ];

  const handleViewProfile = (id) => {
    // navigate(`/viewemployee/${id}`); // Navigate to the employee detail page with the employee ID
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      ...createFormData,
      totalDays: createFormData.totalDays || days,
    };

    const result = await createnewleavereq(formData);

    if (result === 1) {
      handleCloseCreateModal();
      fetchData();
      setMessage("New Leave Created");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const initialCreateFormData = {
    selectedLeaveId: "",
    startDate: null,
    endDate: null,
    totalDays: 0,
  };

  const fetchData = async () => {
    try {
      const loggedin = localStorage.getItem("id");

      const url =
        loggedin === "33"
          ? `https://samplerouting.findinternship.in/api/Leave/Getallleave`
          : `https://samplerouting.findinternship.in/api/Leave/GetLeaveTransactionbyprofile/${loggedin}`;

      const response = await axios.get(url);
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (modalId, leaveId) => {
    setOpenModal(modalId);
    setLeaveId(leaveId);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
    setLeaveId(null);
  };

  const handleDeleteOpenModal = (modalId, leaveId) => {
    setOpenModal(modalId);
    setLeaveId(leaveId);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    setCreateFormData(initialCreateFormData); // Reset form data
  };

  const handledeleteleave = async () => {
    const response = await deleteleavereq(leaveId);
    if (response === -1) {
      fetchData();
      handleCloseModal();
      setMessage("Leave Deleted");
      setTimeout(() => {
        setMessage(""); // Hide error after 3 seconds
      }, 3000);
    }
  };

  const isWeekdayAndNotHoliday = (date) => {
    const day = format(date, "i"); // 1 (Monday) to 7 (Sunday)
    const isHoliday = holidayss.some((holiday) => isSameDay(date, holiday));
    return day !== "6" && day !== "7" && !isHoliday;
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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

      {createModalOpen && (
        <div
          id="create-modal"
          className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
        >
          <div className="bg-white border shadow-sm rounded-xl max-w-sm w-full m-3">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 className="font-bold">Create Leave Request </h3>
              <button
                type="button"
                className="h-7 w-7 text-gray-800 hover:bg-gray-100 rounded-full"
                onClick={handleCloseCreateModal}
              >
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <form onSubmit={handleCreateSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="leavemaster"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select a Leave Type:
                  </label>
                  <select
                    id="leavemaster"
                    name="leavemaster"
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      const leaveType = leavemaster.find(
                        (leave) => leave.id === parseInt(selectedValue)
                      );
                      const halfday =
                        selectedValue === "2" || selectedValue === "4"
                          ? 0.5
                          : days;

                      setCreateFormData({
                        ...createFormData,
                        selectedLeaveId: selectedValue,
                        leaveTypeName: leaveType ? leaveType.leaveName : "",
                        totalDays: halfday,
                      });
                    }}
                    value={createFormData.selectedLeaveId}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="">Select Leave Type</option>
                    {leavemaster.map((leave) => (
                      <option key={leave.id} value={leave.id}>
                        {leave.leaveName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">
                    Start Date
                  </label>
                  <DatePicker
                    selected={createFormData.startDate}
                    onChange={(date) => {
                      setCreateFormData((prev) => ({
                        ...prev,
                        startDate: date,
                        endDate: date > prev.endDate ? date : prev.endDate,
                      }));
                      setStartDateSelected(true);
                    }}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                    filterDate={isWeekdayAndNotHoliday}
                  />
                </div>

                {createFormData.selectedLeaveId === "2" ||
                createFormData.selectedLeaveId === "4" ? (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        End Date
                      </label>
                      <DatePicker
                        disabled
                        selected={createFormData.startDate}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200"
                        required
                        minDate={createFormData.startDate}
                        filterDate={isWeekdayAndNotHoliday}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Total Weekdays
                      </label>
                      <input
                        type="text"
                        value="0.5"
                        readOnly
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        End Date
                      </label>
                      <DatePicker
                        selected={createFormData.endDate}
                        onChange={(date) => {
                          if (date >= createFormData.startDate) {
                            setCreateFormData((prev) => ({
                              ...prev,
                              endDate: date,
                            }));
                            setDays(
                              calculateWeekdays(createFormData.startDate, date)
                            );
                          } else {
                            alert(
                              "End date must be after or the same as the start date"
                            );
                          }
                        }}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                        minDate={createFormData.startDate}
                        filterDate={isWeekdayAndNotHoliday}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Total days
                      </label>
                      <input
                        type="text"
                        value={days}
                        onChange={(e) =>
                          setCreateFormData({
                            ...createFormData,
                            totalDays: e.target.value,
                          })
                        }
                        readOnly
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="py-2 px-3 mr-2 bg-gray-200 rounded-md"
                    onClick={handleCloseCreateModal}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-3 bg-blue-600 text-white rounded-md"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="p-2 max-w-full mx-auto text-white fill-gray-400">
        <div className="flex justify-between mb-2">
          <div className="w-full flex items-center gap-1">
            <SearchIcon />
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-darkblue text-[12px] text-black"
              placeholder="Search..."
            />
          </div>
          <button
            onClick={handleOpenCreateModal}
            type="button"
            className="text-[12px] text-white font-semibold bg-darkblue h-10 w-24  hover:bg-gradient-to-br focus:ring-4 focus:outline-none  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Create
          </button>
          <DownloadBtn data={data} fileName={"Employee List"} />
        </div>
        <table className="w-full text-center  ">
          <thead className="bg-darkblue  ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="capitalize px-3.5 py-2 text-[14px] font-medium "
                  >
                    <div
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`
                ${i % 2 === 0 ? "bg-tablelight" : "bg-tabledark"}
                `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-3.5 py-2 text-[12px] text-black"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32 text-[14px] font-medium text-black">
                <td colSpan={12}>No Record Found!</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* pagination */}
        <div className="flex items-center justify-end mt-2 gap-2">
          <button
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className="p-1 border border-gray-300 px-2 disabled:opacity-30 text-[15px] text-black"
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="p-1 border border-gray-300 px-2 disabled:opacity-30 text-[15px] text-black"
          >
            {">"}
          </button>

          <span className="flex items-center gap-1">
            <div className="text-[12px] text-black">Page</div>
            <strong className="text-[12px] text-black">
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1 text-[12px] text-black">
            | Go to page:
            <input
              type="number"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16 bg-transparent text-[12px] text-black"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="p-2 bg-transparent text-[12px] text-black"
          >
            {[10, 20, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
      {openModal === "hs-small-modal" && (
        <div
          id="hs-small-modal"
          className="hs-overlay fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        aria-hidden="true"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-6 w-6 text-red-600"
                      >
                        <path
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        id="modal-title"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Delete Leave Request
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete the leave request?
                          This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    type="button"
                    onClick={handledeleteleave}
                  >
                    Delete
                  </button>
                  <button
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Leave;
