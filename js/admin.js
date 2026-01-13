// Admin Logic

// Default Mock Questions (if local storage is empty)
const defaultQuestions = [
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
    },
    {
        id: 2,
        text: "Which of the following matrices is singular?",
        options: [
            { id: 'A', text: "[[1, 2], [3, 4]]" },
            { id: 'B', text: "[[1, 1], [1, 1]]" },
            { id: 'C', text: "[[1, 0], [0, 1]]" },
            { id: 'D', text: "[[2, 3], [4, 5]]" }
        ],
        correct: 'B'
    },
    {
        id: 3,
        text: "Evaluate the integral of 2x dx.",
        options: [
            { id: 'A', text: "x^2 + C" },
            { id: 'B', text: "2x^2 + C" },
            { id: 'C', text: "x + C" },
            { id: 'D', text: "2x + C" }
        ],
        correct: 'A'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Questions in LocalStorage if not present
    if (!localStorage.getItem('questionBank')) {
        localStorage.setItem('questionBank', JSON.stringify(defaultQuestions));
    }

    const path = window.location.pathname;

    // Logic for Dashboard
    if (path.includes('admin_dashboard')) {
        updateDashboardStats();
    }

    // Logic for Question Manager
    if (path.includes('admin_questions')) {
        renderQuestionsList();

        const form = document.getElementById('add-question-form');
        if (form) {
            form.addEventListener('submit', handleAddQuestion);
        }
    }
});

function updateDashboardStats() {
    const questions = JSON.parse(localStorage.getItem('questionBank')) || [];
    const totalQEl = document.getElementById('total-q-count');
    if (totalQEl) totalQEl.textContent = questions.length;
}

function renderQuestionsList() {
    const listEl = document.getElementById('questions-list');
    const questions = JSON.parse(localStorage.getItem('questionBank')) || [];

    listEl.innerHTML = '';

    questions.forEach((q, idx) => {
        const item = document.createElement('div');
        item.style.background = 'white';
        item.style.padding = '1rem';
        item.style.borderRadius = 'var(--radius-md)';
        item.style.border = '1px solid var(--border-color)';

        item.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
                <span>Q${idx + 1}: ${q.text.substring(0, 40)}...</span>
                <span style="color: var(--success);">Correct: ${q.correct}</span>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
                A: ${q.options[0].text} | B: ${q.options[1].text} ...
            </div>
        `;
        listEl.appendChild(item);
    });
}

function handleAddQuestion(e) {
    e.preventDefault();

    const text = document.getElementById('q-text').value;
    const optA = document.getElementById('opt-a').value;
    const optB = document.getElementById('opt-b').value;
    const optC = document.getElementById('opt-c').value;
    const optD = document.getElementById('opt-d').value;
    const correct = document.getElementById('correct-opt').value;

    const questions = JSON.parse(localStorage.getItem('questionBank')) || [];

    const newQ = {
        id: Date.now(),
        text: text,
        options: [
            { id: 'A', text: optA },
            { id: 'B', text: optB },
            { id: 'C', text: optC },
            { id: 'D', text: optD }
        ],
        correct: correct
    };

    questions.push(newQ);
    localStorage.setItem('questionBank', JSON.stringify(questions));

    alert('Question Added Successfully!');
    e.target.reset();
    renderQuestionsList();
}

window.resetQuestions = function () {
    if (confirm('Are you sure you want to reset the question bank to defaults?')) {
        localStorage.setItem('questionBank', JSON.stringify(defaultQuestions));
        renderQuestionsList();
    }
}
