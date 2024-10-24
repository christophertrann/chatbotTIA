import axios from 'axios';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const askGPT = async (userPrompt) => {
  const API_KEY = process.env.OPENAI_API_KEY;  // Récupérer la clé API depuis les variables d'environnement

  const ecoFriendlyPrompt = `
    Tu es un assistant virtuel pour proposer un voyage écoresponsable. Pour chaque réponse, concentre-toi sur récolter des informations sur les préférences de voyages comme l'âge la destination le point de départ combien de temps de voyages.
    Voici ma question : ${userPrompt}.
    Merci de prioriser des conseils qui :
    1. Réduisent l'empreinte carbone,
    2. Encouragent l'utilisation des transports écologiques (comme le vélo ou le train),
    3. Proposent des destinations qui privilégient la nature et la durabilité,
    4. Favorisent les pratiques de voyage responsables, comme le respect des cultures locales et la réduction des déchets.
  `;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: ecoFriendlyPrompt }],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Erreur lors de la requête GPT :', error.response ? error.response.data : error.message);
    return `Désolé, une erreur est survenue : ${error.message}`;
  }
};

export default askGPT;
