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

  return (
    <>
      <h1>Welcome to Notification</h1>
    </>
  );
};

export default MultiSelect;
