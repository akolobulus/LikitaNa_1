
// Chat functionality with Gemini AI integration
let currentLanguage = 'en';
let isRecording = false;
let recognition = null;

// Language mappings
const languages = {
    'en': 'English',
    'ha': 'Hausa', 
    'yo': 'Yoruba',
    'ig': 'Igbo',
    'pcm': 'Pidgin'
};

// Gemini API configuration
const GEMINI_API_KEY = 'AIzaSyDGpSoq8nL9xQGhJyWJGgJvLo8mVxKtPaA'; // Replace with your actual API key
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Initialize speech recognition
function initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = getLanguageCode(currentLanguage);
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('chatInput').value = transcript;
            sendMessage();
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            stopRecording();
        };
        
        recognition.onend = function() {
            stopRecording();
        };
    }
}

function getLanguageCode(lang) {
    const langCodes = {
        'en': 'en-US',
        'ha': 'ha-NG',
        'yo': 'yo-NG', 
        'ig': 'ig-NG',
        'pcm': 'en-NG'
    };
    return langCodes[lang] || 'en-US';
}

function setLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('currentLang').textContent = languages[lang];
    
    if (recognition) {
        recognition.lang = getLanguageCode(lang);
    }
    
    // Update UI text based on language
    updateUILanguage(lang);
}

function updateUILanguage(lang) {
    const translations = {
        'en': {
            placeholder: 'Type your message or describe your symptoms...',
            greeting: 'Hello! I\'m your health assistant. How can I help you today?'
        },
        'ha': {
            placeholder: 'Rubuta sakonka ko bayyana alamun rashin lafiya...',
            greeting: 'Sannu! Ni mai taimakon lafiya. Yaya zan iya taimaka maka yau?'
        },
        'yo': {
            placeholder: 'Ko ifiranṣe rẹ tabi ṣe apejuwe awọn ami aisan...',
            greeting: 'Bawo! Emi ni oluranlowo ilera. Bawo ni mo ṣe le ran ọ lọwọ loni?'
        },
        'ig': {
            placeholder: 'Dee ozi gị ma ọ bụ kọwaa mgbaàmà ọrịa...',
            greeting: 'Ndewo! Abụ m onye inyeaka ahụike. Kedu ka m ga-esi nyere gị aka taa?'
        },
        'pcm': {
            placeholder: 'Type your message or talk wetin dey worry you...',
            greeting: 'How far! I be your health helper. How I fit help you today?'
        }
    };
    
    const translation = translations[lang] || translations['en'];
    document.getElementById('chatInput').placeholder = translation.placeholder;
}

function toggleVoiceInput() {
    if (!recognition) {
        initializeSpeechRecognition();
    }
    
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
}

function startRecording() {
    if (recognition) {
        isRecording = true;
        document.getElementById('voiceBtn').classList.add('recording');
        recognition.start();
    }
}

function stopRecording() {
    isRecording = false;
    document.getElementById('voiceBtn').classList.remove('recording');
    if (recognition) {
        recognition.stop();
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendQuickMessage(message) {
    document.getElementById('chatInput').value = message;
    sendMessage();
}

function addMessage(message, isUser = false) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const sender = isUser ? 'You' : 'LikitaNa';
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    document.getElementById('typingIndicator').style.display = 'block';
}

function hideTypingIndicator() {
    document.getElementById('typingIndicator').style.display = 'none';
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Call Gemini AI
        const response = await callGeminiAPI(message);
        hideTypingIndicator();
        addMessage(response);
        
        // Update user progress for gamification
        updateUserProgress(message);
        
    } catch (error) {
        hideTypingIndicator();
        console.error('Error calling AI:', error);
        addMessage('Sorry, I\'m having trouble connecting right now. Please try again later.');
    }
}

async function callGeminiAPI(userMessage) {
    const systemPrompt = `You are LikitaNa, a helpful health assistant for Nigerian communities. Respond in ${languages[currentLanguage]} language. 

Key guidelines:
- Provide basic health advice and symptom guidance
- Always recommend seeing a healthcare professional for serious concerns
- Be culturally sensitive to Nigerian context
- Keep responses concise and easy to understand
- For location requests, mention checking the Centers page
- Include relevant health tips when appropriate
- End with: "Remember, I'm not a doctor—if in doubt, please see a healthcare professional."

User message: ${userMessage}`;

    const requestBody = {
        contents: [{
            parts: [{
                text: systemPrompt
            }]
        }]
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

function updateUserProgress(message) {
    // Simple gamification - award points for engagement
    let userStats = JSON.parse(localStorage.getItem('userStats')) || {
        messagesCount: 0,
        badges: [],
        points: 0
    };
    
    userStats.messagesCount++;
    userStats.points += 10;
    
    // Award badges based on activity
    if (userStats.messagesCount >= 5 && !userStats.badges.includes('communicator')) {
        userStats.badges.push('communicator');
        addMessage('🎉 Congratulations! You earned the Communicator badge!');
    }
    
    if (userStats.messagesCount >= 20 && !userStats.badges.includes('health-seeker')) {
        userStats.badges.push('health-seeker');
        addMessage('🎉 Amazing! You earned the Health Seeker badge!');
    }
    
    localStorage.setItem('userStats', JSON.stringify(userStats));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeSpeechRecognition();
    setLanguage('en');
});
