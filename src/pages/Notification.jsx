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
} from "../Utils/action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { eachDayOfInterval, format, isSameDay, parseISO } from "date-fns";

const Leave = () => {
  const navigate = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState("");
  const [startDateSelected, setStartDateSelected] = useState(false);
  const [leavemaster, setLeavemaster] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [roles, setRoles] = useState([]);
  const [createFormData, setCreateFormData] = useState({
    selectedLeaveId: "",
    totalDays: 0,
    startDate: null,
    endDate: null,
  });
  const [days, setDays] = useState(0);

  const fetchHolidaysAndLeaves = async () => {
    const holidaysResponse = await getallholidaylist();
    const leavemasterResponse = await getallleavemaster();
    setHolidays(holidaysResponse.data.map(holiday => holiday.holidayDate.split("T")[0]));
    setLeavemaster(leavemasterResponse.data);
  };

  const handleOpenCreateModal = async () => {
    setCreateModalOpen(true);
    await fetchHolidaysAndLeaves();
  };

  const calculateWeekdays = (startDate, endDate) => {
    const daysArray = eachDayOfInterval({ start: startDate, end: endDate });
    const weekdays = daysArray.filter(day => {
      const dayOfWeek = format(day, "i"); // 1 (Monday) to 7 (Sunday)
      return dayOfWeek !== "6" && dayOfWeek !== "7" && !holidays.some(holiday => isSameDay(day, parseISO(holiday)));
    });
    return weekdays.length;
  };

  useEffect(() => {
    if (createFormData.startDate && createFormData.endDate) {
      setDays(calculateWeekdays(createFormData.startDate, createFormData.endDate));
    }
  }, [createFormData.startDate, createFormData.endDate]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const loggedin = localStorage.getItem("id");
      const url = loggedin === "33" ? 
        `https://localhost:7060/api/Leave/Getallleave` : 
        `https://localhost:7060/api/Leave/GetLeaveTransactionbyprofile/${loggedin}`;
      const response = await axios.get(url);
      if (response.status !== 200) throw new Error(`HTTP error! Status: ${response.status}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
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

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    setCreateFormData({
      selectedLeaveId: "",
      startDate: null,
      endDate: null,
      totalDays: 0,
    });
  };

  const isWeekdayAndNotHoliday = (date) => {
    const day = format(date, "i");
    return day !== "6" && day !== "7" && !holidays.some(holiday => isSameDay(date, parseISO(holiday)));
  };

  const handleLeaveChange = (event) => {
    const selectedValue = event.target.value;
    const leaveType = leavemaster.find(leave => leave.id === parseInt(selectedValue));
    const halfday = selectedValue === "2" || selectedValue === "4" ? 0.5 : days;
    setCreateFormData({
      ...createFormData,
      selectedLeaveId: selectedValue,
      leaveTypeName: leaveType ? leaveType.leaveName : "",
      totalDays: halfday,
    });
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
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
      cell: (info) => <span>{format(new Date(info.getValue()), "dd-MM-yyyy")}</span>,
      header: "Start Date",
    }),
    columnHelper.accessor("endDate", {
      cell: (info) => <span>{format(new Date(info.getValue()), "dd-MM-yyyy")}</span>,
      header: "End Date",
    }),
    columnHelper.accessor("status", {
      cell: (info) => {
        const status = info.getValue();
        const statusMap = {
          "3": { text: "Leave Applied", color: "bg-yellow-300 text-yellow-800" },
          "1": { text: "Approved", color: "bg-green-300 text-green-800" },
          "2": { text: "Rejected", color: "bg-red-300 text-red-800" },
          "0": { text: "Deleted", color: "bg-gray-300 text-gray-800" },
        };
        return (
          <span className={`px-2.5 py-0.5 rounded ${statusMap[status].color}`}>
            {statusMap[status].text}
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
      cell: (info) => (
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => navigate(`/viewemployee/${info.row.original.id}`)}
            className="flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-lg bg-slate-600 text-white hover:bg-darkblue"
          >
            <FaEye />
          </button>
          <button
            type="button"
            onClick={() => handleOpenModal("hs-small-modal", info.row.original.id)}
            className="flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-lg bg-slate-600 text-white hover:bg-darkblue"
          >
            <FaRegEdit />
          </button>
          <button
            type="button"
            onClick={() => handleOpenModal("delete-leave", info.row.original.id)}
            className="flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-lg bg-red-500 text-white hover:bg-red-700"
          >
            <MdDeleteForever />
          </button>
        </div>
      ),
      header: "Actions",
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const renderTable = () => (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <Header title="Leave Management" />
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Leave Management</h1>
        </div>
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <button
            onClick={handleOpenCreateModal}
            className="btn bg-primary hover:bg-darkblue text-white"
          >
            Create New Leave
          </button>
          <DownloadBtn />
        </div>
      </div>
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        <div className="mb-4 sm:mb-0 w-full">
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="form-input w-full"
            placeholder="Search by name"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full divide-y divide-slate-200">
          <thead className="bg-slate-100 text-slate-500 uppercase text-xs font-semibold">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-sm divide-y divide-slate-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        renderTable()
      )}
      {createModalOpen && (
        <div
          id="hs-modal-create-leave"
          className="hs-overlay hs-overlay-open:opacity-100 hidden overflow-x-hidden overflow-y-auto fixed inset-0 z-50"
        >
          <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 transition-all duration-500">
            <div className="flex items-center justify-center min-h-screen">
              <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Create New Leave</h3>
                    <button
                      onClick={handleCloseCreateModal}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <form onSubmit={handleCreateSubmit}>
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="selectedLeaveId" className="block text-sm font-medium text-gray-700 dark:text-white">
                            Leave Type
                          </label>
                          <select
                            id="selectedLeaveId"
                            value={createFormData.selectedLeaveId}
                            onChange={handleLeaveChange}
                            className="form-select mt-1 block w-full"
                          >
                            <option value="">Select Leave Type</option>
                            {leavemaster.map((leave) => (
                              <option key={leave.id} value={leave.id}>
                                {leave.leaveName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="totalDays" className="block text-sm font-medium text-gray-700 dark:text-white">
                            Total Days
                          </label>
                          <input
                            id="totalDays"
                            type="number"
                            value={createFormData.totalDays}
                            readOnly
                            className="form-input mt-1 block w-full"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-white">
                            Start Date
                          </label>
                          <DatePicker
                            id="startDate"
                            selected={createFormData.startDate}
                            onChange={(date) => setCreateFormData({ ...createFormData, startDate: date })}
                            filterDate={isWeekdayAndNotHoliday}
                            className="form-input mt-1 block w-full"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-white">
                            End Date
                          </label>
                          <DatePicker
                            id="endDate"
                            selected={createFormData.endDate}
                            onChange={(date) => setCreateFormData({ ...createFormData, endDate: date })}
                            filterDate={isWeekdayAndNotHoliday}
                            className="form-input mt-1 block w-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                      <button type="submit" className="btn bg-primary hover:bg-darkblue text-white">
                        Create Leave
                      </button>
                      <button
                        onClick={handleCloseCreateModal}
                        type="button"
                        className="btn bg-gray-500 hover:bg-gray-700 text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
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
