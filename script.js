const questionContainer = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const feedbackContainer = document.getElementById('feedback');
const scoreContainer = document.getElementById('score');
const optionButtons = document.querySelectorAll('.option');
const nextButton = document.getElementById('next-button');
const categoryContainer = document.getElementById('category');
const languageSelect = document.getElementById('language-select');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

async function loadQuestions() {
  const questions_path = 'questions' + (languageSelect.value === 'en' ? '' : '_tr') + '.json';
  const response = await fetch(questions_path);
  questions = await response.json();
  // Flatten the questions array and store category
  const flattenedQuestions = [];
    for (const category in questions) {
        questions[category].forEach(question => {
            flattenedQuestions.push({...question, category: category});
        });
    }
    questions = flattenedQuestions;
  displayQuestion();
}

function displayQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    categoryContainer.textContent = currentQuestion.category;

    // Set options
    optionButtons.forEach((button, index) => {
      button.textContent = currentQuestion.options[index];
      button.dataset.option = String.fromCharCode(65 + index); // A, B, C, D
      button.disabled = false; // Enable buttons for the new question
    });

    feedbackContainer.textContent = ''; // Clear feedback
    nextButton.disabled = true; // Disable next button initially
  } else {
    questionContainer.textContent = 'Quiz completed!';
    optionsContainer.innerHTML = '';
    feedbackContainer.textContent = `Final Score: ${score} / ${questions.length}`;
      nextButton.disabled = true;
  }
}
function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.correct_answer) {
    feedbackContainer.textContent = 'Correct!';
    score++;
  } else {
    feedbackContainer.textContent = `Incorrect. Correct answer was ${currentQuestion.correct_answer}: ${currentQuestion.explanation}`;
  }

  optionButtons.forEach(button => {
    button.disabled = true; // Disable option buttons
  });

    nextButton.disabled = false; //enable next button

  scoreContainer.textContent = `Score: ${score}`;
}

// Event listener for next button
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    displayQuestion();
});

// Add event listeners to option buttons
optionButtons.forEach(button => {
  button.addEventListener('click', function() {
    checkAnswer(this.dataset.option);
  });
});


languageSelect.addEventListener('change', loadQuestions);

loadQuestions();