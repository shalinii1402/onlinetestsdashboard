# Online Exams Dashboard

A comprehensive, responsive online examination system featuring a Student Dashboard and an Admin Panel.

## Features

### Student Portal
- **Dashboard**: View statistics, upcoming tests, and profile.
- **Exam System**: 
    - Real-time countdown timer (auto-submit on zero).
    - Dynamic question rendering.
    - Question palette (track answered/unvisited).
- **Results & Certification**:
    - Instant scoring and pass/fail analysis.
    - **Downloadable Certificate** upon passing.
- **Authentication**: Simple login simulation stored in browser `localStorage`.

### Admin Portal
- **Dashboard**: Overview of system activity and stats.
- **Question Bank**: 
    - Add new questions to the global bank.
    - Questions added here immediately appear in Student tests.

## Setup Instructions

1. **Open the Project Folder**: Navigate to the folder containing these files.
2. **Launch**: Open `index.html` or `login.html` in any modern web browser (Chrome, Edge, Firefox).
3. **Login Credentials** (Demo):
    - **Student**: Any email (e.g., `student@test.com`) | Pass: `123456` | Role: *Student*
    - **Admin**: Any email (e.g., `admin@test.com`) | Pass: `123456` | Role: *Admin*

## Technical Details
- **Tech Stack**: HTML5, CSS3 (Variables, Flex/Grid), Vanilla JavaScript.
- **Data Persistence**: Uses `localStorage` to simulate a database. Data persists across refreshing until cache is cleared.
- **Design**: Premium Blue/White aesthetic with responsive mobile-first layout (Inter font).

## How to Test
1. Login as **Admin**.
2. Go to **Question Bank** and add a new question.
3. Logout and Login as **Student**.
4. Start "Advanced Calculus" exam.
5. Verify the new question appears and complete the test.
6. If scored > 50%, download the Certificate!
