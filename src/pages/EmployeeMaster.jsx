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
import { useEffect, useState } from "react";
import DownloadBtn from "../Utils/DownloadBtn";
import DebouncedInput from "../Utils/DebouncedInput";
import { SearchIcon } from "../Utils/Icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  Getsingleprofile,
  UpdatesingleUser,
  GetMasterRole,
} from "../Utils/action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const EmployeeMaster = () => {
  const navigate = useNavigate();
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "ID",
    }),
    columnHelper.accessor("fullName", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "FullName",
    }),
    columnHelper.accessor("isActive", {
      cell: (info) => (
        <span>
          {info.getValue() ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              Active
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
              Not Active
            </span>
          )}
        </span>
      ),
      header: "Status",
    }),
    columnHelper.accessor("phonenumber", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "phone Number",
    }),
    columnHelper.accessor("email", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Email Address",
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => (
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
        </div>
      ),
    }),
  ];

  const handleViewProfile = (id) => {
    navigate(`/viewemployee/${id}`); // Navigate to the employee detail page with the employee ID
  };

  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://samplerouting.findinternship.in/api/Profile/GetallProfile`
      );
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

  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",

    phonenumber: "",
    status: false,
    dob: new Date(),
    rolename: "",
  });

  const handleOpenModal = (modalId, employeeId) => {
    setOpenModal(modalId);
    setEmployeeId(employeeId);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
    setEmployeeId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedRole = roles.find(
      (role) => role.roleName === formData.rolename
    );

    const roleId = selectedRole.roleId;
    const response = await UpdatesingleUser({ ...formData, roleId });

    if (response === "Profile Updated") {
      handleCloseModal();
      setMessage("Profile Updated");
      fetchData();
      setTimeout(() => {
        setMessage(""); // Hide error after 3 seconds
      }, 3000);
    }
  };
  useEffect(() => {
    if (openModal && employeeId) {
      async function fetchData() {
        try {
          const result = await Getsingleprofile(employeeId);
          const getmasterlist = await GetMasterRole();

          setRoles(getmasterlist.data);
          if (result.data && result.data.length > 0) {
            // setEmployee(result.data[0]);
            setFormData({
              employeeId: employeeId,
              name: result.data[0].fullname,
              email: result.data[0].email,
              phonenumber: result.data[0].phonenumber,
              status: result.data[0].isActive,
              dob: new Date(result.data[0].dob),
              rolename: result.data[0].rolename,
            }); // Update state with the first object in result.data
          }
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      }

      fetchData();
    }
  }, [openModal, employeeId]);

  const handleView = (row) => {
    // Add your view logic here
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
              defaultValue={table.getState().pagination.pageIndex + 1}
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
          <div className="bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70 max-w-sm w-full m-3 sm:mx-auto transition-opacity duration-500 opacity-100">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
              <h3 className="font-bold text-gray-800 dark:text-white">
                Edit {formData.name}'s Details
              </h3>
              <button
                type="button"
                className="flex justify-center items-center h-7 w-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                onClick={handleCloseModal}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 h-4 w-4"
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
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="id"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Employee Id: {formData.employeeId}
                  </label>

                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phonenumber"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    id="phonenumber"
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phonenumber: e.target.value })
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Date of Birth
                  </label>
                  <DatePicker
                    id="dob"
                    selected={formData.dob}
                    onChange={(date) => setFormData({ ...formData, dob: date })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                    dateFormat="dd-MM-yyyy"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Role
                  </label>
                  <select
                    value={formData.rolename}
                    onChange={(e) =>
                      setFormData({ ...formData, rolename: e.target.value })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {roles.map((role) => (
                      <option key={role.roleId} value={role.roleName}>
                        {role.roleName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Status
                  </label>

                  <select
                    id="status"
                    name="status"
                    className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value === "true",
                      })
                    }
                  >
                    <option value="true" className="text-sm">
                      Active
                    </option>
                    <option value="false" className="text-sm">
                      Not Active
                    </option>
                  </select>
                </div>
                <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeMaster;
