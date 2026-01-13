// Future: Fetch stats and test data from an API or localStorage
// For now, the HTML contains the mock data directly for immediate visual feedback.

document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard loaded');
    // We can add dynamic greeting based on time of day
    const hour = new Date().getHours();
    const welcomeText = document.querySelector('.welcome-text p');

    if (welcomeText) {
        if (hour < 12) welcomeText.textContent = 'Good Morning! Ready to start your exam?';
        else if (hour < 18) welcomeText.textContent = 'Good Afternoon! Keep up the good work.';
        else welcomeText.textContent = 'Good Evening! Time for some revision?';
    }
});
