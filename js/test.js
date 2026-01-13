// Mock Question Data
// Load Questions from Local Storage (Admin Panel Updates)
let questions = [];
const localQuestions = localStorage.getItem('questionBank');

if (localQuestions) {
    questions = JSON.parse(localQuestions);
} else {
    // Fallback if no local storage set yet
    questions = [
        {
            id: 1,
            text: "What is the result of the derivative of sin(x)?",
            options: [
                { id: 'A', text: "cos(x)" },
                { id: 'B', text: "-cos(x)" },
                { id: 'C', text: "tan(x)" },
                { id: 'D', text: "sec(x)" }
            ],
            correct: 'A'
        }
    ];
}

let currentQuestionIndex = 0;
let userAnswers = {}; // { questionId: selectedOptionId }
let timeLeft = 60 * 60; // 60 minutes in seconds
let timerInterval;

// DOM Elements
const questionTextEl = document.getElementById('question-text');
const optionsListEl = document.getElementById('options-list');
const currentQNumEl = document.getElementById('current-q-num');
const totalQNumEl = document.getElementById('total-q-num');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const paletteGrid = document.getElementById('palette-grid');
const timerEl = document.getElementById('timer');

// Initialize Test
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('test-title').textContent = "Advanced Calculus Mid-Term";
    totalQNumEl.textContent = questions.length;
    renderPalette();
    loadQuestion(currentQuestionIndex);
    startTimer();
});

// Timer Logic
function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitTest();
            return;
        }

        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft < 300) { // Less than 5 mins
            timerEl.parentElement.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
        }
    }, 1000);
}

// Render Question
function loadQuestion(index) {
    const question = questions[index];
    currentQNumEl.textContent = index + 1;
    questionTextEl.textContent = question.text;

    optionsListEl.innerHTML = '';

    question.options.forEach(opt => {
        const label = document.createElement('label');
        label.className = `option-item ${userAnswers[question.id] === opt.id ? 'selected' : ''}`;
        label.innerHTML = `
            <input type="radio" name="answer" class="option-input" value="${opt.id}" 
                ${userAnswers[question.id] === opt.id ? 'checked' : ''}
                onchange="selectOption('${question.id}', '${opt.id}')">
            <span>${opt.text}</span>
        `;
        optionsListEl.appendChild(label);
    });

    // Update Navigation Buttons
    prevBtn.disabled = index === 0;
    prevBtn.style.opacity = index === 0 ? '0.5' : '1';

    if (index === questions.length - 1) {
        nextBtn.textContent = 'Finish';
        nextBtn.classList.remove('btn-primary');
        nextBtn.classList.add('btn-success'); // Assuming we add a success class or just use style
        nextBtn.style.background = '#10b981';
    } else {
        nextBtn.textContent = 'Next';
        nextBtn.classList.add('btn-primary');
        nextBtn.style.background = ''; // critical to reset if we inline styled it
    }

    updatePalette();
}

// Handle Answer Selection
window.selectOption = function (qId, optId) {
    userAnswers[qId] = optId;

    // UI Update for selection
    const allOptions = optionsListEl.querySelectorAll('.option-item');
    allOptions.forEach(opt => opt.classList.remove('selected'));

    const selectedInput = optionsListEl.querySelector(`input[value="${optId}"]`);
    if (selectedInput) selectedInput.parentElement.classList.add('selected');

    updatePalette();
}

// Navigation
window.nextQuestion = function () {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        // Just move to finish logic or confirm submit
        // For UX, maybe scroll to top?
    }
}

window.prevQuestion = function () {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

// Palette Logic
function renderPalette() {
    paletteGrid.innerHTML = '';
    questions.forEach((q, idx) => {
        const btn = document.createElement('button');
        btn.className = 'palette-btn';
        btn.textContent = idx + 1;
        btn.onclick = () => {
            currentQuestionIndex = idx;
            loadQuestion(currentQuestionIndex);
        };
        paletteGrid.appendChild(btn);
    });
}

function updatePalette() {
    const buttons = paletteGrid.querySelectorAll('.palette-btn');
    buttons.forEach((btn, idx) => {
        const qId = questions[idx].id;

        btn.className = 'palette-btn'; // Reset

        if (idx === currentQuestionIndex) {
            btn.classList.add('active'); // Current Question
        } else if (userAnswers[qId]) {
            btn.classList.add('answered'); // Answered Question
        }
        // "Visited but not answered" can be another state if needed
    });
}

// Submission
window.submitTest = function () {
    // Calculate Score
    let score = 0;
    questions.forEach(q => {
        if (userAnswers[q.id] === q.correct) {
            score++;
        }
    });

    const resultData = {
        score: score,
        total: questions.length,
        percentage: (score / questions.length) * 100,
        userAnswers: userAnswers,
        questions: questions
    };

    // Save to localStorage to pass to result page
    localStorage.setItem('examResult', JSON.stringify(resultData));

    // Redirect
    window.location.href = 'result.html';
}
