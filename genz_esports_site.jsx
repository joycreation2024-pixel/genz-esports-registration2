import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import bgMusic from "./assets/freefire.mp3"; // Your uploaded file
import "./App.css";

const App = () => {
  const [mode, setMode] = useState(null);
  const [formData, setFormData] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const audio = new Audio(bgMusic);
    audio.loop = true;
    audio.volume = 0.5;
    audio.play();
  }, []);

  useEffect(() => {
    const requiredFields = {
      solo: ["uid", "email", "phone"],
      duo: ["uid", "email", "team", "phone"],
      squad: ["uid", "email", "team", "extra", "phone"],
    };
    const fields = requiredFields[mode] || [];
    setIsValid(fields.every((key) => formData[key]));
  }, [formData, mode]);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    alert("Registered successfully!");
    // Here you’ll add Firebase + email backend logic
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold neon-text mb-6">
        Welcome to GEN-Z Esports
      </h1>
      <div className="flex gap-4 mb-6">
        {["solo", "duo", "squad"].map((m) => (
          <motion.button
            key={m}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setMode(m);
              setFormData({});
              new Audio("/click.mp3").play();
            }}
            className="px-6 py-2 neon-button"
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </motion.button>
        ))}
      </div>

      {mode && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col gap-4 w-80"
        >
          <input
            name="uid"
            onChange={handleInput}
            placeholder="Free Fire UID"
            className="input"
            style={{ color: "lime" }}
          />
          <input
            name="email"
            onChange={handleInput}
            placeholder="Gmail"
            className="input"
            style={{ color: "lime" }}
          />
          {(mode === "duo" || mode === "squad") && (
            <input
              name="team"
              onChange={handleInput}
              placeholder="Team Name"
              className="input"
              style={{ color: "lime" }}
            />
          )}
          {mode === "squad" && (
            <select
              name="extra"
              onChange={handleInput}
              className="input"
              style={{ color: "lime" }}
            >
              <option value="">Extra Player?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          )}
          <input
            name="phone"
            onChange={handleInput}
            placeholder="Mobile Number"
            className="input"
            style={{ color: "lime" }}
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded ${isValid ? "bg-green-500" : "bg-gray-600"}`}
            disabled={!isValid}
          >
            Submit
          </button>
        </motion.form>
      )}
    </div>
  );
};

export default App;
