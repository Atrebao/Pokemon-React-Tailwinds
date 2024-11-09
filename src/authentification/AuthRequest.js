import axios from "axios";


const BASE_URL = "https://dummyjson.com/auth";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers.Authorization = null;
  }

  return config;
});

export const login = async (username, password) => {
  return await axios.post(
    `${BASE_URL}/login`,
    {
      username,
      password,
      expiresInMins: 30, // facultatif, par défaut à 60
    },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Inclut les cookies dans la requête (ex. : accessToken)
    }
  );
};
