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

export const Getsinglerole = async (id) => {
  console.log("getid", id);
  try {
    const response = await axios.get(
      `https://samplerouting.findinternship.in/api/Role/GetRoleById/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updaterolemaster = async (formData) => {
  try {
    console.log(formData);
    var Id = formData.roleId;
    let UpdatedBy = localStorage.getItem("id");
    const { roleId, rolename, status } = formData;
    const response = await axios.post(
      "https://samplerouting.findinternship.in/api/Role/UpdateRoleMaster",
      { Id, rolename, status, UpdatedBy }
    );

    if (response.status >= 200) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {}
};

export const Getsingleproject = async (id) => {
  console.log("getid", id);
  try {
    const response = await axios.get(
      `https://localhost:7060/api/Project/GetProjectById/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetsingleBug = async (id) => {
  console.log("getid", id);
  try {
    const response = await axios.get(
      `https://samplerouting.findinternship.in/api/Bug/GetBugById/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const updatecomponentmaster = async (formData) => {
  try {
    console.log(formData);
    var Id = formData.componentId;
    let UpdatedBy = localStorage.getItem("id");
    var projectids = formData.projectids;
    var name = formData.componentName;
    const { status } = formData;
    const response = await axios.post(
      "https://samplerouting.findinternship.in/api/Components/UpdateComponent",
      { Id, projectids, name, status, UpdatedBy }
    );

    if (response.status >= 200) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {}
};
export const GetsingleComponent = async (id) => {
  console.log("getid", id);
  try {
    const response = await axios.get(
      `https://samplerouting.findinternship.in/api/Components/GetComponentById/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateBugmaster = async (formData) => {
  try {
    console.log(formData);
    var Id = formData.bugId;
    let UpdatedBy = localStorage.getItem("id");
    const { bugType1, status } = formData;
    const response = await axios.post(
      "https://samplerouting.findinternship.in/api/Bug/UpdateBugtype",
      { Id, bugType1, status, UpdatedBy }
    );

    if (response.status >= 200) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {}
};

export const updateprojectmaster = async (formData) => {
  try {
    console.log(formData);
    var Id = formData.projectId;
    let UpdatedBy = localStorage.getItem("id");
    const { projectname, status } = formData;
    const response = await axios.post(
      "https://localhost:7060/api/Project/Updateproject",
      { Id, projectname, status, UpdatedBy }
    );

    if (response.status >= 200) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {}
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

export const getallprojectlist = async () => {
  try {
    // Simulate a 3-second delay
    const response = await axios.get(
      `https://samplerouting.findinternship.in/api/Project/GetallProject`
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
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

//Create new Component Master
export const createcomponent = async (values) => {
  try {
    console.log("values", values);

    const userid = localStorage.getItem("id");
    const name = values.componentName;
    const { status } = values;
    var projectids = values.projectIds;
    const response = await axios.post(
      "https://localhost:7060/api/Components/CreatenewComponent",
      { projectids, name, status, userid }
    );

    if (response.status >= 200) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {}
};
