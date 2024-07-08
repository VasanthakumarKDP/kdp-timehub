import React from "react";
import { useParams } from "react-router-dom";

const ViewBug = () => {
  const { bID } = useParams();

  return (
    <>
      <h1>Bug / {bID}</h1>
      <h1>View Bug</h1>
    </>
  );
};
export default ViewBug;
