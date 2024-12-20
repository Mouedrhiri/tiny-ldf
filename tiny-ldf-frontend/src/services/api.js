import axios from "axios";

const AUTH_API_URL = "https://tiny-ldf-backend.uc.r.appspot.com/api/auth";
const API_BASE_URL = "https://tiny-ldf-backend.uc.r.appspot.com/api/ldf";

// Function to log in and retrieve the JWT token
export const login = async (username, password) => {
  try {
    console.log("Attempting to log in...");
    const response = await axios.post(`${AUTH_API_URL}/login`, {
      username,
      password,
    });

    const token = response.data.token;

    if (token) {
      console.log("JWT Token received:", token);
      localStorage.setItem("token", token); // Save the token in localStorage
      console.log("Token saved to localStorage successfully.");
      return token;
    } else {
      throw new Error("No token received from backend.");
    }
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw new Error("Login failed. Check credentials.");
  }
};

// Axios instance for backend API calls
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to get the JWT token from localStorage
const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

// Function to ensure the token exists, else login and get a new one
// const ensureAuthToken = async () => {
//   let token = getAuthToken();

//   if (!token) {
//     console.warn("No token found. Attempting to log in...");

//     // Perform login automatically (hardcoding credentials for this example)
//     const username = "admin"; // Replace with dynamic credentials if needed
//     const password = "password";
//     token = await login(username, password);
//   }

//   return token;
// };
const ensureAuthToken = async () => {
  let token = getAuthToken();

  if (!token) {
    console.warn("No token found. Please log in.");
    throw new Error("Unauthorized: Please log in.");
  }

  // Optional: Add logic to check token expiration and refresh
  return token;
};

// Function to insert a Quad
export const insertQuad = async (quad) => {
  try {
    // Ensure a valid token exists
    const token = await ensureAuthToken();
    console.log("Sending request to insert Quad with token:", token);

    // Perform the insert request
    const response = await api.post("/insert", quad, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Insert successful:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Insert failed:",
      error.response?.data || error.message || "Unknown error"
    );
    throw new Error("Failed to insert Quad. Please check server logs.");
  }
};

export const queryQuads = async (queryParams, page = 0, size = 10) => {
  const token = await ensureAuthToken();
  if (!token) {
    throw new Error("Unauthorized: No token found. Please log in first.");
  }

  try {
    console.log("Sending query request with token:", token);

    // Build dynamic query parameters
    const params = new URLSearchParams({ ...queryParams, page, size });

    const response = await api.get(`/query?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add JWT token in header
      },
    });

    console.log("Query successful:", response.data);
    return response.data; // Return data directly
  } catch (error) {
    const errorMessage =
      error.response?.data || error.message || "Unknown error";
    console.error("Query failed:", errorMessage);
    throw new Error(`Failed to query Quads: ${errorMessage}`);
  }
};

// Assign the object to a variable before exporting
const apiService = {
  login,
  insertQuad,
  queryQuads,
};

export default apiService;
