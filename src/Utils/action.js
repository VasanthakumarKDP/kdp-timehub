import axios from "axios";

export const login = async (info) => {
  const { email, password } = info;
  try {
    const response = await axios.post(
      "https://samplerouting.findinternship.in/api/Authentication/PostLoginDetails",
      { email, password }
    );

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
  try {
    const response = await axios.get(
      `https://samplerouting.findinternship.in/api/Project/GetProjectById/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetsingleBug = async (id) => {
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
  try {
    const response = await axios.get(
      `https://samplerouting.findinternship.in/api/Components/GetComponentById/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetComponentbyproject = async (id) => {
  try {
    const response = await axios.get(
      `https://samplerouting.findinternship.in/api/Bug/GetComponentByProjectId/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const Getactivebug = async () => {
  try {
    const response = await axios.get(
      `https://samplerouting.findinternship.in/api/Bug/GetActiveBug`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateBugmaster = async (formData) => {
  try {
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
    var Id = formData.projectId;
    let UpdatedBy = localStorage.getItem("id");
    const { projectname, status } = formData;
    const response = await axios.post(
      "https://samplerouting.findinternship.in/api/Project/Updateproject",
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

export const getallholidaylist = async () => {
  try {
    // Simulate a 3-second delay
    const response = await axios.get(
      `https://samplerouting.findinternship.in/api/Leave/Getallholiday`
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getallleavemaster = async () => {
  try {
    // Simulate a 3-second delay
    const response = await axios.get(
      `https://samplerouting.findinternship.in/api/Leave/GetAllLeaveMaster`
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const UpdatesingleUser = async (formData) => {
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
    const userid = localStorage.getItem("id");
    const name = values.componentName;
    const { status } = values;
    var projectids = values.projectIds;
    const response = await axios.post(
      "https://samplerouting.findinternship.in/api/Components/CreatenewComponent",
      { projectids, name, status, userid }
    );

    if (response.status >= 200) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {}
};

export const createleave = async (values) => {
  try {
    const createdby = localStorage.getItem("id");
    const leavemaster = values.leaveName;
    const { status } = values;
    const response = await axios.post(
      "https://samplerouting.findinternship.in/api/Leave/CreateLeaveMaster",
      { leavemaster, status, createdby }
    );

    if (response.status >= 200) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {}
};

export const updateleavemaster = async (formData) => {
  try {
    var Id = formData.leaveId;
    let UpdatedBy = localStorage.getItem("id");
    var leavemaster = formData.leaveName;
    const { status } = formData;
    const response = await axios.post(
      "https://samplerouting.findinternship.in/api/Leave/UpdateLeaveMaster",
      { Id, leavemaster, status, UpdatedBy }
    );
    if (response.status >= 200) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {}
};

export const GetsingleLeaveMaster = async (id) => {
  try {
    const response = await axios.get(
      `https://samplerouting.findinternship.in/api/Leave/GetLeaveById/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetsingleLeaveAllocate = async (id) => {
  try {
    const response = await axios.get(
      `https://samplerouting.findinternship.in/api/Leave/GetLeaveallocateById/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateleaveallocation = async (formData) => {
  try {
    var Id = formData.PId;
    var leavemaster = "string";
    var fullname = "string";
    var status = true;
    var createdby = 0;
    const noofdays = String(0);
    const planned = formData.planned;
    const unplanned = formData.unplanned;
    const selfmarraige = formData.selfmarraige;
    const sbimarriage = formData.sbimarriage;
    const bereavement = formData.bereavement;
    let UpdatedBy = localStorage.getItem("id");
    const response = await axios.post(
      "https://samplerouting.findinternship.in/api/Leave/UpdateLeaveAllocate",
      {
        Id,
        leavemaster,
        fullname,
        planned,
        noofdays,
        unplanned,
        selfmarraige,
        sbimarriage,
        bereavement,
        UpdatedBy,
      }
    );
    if (response.status >= 200) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createnewleavereq = async (values) => {
  try {
    const leaveId = values.selectedLeaveId;
    const startdate = values.startDate;
    const enddate = values.endDate;
    const noofdays = String(values.totalDays);

    var leavemaster = "string";
    var fullname = "string";
    const createdby = localStorage.getItem("id");
    const profileid = localStorage.getItem("id");
    const response = await axios.post(
      "https://samplerouting.findinternship.in/api/Leave/CreateNewLeave",
      {
        leaveId,
        leavemaster,
        fullname,
        profileid,
        startdate,
        enddate,
        noofdays,
        createdby,
      }
    );

    if (response.status >= 200) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {}
};

export const deleteleavereq = async (values) => {
  try {
    const leaveid = values;
    const UpdatedBy = localStorage.getItem("id");
    var leavemaster = "string";
    var fullname = "string";
    const startdate = new Date();
    const enddate = new Date();
    const noofdays = "string";
    const response = await axios.post(
      "https://samplerouting.findinternship.in/api/Leave/DeleteLeaveRequest",
      {
        leaveid,
        leavemaster,
        fullname,
        startdate,
        enddate,
        noofdays,
        UpdatedBy,
      }
    );

    if (response.status >= 200) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {}
};
