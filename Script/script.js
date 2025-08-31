
// Main application script with subscription and payment functionality
let currentLanguage = 'en';
let userSubscription = localStorage.getItem('userSubscription') || 'free';

// Language translations
const translations = {
    'en': {
        title: 'LikitaNa',
        slogan: '"Your Padi for Good Health"',
        feature1: 'AI Health Assistant',
        feature2: '5 Nigerian Languages', 
        feature3: 'Find Health Centers',
        feature4: 'Health Education',
        startBtn: 'Start Chat'
    },
    'ha': {
        title: 'LikitaNa',
        slogan: '"Abokinka don Lafiya Mai Kyau"',
        feature1: 'Mai Taimakon Lafiya na AI',
        feature2: 'Harsuna 5 na Najeriya',
        feature3: 'Nemo Cibiyoyin Lafiya',
        feature4: 'Ilimin Lafiya',
        startBtn: 'Fara Hira'
    },
    'yo': {
        title: 'LikitaNa',
        slogan: '"Ọrẹ Rẹ Fun Ilera To Dara"',
        feature1: 'Oluranlowo Ilera AI',
        feature2: 'Ede Naijiria 5',
        feature3: 'Wa Ile-iwosan',
        feature4: 'Eko Ilera',
        startBtn: 'Bẹrẹ Ibaraẹnisọrọ'
    },
    'ig': {
        title: 'LikitaNa',
        slogan: '"Enyi Gi Maka Ahu Ike Oma"',
        feature1: 'Onye Inyeaka Ahu Ike AI',
        feature2: 'Asusu Naijiria 5',
        feature3: 'Chọta Ulo Ọgwụ',
        feature4: 'Nkuzi Ahu Ike',
        startBtn: 'Malite Nkata'
    },
    'pcm': {
        title: 'LikitaNa',
        slogan: '"Your Padi for Good Health"',
        feature1: 'AI Health Helper',
        feature2: '5 Naija Languages',
        feature3: 'Find Hospital',
        feature4: 'Health Learning',
        startBtn: 'Start Chat'
    }
};

// Flutterwave configuration
const FLUTTERWAVE_PUBLIC_KEY = 'FLWPUBK_TEST-your-public-key-here'; // Replace with your actual public key

function setLanguage(lang) {
    currentLanguage = lang;
    const translation = translations[lang];
    
    document.getElementById('currentLang').textContent = getLanguageName(lang);
    document.getElementById('appTitle').textContent = translation.title;
    document.getElementById('appSlogan').textContent = translation.slogan;
    document.getElementById('feature1').textContent = translation.feature1;
    document.getElementById('feature2').textContent = translation.feature2;
    document.getElementById('feature3').textContent = translation.feature3;
    document.getElementById('feature4').textContent = translation.feature4;
    document.getElementById('startBtn').textContent = translation.startBtn;
}

function getLanguageName(code) {
    const names = {
        'en': 'English',
        'ha': 'Hausa',
        'yo': 'Yoruba', 
        'ig': 'Igbo',
        'pcm': 'Pidgin'
    };
    return names[code] || 'English';
}

function startChat() {
    window.location.href = 'chat.html';
}

function showPlan(planType) {
    // Update button states
    document.querySelectorAll('.plan-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="showPlan('${planType}')"]`).classList.add('active');
    
    // Show/hide plan details
    document.querySelectorAll('.plan-details').forEach(plan => plan.classList.remove('active'));
    document.getElementById(`${planType}Plan`).classList.add('active');
}

function openSubscriptionModal() {
    document.getElementById('subscriptionModal').style.display = 'block';
}

function closeSubscriptionModal() {
    document.getElementById('subscriptionModal').style.display = 'none';
}

function generateTransactionRef() {
    return 'LIKITANA_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function initiatePayment() {
    const amount = 900;
    const currency = 'NGN';
    const txRef = generateTransactionRef();
    
    // In a real app, you'd get user details from registration
    const customerEmail = prompt('Please enter your email address:');
    if (!customerEmail) return;
    
    const customerName = prompt('Please enter your full name:');
    if (!customerName) return;
    
    const customerPhone = prompt('Please enter your phone number:');
    if (!customerPhone) return;

    FlutterwaveCheckout({
        public_key: FLUTTERWAVE_PUBLIC_KEY,
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
            handlePaymentSuccess(data);
        },
        onclose: function() {
            console.log('Payment modal closed');
        }
    });
}

function handlePaymentSuccess(paymentData) {
    // In production, verify payment on your backend before activating subscription
    localStorage.setItem('userSubscription', 'pro');
    localStorage.setItem('subscriptionDate', new Date().toISOString());
    localStorage.setItem('paymentReference', paymentData.tx_ref);
    
    userSubscription = 'pro';
    
    alert('🎉 Welcome to LikitaNa Pro! Your subscription is now active. Enjoy access to live doctor consultations and premium features!');
    closeSubscriptionModal();
    
    // Update UI to reflect Pro status
    updateSubscriptionUI();
}

function updateSubscriptionUI() {
    if (userSubscription === 'pro') {
        // Add Pro badge or indicator
        const header = document.querySelector('.header h1');
        if (header && !header.querySelector('.pro-badge')) {
            const proBadge = document.createElement('span');
            proBadge.className = 'pro-badge';
            proBadge.textContent = 'PRO';
            header.appendChild(proBadge);
        }
    }
}

function checkSubscriptionStatus() {
    const subscriptionDate = localStorage.getItem('subscriptionDate');
    if (subscriptionDate && userSubscription === 'pro') {
        const subDate = new Date(subscriptionDate);
        const currentDate = new Date();
        const daysDiff = (currentDate - subDate) / (1000 * 60 * 60 * 24);
        
        // Check if subscription expired (30 days)
        if (daysDiff > 30) {
            localStorage.setItem('userSubscription', 'free');
            userSubscription = 'free';
            alert('Your LikitaNa Pro subscription has expired. Please renew to continue enjoying premium features.');
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setLanguage('en');
    checkSubscriptionStatus();
    updateSubscriptionUI();
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('subscriptionModal');
        if (event.target === modal) {
            closeSubscriptionModal();
        }
    };
});

// Export functions for other pages to use
window.userSubscription = userSubscription;
window.currentLanguage = currentLanguage;
