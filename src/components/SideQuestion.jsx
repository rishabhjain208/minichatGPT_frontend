import React, { useEffect, useState } from "react";
import axios from "axios";

const SideQuestion = ({ userId, onQuestionSelect }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `https://minichatgpt-backend.onrender.com/api/users/${userId}/questions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [userId]);

  // Helper function to truncate text to 5-6 words
  const truncateText = (text) => {
    const words = text.split(" ");
    return words.slice(0, 6).join(" ") + (words.length > 6 ? "..." : "");
  };

  return (
    <div className="fixed top-0 left-0 w-80 h-full bg-gradient-to-b from-[#1f1f1f] to-[#2F2F2F] p-6 shadow-2xl overflow-y-auto border-r border-gray-800">
      <h2 className="text-2xl font-bold text-white mb-6">Your Questions</h2>
      <ul className="space-y-4">
        {questions.length > 0 ? (
          questions.map((question) => (
            <li
              key={question._id}
              className="p-4 rounded-lg bg-[#3b3b3b] hover:bg-[#484848] transition duration-200 cursor-pointer"
              onClick={() => onQuestionSelect(question._id)}
            >
              <p className="text-lg font-semibold text-white">
                {truncateText(question.question)}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {truncateText(question.answer)}
              </p>
            </li>
          ))
        ) : (
          <li className="p-4 text-gray-300">No questions found.</li>
        )}
      </ul>
    </div>
  );
};

export default SideQuestion;
