import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Authpage from "./components/Authpage";
// import HomePage from "./components/HomePage";
import Openai from "./components/Openai";
import axios from "axios";

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchEmail = async () => {
      if (authToken) {
        try {
          const response = await axios.get(
            `https://open-ai-backend-0kof.onrender.com/api/auth/loginusername/${authToken}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          setEmail(response.data.email);
        } catch (error) {
          console.error("Failed to fetch email:", error);
        }
      }
    };

    fetchEmail();
  }, [authToken]);

  return (
    <Router>
      <Navbar
        authToken={authToken}
        setAuthToken={setAuthToken}
        email={email}
        setEmail={setEmail}
      />
      <Routes>
        <Route path="/" element={<Openai />} />
        <Route
          path="/login"
          element={
            <Authpage
              isLogin={true}
              setAuthToken={setAuthToken}
              setEmail={setEmail}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Authpage
              isLogin={false}
              setAuthToken={setAuthToken}
              setEmail={setEmail}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
