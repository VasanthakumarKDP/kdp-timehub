import axios from "axios";

export const login = async (info) => {
  console.log("values", info);
  const { email, password } = info;
  try {
    const response = await axios.post(
      "https://samplerouting.findinternship.in/api/Authentication/PostLoginDetails",
      { email, password }
    );

    console.log({ response });
    if (response.data === "Invalid Credentials") {
      return response.data;
    } else {
      const token = response.data.token;
      const name = response.data.name;
      const roleid = response.data.roleId;
      const userid = response.data.id;
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("roleid", roleid);
      localStorage.setItem("id", userid);
      return response;
    }
  } catch (error) {}
};

export const Getsingleprofile = async (id) => {
  console.log("getid", id);
  try {
    const response = await axios.get(
      `https://samplerouting.findinternship.in/api/Profile/GetSingleProfile?id=${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetMasterRole = async () => {
  try {
    const response = await axios.get(
      `https://samplerouting.findinternship.in/api/Role/GetAllRole`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdatesingleUser = async (formData) => {
  console.log("newformdata", formData);

  try {
    var Username = formData.name;
    const isactive = formData.status;
    var ID = formData.employeeId;
    let UpdatedBy = localStorage.getItem("id");
    const { email, phonenumber, dob, roleId } = formData;
    const response = await axios.post(
      "https://samplerouting.findinternship.in/api/Profile/UpdateSingleuser",
      { ID, Username, UpdatedBy, email, phonenumber, isactive, dob, roleId }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
