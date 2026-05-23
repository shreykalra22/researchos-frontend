// import axios from "axios";

// export const apiClient = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/v1",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 120000,
// });
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;