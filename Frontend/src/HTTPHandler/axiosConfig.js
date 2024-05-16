import axios from "axios";

const axiosInstance = axios.create({
  // ! OUR CREATED URL
  // baseURL: process.env.REACT_APP_BASEURL,
  // baseURL: "http://localhost:4023/",
  baseURL: process.env.REACT_APP_BASEURL,
  // baseURL: "http://192.168.0.147/",

  // baseURL: "https://192.168.29.228/",

  //! Render URL
  // baseURL: "https://attendance-app-q1zg.onrender.com",
  // ! NGROK URL
  // baseURL: "https://striking-mongoose-logical.ngrok-free.app",
  // ! DEV TUNEELS FROM VSCODE URL
  // baseURL: "https://3x3kc5nk-4023.inc1.devtunnels.ms/",
});

export default axiosInstance;

axiosInstance.interceptors.request.use(
  (request) => {
    const jtoken = localStorage.getItem("Token")
      ? localStorage.getItem("Token")
      : null;
    if (jtoken) {
      // console.log(jtoken);
      request.headers.Authorization = `Bearer ${jtoken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);
