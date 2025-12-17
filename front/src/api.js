import axios from "axios";

const api = axios.create({
  baseURL: "https://gmach-project1.onrender.com",
});

// מוסיף אוטומטית את הטוקן לכל בקשה
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// מטפל בשגיאות - אם הטוקן לא תקין, מוחק אותו ומעביר ללוגין
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // טוקן לא תקין או פג תוקף
      localStorage.removeItem("token");
      // רק אם אנחנו לא כבר בדף לוגין
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
