import React, { useState } from 'react'

const QUESTIONS = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
    correct: 2
  }
]

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const handleOptionClick = (index) => {
    if (selectedOption !== null) return

    setSelectedOption(index)
    
    if (index === QUESTIONS[currentQuestion].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
      } else {
        setGameOver(true)
      }
    }, 1000)
  }

  const restartGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedOption(null)
    setGameOver(false)
  }

  if (gameOver) {
    return (
      <div className="trivia-container">
        <img src="/cat-logo.svg" alt="Cat Logo" className="logo" />
        <div className="score">
          Game Over! Your Score: {score} / {QUESTIONS.length}
        </div>
        <button className="restart-btn" onClick={restartGame}>
          Restart Game
        </button>
      </div>
    )
  }

  const currentQuestionData = QUESTIONS[currentQuestion]

  return (
    <div className="trivia-container">
      <img src="/cat-logo.svg" alt="Cat Logo" className="logo" />
      <div className="question">{currentQuestionData.question}</div>
      <div className="options">
        {currentQuestionData.options.map((option, index) => (
          <div 
            key={index} 
            className={`option 
              ${selectedOption !== null && index === currentQuestionData.correct ? 'correct' : ''}
              ${selectedOption === index && index !== currentQuestionData.correct ? 'incorrect' : ''}
            `}
            onClick={() => handleOptionClick(index)}
          >
            {option}
          </div>
        ))}
      </div>
      <div className="score">
        Score: {score}
      </div>
    </div>
  )
}

export default App
