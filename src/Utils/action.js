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
