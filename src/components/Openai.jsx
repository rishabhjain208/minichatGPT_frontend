import React, { useEffect, useState } from "react";
import { LuArrowUpCircle } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideQuestion from "./SideQuestion";
import "./style.css";
const Openai = () => {
  const [input, setInput] = useState(""); // State for the input box
  const [userId, setUserId] = useState(null);
  const [qaList, setQaList] = useState([]); // State for storing questions and answers
  const [selectedQuestion, setSelectedQuestion] = useState(null); // State for storing selected question details
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    } else {
      const fetchUserId = async () => {
        try {
          const response = await axios.get(
            "https://open-ai-backend-0kof.onrender.com/api/users/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUserId(response.data.userId); // Set only the user ID
          console.log(response.data.userId); // For debugging
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      };
      fetchUserId();
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login"); // Redirect to login if no token found
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (input.trim() === "") return; // Do not submit if input is empty

    setLoading(true); // Start loading

    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        "http://localhost:4000/api/questions/",
        { question: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newEntry = response.data.saved_Ques;
      console.log(newEntry.answer); // Log the answer to the console

      setQaList([newEntry, ...qaList]); // Add new Q&A to the top of the list
      setInput(""); // Clear the input box after submission
    } catch (error) {
      console.error("Error submitting question:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleQuestionSelect = async (questionId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `http://localhost:4000/api/questions/${questionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSelectedQuestion(response.data.question); // Set the selected question details
    } catch (error) {
      console.error("Error fetching question details:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#212121] p-4">
      {userId && (
        <SideQuestion userId={userId} onQuestionSelect={handleQuestionSelect} />
      )}
      <div className="w-full max-w-2xl">
        {qaList.map((qa, index) => (
          <div
            key={index}
            className="bg-white p-4 mb-4 rounded-lg shadow-lg transition-all hover:shadow-xl"
          >
            <p className="text-gray-900 font-semibold mb-2">Q: {qa.question}</p>
            <p className="text-gray-600">A: {qa.answer}</p>
          </div>
        ))}

        {/* Display the details of the selected question */}
        {selectedQuestion && (
          <div className="bg-white p-4 mb-4 rounded-lg shadow-lg transition-all">
            <p className="text-gray-900 font-semibold mb-2">
              Q: {selectedQuestion.question}
            </p>
            <p className="text-gray-600">A: {selectedQuestion.answer}</p>
          </div>
        )}

        {/* Display a loading spinner while data is being fetched */}
        {loading && (
          <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 w-full max-w-2xl">
        <div className="flex items-center bg-[#2F2F2F] p-2 rounded-lg shadow-lg mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask your question..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1"
          />
          <button
            onClick={handleSubmit}
            className="text-blue-500 p-2 ml-1 rounded-lg hover:bg-blue-100 transition-all"
          >
            <LuArrowUpCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Openai;
