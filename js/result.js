document.addEventListener('DOMContentLoaded', () => {
    const resultData = JSON.parse(localStorage.getItem('examResult'));

    if (!resultData) {
        // Fallback for demo if no test taken
        alert('No result found. Redirecting to dashboard.');
        window.location.href = 'index.html';
        return;
    }

    const { score, total, percentage } = resultData;

    // Update DOM
    document.getElementById('score-val').textContent = score;
    document.getElementById('score-max').textContent = `/ ${total}`;
    document.getElementById('total-q').textContent = total;
    document.getElementById('correct-q').textContent = score;
    document.getElementById('wrong-q').textContent = total - score;

    const statusEl = document.getElementById('result-status');
    const msgEl = document.getElementById('result-msg');
    const circle = document.getElementById('score-circle');

    // Update Circle Chart
    circle.style.background = `conic-gradient(var(--primary-color) ${percentage}%, #e2e8f0 ${percentage}%)`;

    if (percentage >= 50) {
        statusEl.textContent = 'Passed! 🎉';
        statusEl.classList.add('congrats');
        msgEl.textContent = 'Great job! You have cleared this assessment.';
        circle.style.background = `conic-gradient(#10b981 ${percentage}%, #e2e8f0 ${percentage}%)`;

        // Add Certificate Button
        const certBtn = document.createElement('a');
        certBtn.href = 'certificate.html';
        certBtn.target = '_blank';
        certBtn.className = 'btn btn-primary';
        certBtn.style.marginTop = '1rem';
        certBtn.textContent = 'Download Certificate';

        // Insert before retake/back buttons
        const btnContainer = document.querySelector('.score-card .btn-primary').parentElement;
        // Or just append to the status for better layout
        statusEl.parentElement.insertBefore(certBtn, btnContainer);
    } else {
        statusEl.textContent = 'Failed 😔';
        statusEl.classList.add('try-again');
        msgEl.textContent = 'You need a bit more practice. Try again!';
        circle.style.background = `conic-gradient(#ef4444 ${percentage}%, #e2e8f0 ${percentage}%)`;
    }
});
