import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 5000,
});

api.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken(true);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => Promise.reject(error));

export default api;

