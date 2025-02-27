const questionContainer = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const feedbackContainer = document.getElementById('feedback');
const explanationContainer = document.getElementById('explanation');
const scoreContainer = document.getElementById('score');
const questionCountContainer = document.getElementById('question-count');
const optionButtons = document.querySelectorAll('.option');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const resetButton = document.getElementById('reset-button');
const categoryContainer = document.getElementById('category');
const languageSelect = document.getElementById('language-select');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let userAnswers = []; // Store user's answers
let corrects = [];

// Load state from localStorage
function loadState() {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
        const state = JSON.parse(savedState);
        currentQuestionIndex = state.currentQuestionIndex;
        score = state.score;
        userAnswers = state.userAnswers;
        languageSelect.value = state.language; // Restore selected language
        corrects = state.corrects;
    }
}

// Save state to localStorage
function saveState() {
    const state = {
        currentQuestionIndex,
        score,
        userAnswers,
        corrects,
        language: languageSelect.value,
    };
    localStorage.setItem('quizState', JSON.stringify(state));
}


async function loadQuestions() {
    const selectedLanguage = languageSelect.value;
    const fileName = selectedLanguage === 'tr' ? 'questions_tr.json' : 'questions.json';
    const response = await fetch(fileName);
    questions = await response.json();

    // Flatten the questions array and store category
    const flattenedQuestions = [];
    for (const category in questions) {
        questions[category].forEach(question => {
            flattenedQuestions.push({ ...question, category: category });
        });
    }
    questions = flattenedQuestions;
    //  currentQuestionIndex = 0; // Don't reset if loading state
    if (!localStorage.getItem('quizState')) { // Only reset if no saved state
        currentQuestionIndex = 0;
        userAnswers = [];
    }
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        questionCountContainer.textContent = `Question: ${currentQuestionIndex + 1}/${questions.length}`;
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;
        categoryContainer.textContent = currentQuestion.category;
        explanationContainer.textContent = ''; // Clear feedback

        // Set options
        optionButtons.forEach((button, index) => {
            button.textContent = currentQuestion.options[index];
            button.dataset.option = String.fromCharCode(65 + index); // A, B, C, D

            button.classList.remove('selected-true');
            button.classList.remove('selected-false');
            // Check if the user already answered this question
            if (userAnswers[currentQuestionIndex] === button.dataset.option) {
                explanationContainer.textContent = `Explanation: ${currentQuestion.explanation}`;
                if (corrects[currentQuestionIndex] === true) {
                    console.log('correct');
                    button.classList.add('selected-true');
                } else {
                    console.log('wrong');
                    button.classList.add('selected-false');
                }
            } 

            if (currentQuestionIndex in userAnswers) {
                button.disabled = true;
            }
            else {
                button.disabled = false;
            }
        });

        feedbackContainer.textContent = ''; // Clear feedback
        nextButton.disabled = currentQuestionIndex === questions.length - 1;
        prevButton.disabled = currentQuestionIndex === 0;

    } else {
        questionContainer.textContent = 'Quiz completed!';
        optionsContainer.innerHTML = '';
        feedbackContainer.textContent = `Final Score: ${score} / ${questions.length}`;
        nextButton.disabled = true;
        prevButton.disabled = true;
    }
    scoreContainer.textContent = `Score: ${score}`; // Update score display
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    // Save the user's answer
    userAnswers[currentQuestionIndex] = selectedOption;
    if (selectedOption === currentQuestion.correct_answer) {
        feedbackContainer.textContent = 'Correct!';
        corrects[currentQuestionIndex] = true;
        score++;
    } else {
        feedbackContainer.textContent = `Incorrect. Correct answer was ${currentQuestion.correct_answer}`
        corrects[currentQuestionIndex] = false;
    }

    explanationContainer.textContent = `Explanation: ${currentQuestion.explanation}`;

    optionButtons.forEach(button => {
        button.disabled = true; // Disable option buttons
        if (button.dataset.option === selectedOption) {
            if (corrects[currentQuestionIndex] == true) {
                button.classList.add('selected-true');
            } else {
                button.classList.add('selected-false');
            }
        }
    });

    nextButton.disabled = currentQuestionIndex === questions.length - 1;
    prevButton.disabled = false;

    scoreContainer.textContent = `Score: ${score}`;
    saveState(); // Save after answering
}

// Event listener for next button
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    displayQuestion();
});

// Event listener for previous button
prevButton.addEventListener('click', () => {
    currentQuestionIndex--;
    displayQuestion();
});

// Event listener for reset button
resetButton.addEventListener('click', () => {
    localStorage.removeItem('quizState');
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    corrects = [];
    loadQuestions(); // Reload to reset the quiz
});

// Add event listeners to option buttons
optionButtons.forEach(button => {
    button.addEventListener('click', function () {
        checkAnswer(this.dataset.option);
    });
});

// Initial load
loadState(); // Load saved state (if any)
loadQuestions(); // Then load questions

// Reload questions when language changes
languageSelect.addEventListener('change', () => {
    // Reset when language changes
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    loadQuestions();
    saveState(); // Save language preference
});