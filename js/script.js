<script>
const form = document.getElementById('chat-form');
const messages = document.getElementById('messages');
const userInput = document.getElementById('user-input');

// Remplace par ta vraie clé API OpenRouter
const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function sendMessage(text) {
  // Affiche la question de l'utilisateur
  const userDiv = document.createElement('div');
  userDiv.textContent = `Vous: ${text}`;
  messages.appendChild(userDiv);

  // Message d'attente IA
  const responseDiv = document.createElement('div');
  responseDiv.textContent = 'IA: ...';
  messages.appendChild(responseDiv);

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://loris-droid.github.io/projet/', // Obligatoire pour les apps publiques
        'X-Title': 'Chat avec DeepSeek',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          { role: 'system', content: 'Tu es un assistant utile.' },
          { role: 'user', content: text }
        ],
        temperature: 0.7
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
</script>
