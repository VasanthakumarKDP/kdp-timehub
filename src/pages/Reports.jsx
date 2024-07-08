import React, { useState, useEffect } from "react";
import Select from "react-select";

const MultiSelect = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7060/api/Project/GetallProject")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data from the API is an array of objects
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once, after initial render

  const handleChange = (selected) => {
    setSelectedProjects(selected);
  };

  const parameterValue = "9497";
  const urlWithParams = `https://kdpreporttesting.azurewebsites.net/mpreport?empid=${parameterValue}`;

  return (
    <>
      <h1>Welcome to Notification</h1>
      <iframe
        src={urlWithParams}
        style={{ width: "100%", height: "100" }}
        className="iframe-no-scroll"
        allowFullScreen
      ></iframe>
    </>
  );
};

export default MultiSelect;
