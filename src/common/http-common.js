import axios from "axios";
const http = axios.create({
  baseURL:
    window.location.protocol + "//" + window.location.hostname + ":" + 12707,
  headers: {
    "Content-type": "application/json",
  },
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("httpError", error.code);
    return Promise.reject(error);
  }
);

export default http;
