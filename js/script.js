// Simple chat logic using the Google Gemini API. Replace YOUR_GEMINI_API_KEY
// with your actual key.
const form = document.getElementById('chat-form');
const messages = document.getElementById('messages');
const userInput = document.getElementById('user-input');

const GEMINI_API_KEY = 'AIzaSyBwrCB2zM1XHYw2mkWh1U-Nbolaq91yqJQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function sendMessage(text) {
  const userDiv = document.createElement('div');
  userDiv.textContent = `Vous: ${text}`;
  messages.appendChild(userDiv);

  const responseDiv = document.createElement('div');
  responseDiv.textContent = 'IA: ...';
  messages.appendChild(responseDiv);

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }]
      })
    });
    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Erreur de réponse';
    responseDiv.textContent = `IA: ${aiText}`;
  } catch (err) {
    responseDiv.textContent = 'Erreur lors de la connexion à l\'IA';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;
  userInput.value = '';
  sendMessage(text);
});
