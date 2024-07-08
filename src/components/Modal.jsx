import React, { useEffect, useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { GetComponentbyproject, getallprojectlist } from "../Utils/action";

const Modal = ({ isOpen, onClose }) => {
  const [projects, setProjects] = useState([]);
  const [components, setComponents] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedComponent, setSelectedComponent] = useState("");
  const [priority, setPriority] = useState("");
  const [bugTitle, setBugTitle] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const priorities = [
    { label: "Low", value: 1 },
    { label: "Medium", value: 2 },
    { label: "High", value: 3 },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getallprojectlist();
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectChange = async (e) => {
    const projectId = e.target.value;
    setSelectedProject(projectId);

    try {
      const response = await GetComponentbyproject(projectId);
      setComponents(response.data);
    } catch (error) {
      console.error("Failed to fetch components", error);
    }
  };

  const handleComponentChange = (e) => {
    setSelectedComponent(e.target.value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validExtensions = ["png", "jpg", "jpeg"];
    const invalidFiles = files.filter((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      return !validExtensions.includes(fileExtension);
    });

    if (invalidFiles.length > 0) {
      alert("Only .png, .jpg, and .jpeg formats are allowed.");
      fileInputRef.current.value = ""; // Clear the file input
      return;
    }

    if (files.length > 2) {
      alert("You can only upload up to 2 files.");
      fileInputRef.current.value = ""; // Clear the file input
      return;
    }

    setSelectedFiles(files);
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);

    // Clear the file input if all files are removed
    if (newFiles.length === 0) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      selectedProject,
      selectedComponent,
      priority,
      bugTitle,
      bugDescription,
      selectedFiles,
    };
  };

  const handleClose = () => {
    setSelectedProject("");
    setSelectedComponent("");
    setPriority("");
    setBugTitle("");
    setBugDescription("");
    setSelectedFiles([]);
    fileInputRef.current.value = "";
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        !isOpen ? "hidden" : ""
      }`}
    >
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold">Create New Bug</h3>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 dark:text-white"
            onClick={handleClose}
            aria-label="Close Modal"
          >
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-2">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <select
                  className="mt-1 block flex-1 text-xs rounded-md border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-500 focus:ring-opacity-15"
                  value={selectedProject}
                  onChange={handleProjectChange}
                  required
                >
                  <option className="text-xs" value="">
                    Select a project
                  </option>
                  {projects.map((project) => (
                    <option
                      className="text-xs"
                      key={project.id}
                      value={project.id}
                    >
                      {project.projectName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Component Name <span className="text-red-500">*</span>
                </label>
                <select
                  className="mt-1 w-48 text-xs block flex-1 rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring focus:ring-lime-500 focus:ring-opacity-15"
                  value={selectedComponent}
                  onChange={handleComponentChange}
                  required
                >
                  <option className="text-xs" value="">
                    Select a component
                  </option>
                  {components.map((component) => (
                    <option
                      className="text-xs"
                      key={component.id}
                      value={component.id}
                    >
                      {component.componentName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                className="mt-1 text-xs block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring focus:ring-lime-500 focus:ring-opacity-15"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option className="text-xs" value="">
                  Select a priority
                </option>
                {priorities.map((priority) => (
                  <option
                    className="text-xs"
                    key={priority.value}
                    value={priority.value}
                  >
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Bug Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                maxLength="150"
                className="mt-1 text-xs block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring focus:ring-lime-500 focus:ring-opacity-15"
                value={bugTitle}
                onChange={(e) => setBugTitle(e.target.value)}
                required
              />
            </div>
            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Bug Description <span className="text-red-500">*</span>
              </label>
              <textarea
                className="mt-1 text-xs block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring focus:ring-lime-500 focus:ring-opacity-15"
                rows="4"
                value={bugDescription}
                onChange={(e) => setBugDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Attach File (Max 2)
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-lime-50 file:text-lime-700 hover:file:bg-lime-100"
                ref={fileInputRef}
              />
              <ul className="mt-2 space-y-2">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 text-xs hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                className="py-2 px-4 text-xs bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 text-xs px-4 bg-lime-500 text-white rounded-lg hover:bg-lime-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
