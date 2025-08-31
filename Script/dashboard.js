
// Dashboard functionality for both Pro and Free users
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Update user display name
    const nameElement = document.getElementById('userDisplayName');
    if (nameElement && currentUser.name) {
        nameElement.textContent = currentUser.name.split(' ')[0];
    }
    
    const userNameElement = document.getElementById('userName');
    if (userNameElement && currentUser.name) {
        userNameElement.textContent = currentUser.name;
    }
});

// Navigation functions
function goToChat() {
    window.location.href = 'chat.html';
}

function goToCenters() {
    window.location.href = 'center.html';
}

function goToLearn() {
    window.location.href = 'learn.html';
}

// Pro user functions
function startConsultation() {
    if (currentUser.subscription === 'pro') {
        alert('🩺 Connecting you to a licensed doctor... This feature would integrate with telemedicine providers in a real implementation.');
    } else {
        showProPrompt();
    }
}

function viewRecords() {
    if (currentUser.subscription === 'pro') {
        alert('📋 Your health records would be displayed here. This would integrate with EMR systems in a real implementation.');
    } else {
        showProPrompt();
    }
}

function setReminders() {
    if (currentUser.subscription === 'pro') {
        alert('💊 Medicine reminder system would be configured here. This would include push notifications in a real implementation.');
    } else {
        showProPrompt();
    }
}

// Show Pro upgrade prompt
function showProPrompt() {
    const modal = document.createElement('div');
    modal.className = 'pro-prompt-modal';
    modal.innerHTML = `
        <div class="pro-prompt-content">
            <h3>🌟 Upgrade to Pro</h3>
            <p>This feature is available for Pro users only.</p>
            <div class="pro-benefits">
                <p>✓ Live doctor consultations</p>
                <p>✓ Personal health records</p>
                <p>✓ Smart medicine reminders</p>
                <p>✓ Priority support</p>
            </div>
            <div class="pro-pricing">
                <span class="price">₦900/month</span>
            </div>
            <div class="pro-actions">
                <button onclick="upgradeToPro()" class="upgrade-btn">Upgrade Now</button>
                <button onclick="closeProPrompt()" class="cancel-btn">Maybe Later</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .pro-prompt-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .pro-prompt-content {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            text-align: center;
            max-width: 400px;
            margin: 1rem;
        }
        .pro-benefits p {
            margin: 0.5rem 0;
            color: var(--primary-color);
        }
        .price {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary-color);
        }
        .pro-actions {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        .upgrade-btn, .cancel-btn {
            flex: 1;
            padding: 0.75rem;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: bold;
        }
        .upgrade-btn {
            background: var(--primary-color);
            color: white;
        }
        .cancel-btn {
            background: #f8f9fa;
            color: var(--text-dark);
        }
    `;
    document.head.appendChild(style);
}

function closeProPrompt() {
    const modal = document.querySelector('.pro-prompt-modal');
    if (modal) {
        modal.remove();
    }
}

function upgradeToPro() {
    // Simulate upgrade process
    currentUser.subscription = 'pro';
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('userSubscription', 'pro');
    
    alert('🎉 Congratulations! You are now a Pro user. Redirecting to Pro dashboard...');
    
    setTimeout(() => {
        window.location.href = 'dashboard-pro.html';
    }, 1500);
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userSubscription');
    window.location.href = 'Index.html';
}

// Add dashboard styles
const dashboardStyles = document.createElement('style');
dashboardStyles.textContent = `
    .user-info {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .logout-btn {
        background: #dc3545;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.9rem;
    }
    
    .dashboard-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        padding-bottom: calc(2rem + 70px);
    }
    
    .welcome-card {
        background: linear-gradient(135deg, var(--primary-color), #4CAF50);
        color: white;
        padding: 2rem;
        border-radius: 1rem;
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }
    
    .feature-card {
        background: white;
        padding: 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        border: 2px solid transparent;
        transition: all 0.2s;
    }
    
    .feature-card.pro-feature {
        border-color: var(--primary-color);
        position: relative;
    }
    
    .feature-card.pro-feature::before {
        content: "PRO";
        position: absolute;
        top: -8px;
        right: 1rem;
        background: linear-gradient(45deg, #FFD700, #FFA500);
        color: #333;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.7rem;
        font-weight: bold;
    }
    
    .feature-card.locked {
        opacity: 0.6;
        background: #f8f9fa;
    }
    
    .feature-card img {
        width: 48px;
        height: 48px;
        margin-bottom: 1rem;
        filter: invert(40%) sepia(95%) saturate(1200%) hue-rotate(90deg) brightness(90%) contrast(100%);
    }
    
    .feature-btn {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: bold;
        width: 100%;
        margin-top: 1rem;
    }
    
    .feature-btn.locked {
        background: #6c757d;
        cursor: not-allowed;
    }
    
    .pro-stats, .free-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
    }
    
    .stat-card {
        background: white;
        padding: 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
    }
    
    .stat-number {
        display: block;
        font-size: 2rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-top: 0.5rem;
    }
    
    @media (max-width: 768px) {
        .dashboard-container {
            padding: 1rem;
            padding-bottom: calc(1rem + 70px);
        }
        
        .features-grid {
            grid-template-columns: 1fr;
        }
        
        .user-info span {
            display: none;
        }
    }
`;
document.head.appendChild(dashboardStyles);
