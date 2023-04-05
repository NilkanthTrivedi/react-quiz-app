import React, { useState } from "react";
import "./Home.css";
import { Button, MenuItem, Slider, TextField, Typography } from "@mui/material";
import Categories from "../../Data/Categories";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

export default function Home({
  name,
  setName,
  fetchQuestions,
  queno,
  setQueno,
}) {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!category || !difficulty || !name) {
      setErr(true);
      return;
    } else {
      setErr(false);
      fetchQuestions(category, difficulty);
      navigate("/quiz");
    }
  };
  return (
    <>
      <div className="content">
        <div className="settings">
          <span style={{ fontSize: 30 }}>Quiz Settings</span>
          {err && <ErrorMessage>Fill All The Fields</ErrorMessage>}
          <div className="settings_select">
            <TextField
              style={{ marginBottom: 25 }}
              label="Enter your Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              select
              label="Select category"
              variant="outlined"
              style={{ marginBottom: 30 }}
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              {Categories.map((cat) => (
                <MenuItem key={cat.category} value={cat.value}>
                  {cat.category}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Select difficulty"
              variant="outlined"
              style={{ marginBottom: 30 }}
              onChange={(e) => setDifficulty(e.target.value)}
              value={difficulty}
            >
              <MenuItem key="Easy" value="easy">
                Easy
              </MenuItem>
              <MenuItem key="Medium" value="medium">
                Medium
              </MenuItem>
              <MenuItem key="Hard" value="hard">
                Hard
              </MenuItem>
            </TextField>

            <Typography>Select No Of Question : {queno}</Typography>

            <Slider
              style={{ marginBottom: 30 }}
              aria-label="Number of Que."
              // defaultValue={10}

              value={queno}
              onChange={(e) => setQueno(e.target.value)}
              step={1}
              marks
              min={1}
              max={10}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Start Quiz
            </Button>
          </div>
        </div>

        <img src="./quiz.svg" className="banner" alt="quiz-image" />
      </div>
    </>
  );
}
