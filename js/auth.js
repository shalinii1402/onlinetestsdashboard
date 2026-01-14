// Auth Logic using localStorage

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    // Page Categories
    const studentPages = ['student_dashboard.html', 'test.html', 'result.html', 'profile.html'];
    const adminPages = ['admin_dashboard.html', 'admin_questions.html', 'admin_students.html'];
    const publicPages = ['index.html', 'login.html', '']; // '' for root

    // Current State
    const path = window.location.pathname;
    const pageName = path.split('/').pop() || 'index.html';
    const userRole = localStorage.getItem('userRole');

    console.log(`Current Page: ${pageName}, User Role: ${userRole}`);

    // 1. Unauthenticated User Protection
    if (!userRole) {
        // If on a protected page, redirect to login/home
        if (studentPages.includes(pageName) || adminPages.includes(pageName)) {
            console.warn('Unauthorized access. Redirecting to home.');
            window.location.href = 'index.html';
            return;
        }
    }

    // 2. Authenticated User Redirection (Access Control & Convenience)
    if (userRole) {
        // If on public pages (Login/Home), redirect to dashboard
        if (publicPages.includes(pageName) || pageName === 'index.html' || path.endsWith('/')) {
            if (userRole === 'student') {
                window.location.href = 'student_dashboard.html';
                return;
            } else if (userRole === 'admin') {
                window.location.href = 'admin_dashboard.html';
                return;
            }
        }

        // Role-Based Access Control
        if (userRole === 'student' && adminPages.includes(pageName)) {
            alert('Access Denied: You are not an admin.');
            window.location.href = 'student_dashboard.html';
            return;
        }

        if (userRole === 'admin' && studentPages.includes(pageName)) {
            // Optional: Admins usually shouldn't take tests, but we can redirect or warn.
            // For strict separation:
            // alert('Redirecting to Admin Dashboard.');
            // window.location.href = 'admin_dashboard.html';
            // return;
            // Let's decide to redirect for 'test.html' or 'student_dashboard.html' specifically if we want strictness.
            // For now, let's redirect main student items to admin dash to prevent confusion.
            if (pageName === 'student_dashboard.html') {
                window.location.href = 'admin_dashboard.html';
                return;
            }
        }
    }


    // 3. Handle Login Submit
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const role = document.getElementById('role').value;
            const email = document.getElementById('email').value;

            // Simple Validation
            if (!role || !email) {
                alert('Please fill in all fields');
                return;
            }

            // Simulating basic auth
            localStorage.setItem('userRole', role);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', email.split('@')[0]); // Mock name from email

            // Redirect based on role
            if (role === 'admin') {
                window.location.href = 'admin_dashboard.html';
            } else {
                window.location.href = 'student_dashboard.html';
            }
        });
    }

    // 4. Logout Handler
    const logoutBtns = document.querySelectorAll('a[href*="logout"], .logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Clear all auth data
            localStorage.removeItem('userRole');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');

            // Redirect to home
            window.location.href = 'index.html';
        });
    });
});
