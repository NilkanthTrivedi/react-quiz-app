import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";
import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [queno, setQueno] = useState(10);

  const fetchQuestions = async (category = "", difficulty = "") => {
    setLoading(true);
    const { data } = await axios
      .get(
        `https://opentdb.com/api.php?amount=${queno}${
          category && `&category=${category}`
        }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
      )
      .finally(() => setLoading(false));
    setQuestions(data.results);
    console.log(data.results);
  };

  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundImage: "url(./ques1.png)" }}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                name={name}
                setName={setName}
                fetchQuestions={fetchQuestions}
                queno={queno}
                setQueno={setQueno}
              />
            }
          />
          <Route
            path="/quiz"
            element={
              <Quiz
                loading={loading}
                name={name}
                questions={questions}
                score={score}
                setScore={setScore}
              />
            }
          />
          <Route
            path="/result"
            element={<Result name={name} score={score} />}
          />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
