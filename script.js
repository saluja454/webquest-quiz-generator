/* ==============================================================
   WebQuest — Application Logic
   ==============================================================
   This file controls the quiz behaviour:
   starting a quiz, showing questions, checking answers,
   calculating the score, showing results, and reviewing answers.

   It runs AFTER questions.js has loaded, so the `questions`
   array is already available.
   ============================================================== */

// ── 1. Grab references to important HTML elements ─────────────
//    We store them in variables so we can access them quickly
//    throughout the code without searching the DOM repeatedly.

// Page sections (we show/hide these to navigate)
const homePage    = document.getElementById("home-page");
const quizPage    = document.getElementById("quiz-page");
const resultsPage = document.getElementById("results-page");
const reviewPage  = document.getElementById("review-page");

// Quiz elements
const quizCategory     = document.getElementById("quiz-category");
const quizProgressText = document.getElementById("quiz-progress-text");
const progressBarFill  = document.getElementById("progress-bar-fill");
const questionText     = document.getElementById("question-text");
const optionsList      = document.getElementById("options-list");
const explanationBox   = document.getElementById("explanation-box");
const explanationText  = document.getElementById("explanation-text");
const nextQuestionBtn  = document.getElementById("next-question-btn");
const exitQuizBtn      = document.getElementById("exit-quiz-btn");

// Timer elements
const timerBadge   = document.getElementById("timer-badge");
const timerSeconds = document.getElementById("timer-seconds");

// Results elements
const scorePercent   = document.getElementById("score-percent");
const resultsMessage = document.getElementById("results-message");
const statCorrect    = document.getElementById("stat-correct");
const statIncorrect  = document.getElementById("stat-incorrect");
const statTotal      = document.getElementById("stat-total");
const scoreCircle    = document.getElementById("score-circle");

// Results buttons
const reviewAnswersBtn = document.getElementById("review-answers-btn");
const retryQuizBtn     = document.getElementById("retry-quiz-btn");
const goHomeBtn        = document.getElementById("go-home-btn");

// Review elements
const reviewList       = document.getElementById("review-list");
const backToResultsBtn = document.getElementById("back-to-results-btn");

// Navigation
const navLogo = document.getElementById("nav-logo");

// Best-score display elements on the home page
const bestScoreHTML = document.getElementById("best-score-html");
const bestScoreCSS  = document.getElementById("best-score-css");
const bestScoreJS   = document.getElementById("best-score-js");


// ── 2. Quiz state variables ───────────────────────────────────
//    These track what is happening in the current quiz session.

let currentCategory    = "";     // "html", "css", or "js"
let currentQuestions   = [];     // the filtered questions for this category
let currentIndex       = 0;      // which question we are on (0-based)
let score              = 0;      // number of correct answers
let hasAnswered        = false;  // prevents selecting multiple answers
let userAnswers        = [];     // stores the user's choices for review

// Timer state
const SECONDS_PER_QUESTION = 30; // change this to adjust time per question
let timerInterval    = null;     // holds the setInterval ID so we can stop it
let timeRemaining    = 0;        // seconds left for the current question


// ── 3. Page navigation helper ─────────────────────────────────
//    Shows one section and hides all others.

function showPage(page) {
  homePage.classList.add("hidden");
  quizPage.classList.add("hidden");
  resultsPage.classList.add("hidden");
  reviewPage.classList.add("hidden");

  page.classList.remove("hidden");
  window.scrollTo(0, 0);
}


// ── 4. Load best scores from localStorage ─────────────────────
//    Called once when the page loads and again after each quiz.

function loadBestScores() {
  const categories = [
    { key: "bestScore_html", element: bestScoreHTML },
    { key: "bestScore_css",  element: bestScoreCSS },
    { key: "bestScore_js",   element: bestScoreJS }
  ];

  categories.forEach(function (cat) {
    const saved = localStorage.getItem(cat.key);
    if (saved !== null) {
      cat.element.textContent = "Best Score: " + saved + "%";
    } else {
      cat.element.textContent = "";
    }
  });
}


// ── 5. Save best score ───────────────────────────────────────
//    Saves the score only if it is higher than the existing best.

function saveBestScore(category, percent) {
  const key   = "bestScore_" + category;
  const saved = localStorage.getItem(key);

  if (saved === null || percent > Number(saved)) {
    localStorage.setItem(key, percent);
  }
}


// ── 6. Start a quiz ──────────────────────────────────────────
//    Filters questions by category and resets all state.

function startQuiz(category) {
  currentCategory  = category;
  currentQuestions = questions.filter(function (q) {
    return q.category === category;
  });
  currentIndex = 0;
  score        = 0;
  hasAnswered  = false;
  userAnswers  = [];

  // Set the category name in the header
  const names = { html: "HTML", css: "CSS", js: "JavaScript" };
  quizCategory.textContent = names[category] || category;

  showPage(quizPage);
  loadQuestion();
}


// ── 6b. Timer functions ──────────────────────────────────────
//    startTimer()  — begins a new countdown for the current question.
//    stopTimer()   — pauses/clears the running countdown.
//    handleTimeUp() — called when time reaches 0.

function startTimer() {
  // Always stop any existing timer first to prevent duplicates
  stopTimer();

  timeRemaining = SECONDS_PER_QUESTION;
  timerSeconds.textContent = timeRemaining;
  timerBadge.classList.remove("timer-warning");

  timerInterval = setInterval(function () {
    timeRemaining--;
    timerSeconds.textContent = timeRemaining;

    // Show warning style when time is running low
    if (timeRemaining <= 5) {
      timerBadge.classList.add("timer-warning");
    }

    // Time's up!
    if (timeRemaining <= 0) {
      handleTimeUp();
    }
  }, 1000); // runs every 1 second (1000 milliseconds)
}

function stopTimer() {
  // clearInterval stops the repeating countdown.
  // We also set timerInterval to null so we know it's not running.
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  timerBadge.classList.remove("timer-warning");
}

function handleTimeUp() {
  // Stop the countdown
  stopTimer();
  timerSeconds.textContent = "0";

  // If the user already answered, do nothing
  if (hasAnswered) return;
  hasAnswered = true;

  const q            = currentQuestions[currentIndex];
  const correctIndex = q.correct;

  // Record as an incorrect answer (selectedIndex: -1 means "no answer")
  userAnswers.push({
    questionIndex: currentIndex,
    selectedIndex: -1,
    isCorrect: false
  });

  // Disable all buttons and highlight the correct one
  const allButtons = optionsList.querySelectorAll(".option-btn");
  allButtons.forEach(function (btn) {
    btn.classList.add("disabled");
  });
  allButtons[correctIndex].classList.add("correct");

  // Show explanation
  explanationText.textContent = "⏰ Time's up! " + q.explanation;
  explanationBox.classList.remove("hidden");

  // Show Next / See Results button
  nextQuestionBtn.classList.remove("hidden");
  if (currentIndex === currentQuestions.length - 1) {
    nextQuestionBtn.textContent = "See Results";
  } else {
    nextQuestionBtn.textContent = "Next Question";
  }
}


// ── 7. Load a question ───────────────────────────────────────
//    Reads the current question from the array and updates
//    all the HTML elements.

function loadQuestion() {
  const q     = currentQuestions[currentIndex];
  const total = currentQuestions.length;

  // Update header text
  quizProgressText.textContent = "Question " + (currentIndex + 1) + " / " + total;

  // Update progress bar
  const percent = ((currentIndex) / total) * 100;
  progressBarFill.style.width = percent + "%";

  // Set question text (using textContent for safety)
  questionText.textContent = q.question;

  // Clear old options and build new ones
  optionsList.innerHTML = "";

  q.options.forEach(function (optionText, index) {
    const button = document.createElement("button");
    button.classList.add("option-btn");
    button.textContent = optionText;
    button.setAttribute("type", "button");

    // When the user clicks this option, call selectAnswer
    button.addEventListener("click", function () {
      selectAnswer(index, button);
    });

    optionsList.appendChild(button);
  });

  // Hide the explanation and Next button
  explanationBox.classList.add("hidden");
  nextQuestionBtn.classList.add("hidden");

  // Reset the answered flag
  hasAnswered = false;

  // Start the countdown timer for this question
  startTimer();
}


// ── 8. Handle answer selection ───────────────────────────────
//    Checks if the answer is correct, shows feedback,
//    and prevents clicking again.

function selectAnswer(selectedIndex, selectedButton) {
  // Prevent answering the same question twice
  if (hasAnswered) return;
  hasAnswered = true;

  // Stop the timer — the user answered in time
  stopTimer();

  const q            = currentQuestions[currentIndex];
  const correctIndex = q.correct;
  const isCorrect    = selectedIndex === correctIndex;

  // Save the user's answer for later review
  userAnswers.push({
    questionIndex: currentIndex,
    selectedIndex: selectedIndex,
    isCorrect: isCorrect
  });

  // Update score
  if (isCorrect) {
    score++;
  }

  // Get all option buttons
  const allButtons = optionsList.querySelectorAll(".option-btn");

  // Mark all buttons as disabled (prevent further clicks visually)
  allButtons.forEach(function (btn) {
    btn.classList.add("disabled");
  });

  // Highlight the selected button
  if (isCorrect) {
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("incorrect");
    // Also highlight the correct answer so the user can see it
    allButtons[correctIndex].classList.add("correct");
  }

  // Show explanation
  explanationText.textContent = q.explanation;
  explanationBox.classList.remove("hidden");

  // Show the Next button (or "See Results" if it's the last question)
  nextQuestionBtn.classList.remove("hidden");
  if (currentIndex === currentQuestions.length - 1) {
    nextQuestionBtn.textContent = "See Results";
  } else {
    nextQuestionBtn.textContent = "Next Question";
  }
}


// ── 9. Go to next question or show results ───────────────────

function goToNext() {
  if (currentIndex < currentQuestions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    showResults();
  }
}


// ── 10. Show results ─────────────────────────────────────────

function showResults() {
  // Make sure the timer is stopped
  stopTimer();
  const total      = currentQuestions.length;
  const incorrect  = total - score;
  const percent    = Math.round((score / total) * 100);

  // Update progress bar to 100%
  progressBarFill.style.width = "100%";

  // Fill in the results page
  scorePercent.textContent  = percent + "%";
  statCorrect.textContent   = score;
  statIncorrect.textContent = incorrect;
  statTotal.textContent     = total;

  // Pick a message based on the percentage
  if (percent === 100) {
    resultsMessage.textContent = "Perfect score! Outstanding! 🎉";
  } else if (percent >= 80) {
    resultsMessage.textContent = "Excellent work! You really know your stuff!";
  } else if (percent >= 60) {
    resultsMessage.textContent = "Good job! A little more practice and you'll ace it.";
  } else if (percent >= 40) {
    resultsMessage.textContent = "Not bad! Review the explanations to improve.";
  } else {
    resultsMessage.textContent = "Keep practising — you'll get there! 💪";
  }

  // Change circle border colour based on score
  if (percent >= 70) {
    scoreCircle.style.borderColor = "var(--color-correct)";
    scorePercent.style.color      = "var(--color-correct)";
  } else if (percent >= 40) {
    scoreCircle.style.borderColor = "var(--color-primary)";
    scorePercent.style.color      = "var(--color-primary)";
  } else {
    scoreCircle.style.borderColor = "var(--color-incorrect)";
    scorePercent.style.color      = "var(--color-incorrect)";
  }

  // Save best score
  saveBestScore(currentCategory, percent);

  showPage(resultsPage);
}


// ── 11. Build the answer review ──────────────────────────────

function showReview() {
  reviewList.innerHTML = "";

  userAnswers.forEach(function (answer, i) {
    const q = currentQuestions[answer.questionIndex];

    // Create the review card
    const card = document.createElement("div");
    card.classList.add("review-card");
    card.classList.add(answer.isCorrect ? "review-correct" : "review-incorrect");

    // Question number
    const numEl = document.createElement("p");
    numEl.classList.add("review-question-number");
    numEl.textContent = "Question " + (i + 1);
    card.appendChild(numEl);

    // Question text
    const qText = document.createElement("p");
    qText.classList.add("review-question-text");
    qText.textContent = q.question;
    card.appendChild(qText);

    // User's answer
    const yourAns = document.createElement("p");
    yourAns.classList.add("review-answer", "review-your-answer");
    yourAns.classList.add(answer.isCorrect ? "right" : "wrong");

    // If selectedIndex is -1, the timer ran out and no answer was chosen
    if (answer.selectedIndex === -1) {
      yourAns.textContent = "Your answer: ⏰ Time's up — no answer selected";
    } else {
      yourAns.textContent = "Your answer: " + q.options[answer.selectedIndex];
    }
    card.appendChild(yourAns);

    // If wrong, show the correct answer too
    if (!answer.isCorrect) {
      const correctAns = document.createElement("p");
      correctAns.classList.add("review-answer", "review-correct-answer");
      correctAns.textContent = "Correct answer: " + q.options[q.correct];
      card.appendChild(correctAns);
    }

    // Explanation
    const explEl = document.createElement("p");
    explEl.classList.add("review-explanation");
    explEl.textContent = q.explanation;
    card.appendChild(explEl);

    reviewList.appendChild(card);
  });

  showPage(reviewPage);
}


// ── 12. Event Listeners ──────────────────────────────────────
//    Connect buttons to functions.

// Category card buttons (Start Quiz)
document.querySelectorAll(".card-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const category = btn.getAttribute("data-category");
    startQuiz(category);
  });
});

// Next Question / See Results
nextQuestionBtn.addEventListener("click", goToNext);

// Exit Quiz → go back home
exitQuizBtn.addEventListener("click", function () {
  stopTimer();  // Stop the timer when exiting
  loadBestScores();
  showPage(homePage);
});

// Review Answers
reviewAnswersBtn.addEventListener("click", showReview);

// Back to Results (from review)
backToResultsBtn.addEventListener("click", function () {
  showPage(resultsPage);
});

// Retry Quiz
retryQuizBtn.addEventListener("click", function () {
  startQuiz(currentCategory);
});

// Go Home (from results)
goHomeBtn.addEventListener("click", function () {
  loadBestScores();
  showPage(homePage);
});

// Logo → go home
navLogo.addEventListener("click", function (e) {
  e.preventDefault();
  loadBestScores();
  showPage(homePage);
});


// ── 13. Initialise ───────────────────────────────────────────
//    Load saved scores when the page first opens.

loadBestScores();
