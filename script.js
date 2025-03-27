const questions = [
  {
    question: "Who was the first computer programmer?",
    answers: [
      { text: "Grace Hopper", correct: false },
      { text: "Ada Lovelace", correct: true },
      { text: "Katherine Johnson", correct: false },
      { text: "Hedy Lamarr", correct: false },
    ],
  },
  {
    question: "Which woman co-founded Fairchild Semiconductor and Intel?",
    answers: [
      { text: "Sheryl Sandberg", correct: false },
      { text: "Jean Jennings Bartik", correct: false },
      { text: "Ann Bowers", correct: true },
      { text: "Susan Wojcicki", correct: false },
    ],
  },
  {
    question: "Who invented the first compiler for a programming language?",
    answers: [
      { text: "Annie Easley", correct: false },
      { text: "Grace Hopper", correct: true },
      { text: "Radia Perlman", correct: false },
      { text: "Adele Goldberg", correct: false },
    ],
  },
  {
    question:
      "Which woman played a key role in developing the Apollo space program's software?",
    answers: [
      { text: "Katherine Johnson", correct: false },
      { text: "Dorothy Vaughan", correct: false },
      { text: "Margaret Hamilton", correct: true },
      { text: "Mary Jackson", correct: false },
    ],
  },
  {
    question:
      "Who is known as the 'Mother of the Internet' for her work on network protocols?",
    answers: [
      { text: "Marissa Mayer", correct: false },
      { text: "Radia Perlman", correct: true },
      { text: "Megan Smith", correct: false },
      { text: "Carol Shaw", correct: false },
    ],
  },
  {
    question:
      "Which woman co-created the first graphical computer game, 'Pong'?",
    answers: [
      { text: "Hedy Lamarr", correct: false },
      { text: "Joan Ball", correct: false },
      { text: "Elizabeth Feinler", correct: false },
      { text: "Carol Shaw", correct: true },
    ],
  },
  {
    question: "Who developed the algorithm behind WiFi, Bluetooth, and GPS?",
    answers: [
      { text: "Hedy Lamarr", correct: true },
      { text: "Annie Easley", correct: false },
      { text: "Mary Lou Jepsen", correct: false },
      { text: "Ellen Ochoa", correct: false },
    ],
  },
  {
    question: "Which woman was the first female engineer hired at Google?",
    answers: [
      { text: "Sheryl Sandberg", correct: false },
      { text: "Marissa Mayer", correct: true },
      { text: "Susan Wojcicki", correct: false },
      { text: "Megan Smith", correct: false },
    ],
  },
  {
    question: "Who founded the nonprofit 'Girls Who Code'?",
    answers: [
      { text: "Kimberly Bryant", correct: false },
      { text: "Reshma Saujani", correct: true },
      { text: "Tracy Chou", correct: false },
      { text: "Fei-Fei Li", correct: false },
    ],
  },
  {
    question:
      "Which woman was a key figure in developing COBOL programming language?",
    answers: [
      { text: "Jean Sammet", correct: false },
      { text: "Frances Allen", correct: false },
      { text: "Grace Hopper", correct: true },
      { text: "Lois Haibt", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";

  // Clear any existing result or score messages
  const resultMessageElement = document.querySelector(".result-message");
  if (resultMessageElement) {
    resultMessageElement.remove();
  }

  const scoreMessageElement = document.querySelector(".score-message");
  if (scoreMessageElement) {
    scoreMessageElement.remove();
  }

  showQuestion();
}

function showQuestion() {
  resetState();
  updateProgressBar(); // Update progress bar
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct"); // Add green background for correct answer
    score++;
  } else {
    selectedButton.classList.add("incorrect"); // Add red background for incorrect answer
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct"); // Highlight the correct answer
    }
    button.disabled = true; // Disable all buttons after selection
  });
  nextButton.style.display = "block"; // Show the next button
}

function showScore() {
  resetState();
  const quizDescription = document.querySelector(".quiz-description"); // Select the description paragraph
  if (quizDescription) {
    quizDescription.style.display = "none"; // Hide the description
  }

  let resultMessage = "";
  if (score <= 5) {
    resultMessage = `
      <div class="result-container">
        <p class="result-title">🌟 Every expert was once a beginner!</p>
        <p class="result-subtitle">📚 Why not explore some tech heroines' stories today?</p>
        <div class="emoji-spacer">👩💻✨🔍</div>
      </div>
    `;
  } else if (score <= 8) {
    resultMessage = `
      <div class="result-container">
        <p class="result-title">💡 Impressive knowledge!</p>
        <p class="result-subtitle">🚀 You're on your way to becoming a women's tech history buff.</p>
        <div class="emoji-spacer">👩🔬💻📈</div>
      </div>
    `;
  } else {
    resultMessage = `
      <div class="result-container">
        <p class="result-title">🎉 Flawless victory!</p>
        <p class="result-subtitle">🏆 Your knowledge rivals the pioneers themselves.</p>
        <div class="emoji-spacer">👑💎👩💻✨</div>
      </div>
    `;
  }

  // Clear the question element to remove any lingering content
  questionElement.innerHTML = "";

  // Add the result message below the header
  const resultMessageElement = document.createElement("p");
  resultMessageElement.classList.add("result-message");
  resultMessageElement.innerHTML = resultMessage;
  const header = document.querySelector("h1");
  header.insertAdjacentElement("afterend", resultMessageElement);

  // Update the score message below the progress bar
  const scoreMessage = document.createElement("p");
  scoreMessage.classList.add("score-message");
  scoreMessage.innerHTML = `Your Score is ${score} out of ${questions.length}!`;
  questionElement.parentNode.appendChild(scoreMessage);

  nextButton.innerHTML = "Restart";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100; // Calculate progress percentage
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${progress}%`; // Update the width of the progress bar
}
startQuiz();
