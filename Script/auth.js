
// Authentication system with demo accounts
let currentUser = null;

// Demo user accounts
const demoAccounts = {
    'prouser@gmail.com': {
        email: 'prouser@gmail.com',
        password: 'prouser',
        name: 'Joe Doe',
        subscription: 'pro'
    },
    'freeuser@gmail.com': {
        email: 'freeuser@gmail.com',
        password: 'freeuser',
        name: 'Mary Doe',
        subscription: 'free'
    }
};

// Check if user is already logged in
function checkAuthStatus() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        return true;
    }
    return false;
}

// Show login form
function showLogin() {
    document.querySelector('#authTitle').textContent = 'Welcome Back';
    document.querySelector('#authSubtitle').textContent = 'Sign in to your LikitaNa account';
    
    document.querySelectorAll('.auth-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.auth-btn').classList.add('active');
    
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
}

// Show signup form
function showSignup() {
    document.querySelector('#authTitle').textContent = 'Create Account';
    document.querySelector('#authSubtitle').textContent = 'Join LikitaNa and start your health journey';
    
    document.querySelectorAll('.auth-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-btn')[1].classList.add('active');
    
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

// Login with demo account
function loginDemo(email, password) {
    const account = demoAccounts[email];
    if (account && account.password === password) {
        currentUser = {
            email: account.email,
            name: account.name,
            subscription: account.subscription
        };
        
        // Store user data
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('userSubscription', account.subscription);
        
        showSuccessMessage(`Welcome ${account.name}! Redirecting to dashboard...`);
        
        setTimeout(() => {
            if (account.subscription === 'pro') {
                window.location.href = 'dashboard-pro.html';
            } else {
                window.location.href = 'dashboard-free.html';
            }
        }, 1500);
    }
}

// Regular login
function handleLogin(email, password) {
    const account = demoAccounts[email];
    if (account && account.password === password) {
        loginDemo(email, password);
    } else {
        showErrorMessage('Invalid email or password. Please try the demo accounts.');
    }
}

// Handle signup
function handleSignup(name, email, password, confirmPassword) {
    if (password !== confirmPassword) {
        showErrorMessage('Passwords do not match.');
        return;
    }
    
    if (password.length < 6) {
        showErrorMessage('Password must be at least 6 characters long.');
        return;
    }
    
    // For demo purposes, create a free account
    currentUser = {
        email: email,
        name: name,
        subscription: 'free'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('userSubscription', 'free');
    
    showSuccessMessage(`Account created successfully! Welcome ${name}!`);
    
    setTimeout(() => {
        window.location.href = 'dashboard-free.html';
    }, 1500);
}

// Show error message
function showErrorMessage(message) {
    removeExistingMessages();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const form = document.querySelector('.auth-form:not([style*="display: none"])');
    form.insertBefore(errorDiv, form.firstChild);
}

// Show success message
function showSuccessMessage(message) {
    removeExistingMessages();
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const form = document.querySelector('.auth-form:not([style*="display: none"])');
    form.insertBefore(successDiv, form.firstChild);
}

// Remove existing messages
function removeExistingMessages() {
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => msg.remove());
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        handleLogin(email, password);
    });
    
    // Signup form submission
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        handleSignup(name, email, password, confirmPassword);
    });
    
    // Auto-fill demo credentials on input focus
    document.getElementById('loginEmail').addEventListener('focus', function() {
        if (this.value === '') {
            this.placeholder = 'Try: prouser@gmail.com or freeuser@gmail.com';
        }
    });
});

// Export for other scripts
window.currentUser = currentUser;
window.checkAuthStatus = checkAuthStatus;
