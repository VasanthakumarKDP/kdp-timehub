import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaSearch, FaRegEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import {
  GetsingleComponent,
  createcomponent,
  getallprojectlist,
  updatecomponentmaster,
} from "../Utils/action";
import Select from "react-select";
import Header from "../components/Header";

const ComponentMaster = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(null);
  const [componentId, setComponentId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [formData, setFormData] = useState({
    componentId: "",
    componentName: "",
    status: false,
    projectIds: [],
  });
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    componentName: "",
    status: false,
    projectIds: [],
  });
  const [createSelectedProjects, setCreateSelectedProjects] = useState([]);

  const pageSize = 5; // Set your desired page size here
  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    setCreateFormData({
      componentName: "",
      status: true,
      projectIds: [],
    });
    setCreateSelectedProjects([]);
  };
  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    const newComponentData = {
      ...createFormData,
      projectIds: createFormData.projectIds.toString(),
    };
  
    const result = await createcomponent(newComponentData);
      if (result === "Created") {
      handleCloseCreateModal();
      fetchData();
      setMessage("New Component Created");
      setTimeout(() => setMessage(""), 3000);
    }
  };
  const handleOpenModal = (modalId, componentId) => {

    setOpenModal(modalId);
    setComponentId(componentId);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
    setComponentId(null);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    var projectids = formData.projectIds.toString();
    const updatedformdata = {
      ...formData,
      projectids,
    };

    const response = await updatecomponentmaster(updatedformdata);
 
    if (response === -1) {
      handleCloseModal();
      fetchData();
      setMessage("Component Master Updated");

      setTimeout(() => {
        setMessage(""); // Hide error after 3 seconds
      }, 3000);
    }
  };

  const handleChange = (selected) => {
    setSelectedProjects(selected);
    setFormData({ ...formData, projectIds: selected.map((s) => s.value) });
  };

  useEffect(() => {
    if (openModal && componentId) {
      async function fetchData() {
        try {
          const result = await GetsingleComponent(componentId);

          const projectresult = await getallprojectlist();
          setProjects(projectresult.data);
          const projectIdsArray = result.data.projectId
            .split(",")
            .map((id) => parseInt(id, 10));
          if (result.data.length != 0) {
            // setEmployee(result.data[0]);
            setFormData({
              componentId: result.data.id,

              status: result.data.isActive,

              componentName: result.data.componentName,
              projectIds: result.data.projectId,
            });
            // Preselect the projects in the dropdown

            const projectresult = await getallprojectlist();
            // Preselect the projects in the dropdown
            setSelectedProjects(
              projectIdsArray.map((id) => ({
                value: id,
                label:
                  projectresult.data.find((project) => project.id === id)
                    ?.projectName || id,
              }))
            );
            // setProjects(projectresult.data);
            // Update state with the first object in result.data
          }
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      }

      fetchData();
    }
  }, [openModal, componentId]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getallprojectlist();
        setProjects(projects.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://samplerouting.findinternship.in/api/Components?pageNumber=${currentPage}&pageSize=${pageSize}`
      );
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setData(response.data.data); // Assuming the actual data is in the 'data' field
      setTotalPages(response.data.totalPages); // Adjust according to actual API response structure
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const filteredData = data.filter((item) =>
    item.componentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      {message && (
        <div
          id="toast-top-right"
          className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-black bg-lime-400 divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
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
              <h3 className="font-bold">Create New Component</h3>
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
                  <label className="block text-sm font-medium">
                    Component Name
                  </label>
                  <input
                    type="text"
                    value={createFormData.componentName}
                    onChange={(e) =>
                      setCreateFormData({
                        ...createFormData,
                        componentName: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">
                    Assign Project
                  </label>
                  <Select
                    isMulti
                    options={projects.map((project) => ({
                      value: project.id,
                      label: project.projectName,
                    }))}
                    value={createSelectedProjects}
                    onChange={(selected) => {
                      setCreateSelectedProjects(selected);
                      setCreateFormData({
                        ...createFormData,
                        projectIds: selected.map((s) => s.value),
                      });
                    }}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Status</label>
                  <select
                    value={createFormData.status}
                    onChange={(e) =>
                      setCreateFormData({
                        ...createFormData,
                        status: e.target.value === "true",
                      })
                    }
                    className="w-full px-3 py-2 mt-1 border rounded-md"
                  >
                    <option value="true">Active</option>
                    <option value="false">Not Active</option>
                  </select>
                </div>
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

      <div className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
        Component Master
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-1 col-end-3 ...">
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            Create New
            <IoMdAdd />
          </button>
        </div>
        <div className="col-end-7 col-span-2 ...">
          <div className="max-w-sm space-y-3">
            <div className="relative">
              <input
                type="search"
                className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600"
                placeholder="Component Name"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <FaSearch />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full"></div>
      <section className="relative py-10 bg-blueGray-50 shadow-lg">
        <div className=" w-full mb-12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-800 text-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-lg text-white">
                    List of Components
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              {loading ? (
                <div className="min-h-60 flex flex-col bg-slate-500 border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                  <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                    <div className="flex justify-center">
                      <div
                        className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full dark:text-white"
                        role="status"
                        aria-label="loading"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-700 text-slate-300 border-slate-700">
                        Component ID
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-700 text-slate-300 border-slate-700">
                        Component Name
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-700 text-slate-300 border-slate-700">
                        Status
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-700 text-slate-300 border-slate-700"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((component) => (
                        <tr key={component.id}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                            <span className="p-4 font-bold text-white">
                              {component.id}
                            </span>
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {component.componentName}
                          </td>

                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {component.isActive ? "Active" : "Not Active"}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                            <div className="flex gap-4">
                              {/* <button
                                type="button"
                                className="flex flex-shrink-0 justify-center items-center gap-2 size-[38px] text-sm font-semibold rounded-lg border border-transparent bg-slate-600 text-white hover:bg-lime-500 disabled:opacity-50 disabled:pointer-events-none"
                              >
                                <FaEye />
                              </button> */}
                              <button
                                type="button"
                                onClick={() =>
                                  handleOpenModal(
                                    "hs-small-modal",
                                    component.id
                                  )
                                }
                                className="flex flex-shrink-0 justify-center items-center gap-2 size-[38px] text-sm font-semibold rounded-lg border border-transparent bg-slate-600 text-white hover:bg-lime-500 disabled:opacity-50 disabled:pointer-events-none"
                              >
                                <FaRegEdit />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                        >
                          No Component found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <nav className="flex items-center gap-x-1">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
              disabled={currentPage === 1}
            >
              <svg
                className="flex-shrink-0 size-3.5"
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
                <path d="m15 18-6-6 6-6"></path>
              </svg>
              <span aria-hidden="true" className="sr-only">
                Previous
              </span>
            </button>
            <div className="flex items-center gap-x-1">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handlePageChange(index + 1)}
                  className={`min-h-[38px] min-w-[38px] flex justify-center items-center border ${
                    currentPage === index + 1
                      ? "border-gray-200 bg-lime-500"
                      : "border-transparent text-gray-800 hover:bg-gray-100"
                  } py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:focus:bg-white/10`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
              disabled={currentPage === totalPages}
            >
              <span aria-hidden="true" className="sr-only">
                Next
              </span>
              <svg
                className="flex-shrink-0 size-3.5"
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
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </nav>
        </div>
      </section>
      {openModal === "hs-small-modal" && (
        <div
          id="hs-small-modal"
          className="hs-overlay fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70 max-w-sm w-full m-3 sm:mx-auto transition-opacity duration-500 opacity-100">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
              <h3 className="font-bold text-gray-800 dark:text-white">
                Edit Component
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
                <div className="mb-5">
                  <label
                    htmlFor="id"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Component Id: {formData.componentId}
                  </label>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phonenumber"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Component Name
                  </label>
                  <input
                    type="text"
                    id="rolename"
                    name="rolename"
                    value={formData.componentName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        componentName: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Assign Project
                  </label>
                  <Select
                    isMulti
                    options={projects.map((project) => ({
                      value: project.id,
                      label: project.projectName,
                    }))}
                    value={selectedProjects}
                    onChange={handleChange}
                    required
                  />
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

export default ComponentMaster;
