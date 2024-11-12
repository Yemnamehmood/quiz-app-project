'use client'
// pages/index.js
import { useState, useEffect } from 'react';

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Fetch questions from API
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((response) => response.json())
      .then((data) => setQuestions(data.results))
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  // Handle answer selection
  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="quiz-container">
        <h1>Quiz Finished!</h1>
        <p>Your Score: {score} / {questions.length}</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {questions.length > 0 && (
        <>
          <h1>Quiz App</h1>
          <p>Question {currentQuestionIndex + 1} / {questions.length}</p>
          <div className="question-container">
            <p>{questions[currentQuestionIndex].question}</p>
            <div className="answers">
              {[...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer]
                .sort(() => Math.random() - 0.5) // Shuffle answers
                .map((answer, index) => (
                  <button
                    key={index}
                    className="answer-btn"
                    onClick={() => handleAnswer(answer)}
                  >
                    {answer}
                  </button>
                ))}
            </div>
          </div>
        </>
      )}
      <footer>
        <p>© 2024 Quiz App by Yemna Mehmood</p>
      </footer>
    </div>
  );
}
