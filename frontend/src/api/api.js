import axios from "axios";

const api = axios.create({
  baseURL: "https://careercompassai-tupf.onrender.com",
});

export default api;