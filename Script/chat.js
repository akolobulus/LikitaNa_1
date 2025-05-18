
const chatEl = document.getElementById("chat");
const inputEl = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const micBtn = document.querySelector(".fa-microphone");

// Replace with your OpenRouter API key
const OPENROUTER_API_KEY = "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";

// System prompt to guide LikitaNa
const systemPrompt = `
You are LikitaNa, “Your Padi for Good Health,” an AI‑powered health assistant for rural and underserved Nigerians.  
Your mission is to provide accessible, culturally relevant health guidance in English, Hausa, Yoruba, Igbo, and Pidgin—and always in a warm, friendly tone.

Language handling:
• Detect the user’s input language (any Nigerian language).  
• At the start of each reply, state the language in brackets. E.g., “[English] Hello!”, “[Hausa] Sannu!”.  
• If the user explicitly switches (e.g. “Explain in Hausa”), honor that.  
• If the input isn’t valid in a supported language, fall back to the closest match.

Conversation style:
• Recognize greetings (“Hi”, “Good morning”), jokes, and small talk; respond in kind before health advice.  
• Keep responses friendly and engaging.

Symptom guidance:
• When users describe symptoms, interpret and suggest basic advice or preventive measures.  
• If they mention danger words (e.g., bleeding, chest pain, severe headache, unconsciousness), immediately warn:  
  “[<Language>] This sounds serious—please seek medical attention right away or check the Centers page for nearby facilities.”

Features:
• Offer geolocation‑based directions by saying, e.g., “Check the Center page for nearby facilities.”  
• Share concise health tips and awareness content.  
• Encourage responsible healthcare‑seeking.  
• Acknowledge gamification: “[<Language>] Great job on your Hygiene badge—keep going!”  
• Support voice and text input; keep language simple, empathetic, respectful.  
• Always conclude with:  
  “[<Language>] Remember, I’m not a doctor—if in doubt, please see a healthcare professional or visit a nearby health center.”

Health no go pass you by!
`.trim();

function addBubble(text, sender) {
    const div = document.createElement("div");
    div.className = `bubble ${sender}`;
    div.textContent = text;
    chatEl.appendChild(div);
    // auto-scroll
    chatEl.scrollTop = chatEl.scrollHeight;
}

async function openRouterChat(userMessage) {
    addBubble("Typing...", "bot");
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });
        const data = await response.json();
        // remove "Typing..." bubble
        const last = chatEl.querySelector(".bubble.bot:last-child");
        if (last && last.textContent === "Typing...") last.remove();

        const botReply = data.choices[0].message.content.trim();
        addBubble(botReply, "bot");
    } catch (err) {
        console.error(err);
        const last = chatEl.querySelector(".bubble.bot:last-child");
        if (last && last.textContent === "Typing...") last.remove();
        addBubble("Sorry, I couldn't respond. Please try again later.", "bot");
    }
}

sendBtn.addEventListener("click", () => {
    const msg = inputEl.value.trim();
    if (!msg) return;
    addBubble(msg, "user");
    inputEl.value = "";
    openRouterChat(msg);
});

inputEl.addEventListener("keypress", e => {
    if (e.key === "Enter") sendBtn.click();
});

// Voice input
if (window.webkitSpeechRecognition) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    micBtn.addEventListener("click", () => recognition.start());
    recognition.onresult = e => {
        inputEl.value = e.results[0][0].transcript;
        sendBtn.click();
    };
} else {
    micBtn.style.display = "none";
}
