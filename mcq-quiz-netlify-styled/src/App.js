import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch("/mcq_questions.json")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const handleAnswer = (index) => {
    if (index + 1 === questions[current].answer) {
      setScore(score + 1);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  if (!questions.length) return <h2>Loading Questions...</h2>;

  return (
    <div className="quiz-container">
      <h1>MCQ Quiz</h1>
      {showResult ? (
        <div className="result-box">
          <h2>Your Score: {score}/{questions.length}</h2>
          <button className="restart-btn" onClick={() => window.location.reload()}>
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <h3>
            Q{current + 1}: {questions[current].question}
          </h3>
          {questions[current].options.map((opt, i) => (
            <button
              key={i}
              className="option-btn"
              onClick={() => handleAnswer(i)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
