// Auth Logic using localStorage

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    // Check if we are on a protected page
    const path = window.location.pathname;
    const isLoginPage = path.includes('login.html');
    const userRole = localStorage.getItem('userRole');

    if (!isLoginPage) {
        if (!userRole) {
            // Not logged in, redirect to login
            window.location.href = 'login.html';
        } else {
            // Logged in, check role permission
            if (path.includes('admin') && userRole !== 'admin') {
                alert('Access Denied: Admins only.');
                window.location.href = 'index.html';
            }
        }
    } else {
        // We are on login page, redirect if already logged in
        if (userRole === 'student') window.location.href = 'index.html';
        if (userRole === 'admin') window.location.href = 'admin_dashboard.html';
    }

    // Handle Login Submit
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const role = document.getElementById('role').value;
            const email = document.getElementById('email').value;

            // Simulating basic auth
            localStorage.setItem('userRole', role);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', email.split('@')[0]); // Mock name from email

            if (role === 'admin') {
                window.location.href = 'admin_dashboard.html';
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    // Logout Handler (attach to any logout button found)
    const logoutBtns = document.querySelectorAll('a[href*="logout"], .logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('userRole');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            window.location.href = 'login.html';
        });
    });
});
