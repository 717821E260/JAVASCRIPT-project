const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'CSS is an _______ language?',
    answers: [
      { text: 'style sheet', correct: true },
      { text: 'Web based', correct: false },
      { text: 'procedural', correct: false},
      { text: 'none', correct: false},
      
    ]
  },
  {
    question: 'How many tags contain in HTML?',
    answers: [
      { text: '142', correct: false },
      { text: '132', correct: false },
      { text: '80', correct: false },
      { text: '60', correct: true }
    ]
  },
  {
    question: 'HTML is stands for?',
    answers: [
      { text: 'HyperText Markup Language', correct: false },
      { text: 'Hyper Markup Language', correct: true },
      { text: 'HyperVisual Markup Language', correct: false },
      { text: 'Hyper Markable Language', correct: false }
    ]
  },
  {
    question: 'Javascript is an_______________ language?',
    answers: [
      { text: 'Object-oreinted', correct: false },
      { text: 'Object-based', correct: true },
      { text: 'Procedural', correct: false },
      { text: 'None', correct: false },
    ]
  },
  {
    question: 'When an operator’s value is NULL, the typeof returned by the unary operator is:',
    answers: [
      { text: 'NaN', correct: false },
      { text: 'undefined', correct: false },
      { text: 'booleon', correct: false },
      { text: 'object', correct: true },
    ]
  }
]