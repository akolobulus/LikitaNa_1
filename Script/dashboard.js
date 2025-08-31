
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
    // Open payment modal for upgrade
    showPaymentModal();
}

function showPaymentModal() {
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="payment-modal-content">
            <span class="close-payment" onclick="closePaymentModal()">&times;</span>
            <h2>Upgrade to LikitaNa Pro</h2>
            <div class="subscription-details">
                <div class="price-display">
                    <span class="currency">₦</span>
                    <span class="amount">900</span>
                    <span class="period">/month</span>
                </div>
                
                <div class="pro-features-list">
                    <div class="feature-item">
                        <img src="./icons/healthcare.png" alt="Doctor" width="20" height="20">
                        <span>Live consultations with licensed doctors</span>
                    </div>
                    <div class="feature-item">
                        <img src="./icons/note.png" alt="Records" width="20" height="20">
                        <span>Personal health records & history</span>
                    </div>
                    <div class="feature-item">
                        <img src="./icons/medicine.png" alt="Reminders" width="20" height="20">
                        <span>Smart medicine & vaccine reminders</span>
                    </div>
                    <div class="feature-item">
                        <img src="./icons/trophy.png" alt="Wellness" width="20" height="20">
                        <span>Exclusive wellness challenges</span>
                    </div>
                </div>
                
                <div class="payment-form">
                    <div class="form-group">
                        <label for="upgradeUserName">Full Name *</label>
                        <input type="text" id="upgradeUserName" value="${currentUser.name}" required>
                    </div>
                    <div class="form-group">
                        <label for="upgradeUserEmail">Email Address *</label>
                        <input type="email" id="upgradeUserEmail" value="${currentUser.email}" required>
                    </div>
                    <div class="form-group">
                        <label for="upgradeUserPhone">Phone Number *</label>
                        <input type="tel" id="upgradeUserPhone" placeholder="+234 xxx xxx xxxx" required>
                    </div>
                </div>
                <button class="pay-btn" onclick="initiateUpgradePayment()">Subscribe Now</button>
                <p class="payment-info">Secure payment via Flutterwave</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closePaymentModal() {
    const modal = document.querySelector('.payment-modal');
    if (modal) {
        modal.remove();
    }
}

function initiateUpgradePayment() {
    const amount = 900;
    const currency = 'NGN';
    const txRef = 'LIKITANA_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Get user details from form
    const customerEmail = document.getElementById('upgradeUserEmail').value;
    const customerName = document.getElementById('upgradeUserName').value;
    const customerPhone = document.getElementById('upgradeUserPhone').value;
    
    // Validate form data
    if (!customerEmail || !customerName || !customerPhone) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (!customerEmail.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    FlutterwaveCheckout({
        public_key: 'FLWPUBK_TEST-68f8b6b6c0ada267982888334ff3725d-X',
        tx_ref: txRef,
        amount: amount,
        currency: currency,
        payment_options: "card, banktransfer, ussd, mobilemoney",
        customer: {
            email: customerEmail,
            phone_number: customerPhone,
            name: customerName,
        },
        customizations: {
            title: "LikitaNa Pro Subscription",
            description: "Monthly subscription to LikitaNa Pro features",
            logo: "./images/logo.png",
        },
        callback: function (data) {
            console.log('Payment successful:', data);
            handleUpgradePaymentSuccess(data);
        },
        onclose: function() {
            console.log('Payment modal closed');
        }
    });
}

function handleUpgradePaymentSuccess(paymentData) {
    // Update user subscription
    currentUser.subscription = 'pro';
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('userSubscription', 'pro');
    localStorage.setItem('subscriptionDate', new Date().toISOString());
    localStorage.setItem('paymentReference', paymentData.tx_ref);
    
    // Close payment modal
    closePaymentModal();
    
    alert('🎉 Welcome to LikitaNa Pro! Your subscription is now active. Redirecting to Pro dashboard...');
    
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
    
    .payment-modal {
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
    
    .payment-modal-content {
        background: white;
        margin: 5% auto;
        padding: 2rem;
        border-radius: 1rem;
        width: 90%;
        max-width: 500px;
        position: relative;
        animation: modalSlideIn 0.3s ease;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    @keyframes modalSlideIn {
        from { opacity: 0; transform: translateY(-50px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .close-payment {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        position: absolute;
        right: 1rem;
        top: 1rem;
    }
    
    .close-payment:hover {
        color: #000;
    }
    
    .payment-modal .price-display {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 2rem;
        color: var(--primary-color);
    }
    
    .payment-modal .currency {
        font-size: 1.5rem;
        vertical-align: top;
    }
    
    .payment-modal .amount {
        font-weight: bold;
    }
    
    .payment-modal .period {
        font-size: 1rem;
        color: #666;
    }
    
    .payment-modal .pro-features-list {
        margin-bottom: 2rem;
    }
    
    .payment-modal .feature-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.8rem 0;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .payment-modal .feature-item:last-child {
        border-bottom: none;
    }
    
    .payment-modal .payment-form {
        margin: 1.5rem 0;
    }
    
    .payment-modal .form-group {
        margin-bottom: 1rem;
    }
    
    .payment-modal .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: var(--text-dark);
    }
    
    .payment-modal .form-group input {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid var(--primary-color);
        border-radius: 0.5rem;
        font-size: 1rem;
        box-sizing: border-box;
    }
    
    .payment-modal .form-group input:focus {
        outline: none;
        border-color: #20c997;
        box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
    }
    
    .payment-modal .pay-btn {
        background: linear-gradient(45deg, #28a745, #20c997);
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 1.1rem;
        font-weight: bold;
        width: 100%;
        transition: transform 0.2s;
    }
    
    .payment-modal .pay-btn:hover {
        transform: translateY(-1px);
    }
    
    .payment-modal .payment-info {
        text-align: center;
        margin-top: 1rem;
        color: #666;
        font-size: 0.9rem;
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
        
        .payment-modal-content {
            margin: 2% auto;
            padding: 1.5rem;
            width: 95%;
        }
    }
`;
document.head.appendChild(dashboardStyles);
