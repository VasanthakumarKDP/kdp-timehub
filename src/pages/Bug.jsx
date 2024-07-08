// Bug.js
import React, { useState } from "react";
import { FaEye, FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import Modal from "../components/Modal"; // Make sure to import the Modal component
import Header from "../components/Header";

const Bug = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:mr-6 after:flex-1 after:border-t after:border-gray-200 after:ml-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
        Bug
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-1 col-end-3">
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            onClick={handleOpenModal}
          >
            Create New
            <IoMdAdd />
          </button>
        </div>
        <div className="col-end-7 col-span-2">
          <div className="max-w-sm space-y-3">
            <div className="relative">
              <input
                type="search"
                className="peer py-3 pr-0 pl-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600"
                placeholder="Enter Bug Id / Project Name"
                aria-label="Search for Bug ID or Project Name"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <FaSearch />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="relative py-10 bg-blueGray-50 shadow-lg">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-800 text-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-lg text-white">
                    Bugs Status
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    {[
                      "Bug ID",
                      "Bug Type",
                      "Project Name",
                      "Status",
                      "Created By",
                      "Assigned To",
                      "",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-700 text-slate-300 border-slate-700"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "BUG001",
                      type: "New",
                      project: "OAT",
                      status: "Pending",
                      createdBy: "Satheeshkumar",
                      assignedTo: "Balaji Saravanan",
                      statusColor: "orange-500",
                    },
                    {
                      id: "BUG002",
                      type: "New",
                      project: "Paropakari",
                      status: "Not Assigned",
                      createdBy: "Satheeshkumar",
                      assignedTo: "Balaji Saravanan",
                      statusColor: "emerald-500",
                    },
                    {
                      id: "BUG003",
                      type: "Reopen",
                      project: "Paropakari",
                      status: "Closed",
                      createdBy: "Satheeshkumar",
                      assignedTo: "Palaniselvi",
                      statusColor: "orange-500",
                    },
                    {
                      id: "BUG004",
                      type: "Reopen",
                      project: "KCS",
                      status: "Open",
                      createdBy: "Raguraman",
                      assignedTo: "DhineshBabu",
                      statusColor: "teal-500",
                    },
                    {
                      id: "BUG005",
                      type: "New",
                      project: "KCS",
                      status: "Closed",
                      createdBy: "Raguraman",
                      assignedTo: "Palaniselvi",
                      statusColor: "emerald-500",
                    },
                  ].map((bug) => (
                    <tr key={bug.id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        <span className="p-4 font-bold text-white">
                          {bug.id}
                        </span>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {bug.type}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i
                          className={`fas fa-circle text-${bug.statusColor} mr-2`}
                        ></i>
                        {bug.project}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i
                          className={`fas fa-circle text-${bug.statusColor} mr-2`}
                        ></i>
                        {bug.status}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">{bug.createdBy}</span>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">{bug.assignedTo}</span>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <div className="flex gap-4">
                          <button
                            type="button"
                            className="flex flex-shrink-0 justify-center items-center gap-2 size-[38px] text-sm font-semibold rounded-lg border border-transparent bg-slate-600 text-white hover:bg-lime-500 disabled:opacity-50 disabled:pointer-events-none"
                            aria-label={`View details for ${bug.id}`}
                          >
                            <FaEye />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Bug;
