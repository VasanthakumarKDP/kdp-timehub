import React from "react";
import { useParams } from "react-router-dom";

const CreateNewBug = () => {
  const { bID } = useParams();

  return (
    <>
      <h1>Bug / {bID}</h1>
      <h1>Create New Bug</h1>
    </>
  );
};

export default CreateNewBug;
