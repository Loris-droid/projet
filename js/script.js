// Simple chat logic to call an AI API (e.g., OpenAI). Replace YOUR_API_KEY with a valid key.
const form = document.getElementById('chat-form');
const messages = document.getElementById('messages');
const userInput = document.getElementById('user-input');

async function sendMessage(text) {
  const userDiv = document.createElement('div');
  userDiv.textContent = `Vous: ${text}`;
  messages.appendChild(userDiv);

  const responseDiv = document.createElement('div');
  responseDiv.textContent = 'IA: ...';
  messages.appendChild(responseDiv);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: text }]
      })
    });
    const data = await response.json();
    const aiText = data.choices?.[0]?.message?.content || 'Erreur de réponse';
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
