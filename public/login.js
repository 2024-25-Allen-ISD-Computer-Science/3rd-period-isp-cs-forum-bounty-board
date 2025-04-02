// Initialize PocketBase
const pb = new PocketBase('http://your-pocketbase-url');

// Theme toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const htmlElement = document.documentElement;

// Check for saved theme preference or use system preference
const getThemePreference = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply the theme
const applyTheme = (theme) => {
    if (theme === 'dark') {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
};

// Initialize theme
applyTheme(getThemePreference());

// Toggle theme when button is clicked
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

// Login form submission
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Authenticate with PocketBase
        const authData = await pb.collection('users').authWithPassword(email, password);

        console.log('Logged in successfully:', authData);

        // Redirect to dashboard or home page after successful login
        window.location.href = '/dashboard.html';
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed: ' + error.message);
    }
});