import * as SecureStore from 'expo-secure-store';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

class OpenAIService {
  async setApiKey(apiKey) {
    try {
      await SecureStore.setItemAsync('openai_api_key', apiKey);
      return true;
    } catch (error) {
      console.error('Error storing API key:', error);
      return false;
    }
  }

  async getApiKey() {
    try {
      return await SecureStore.getItemAsync('openai_api_key');
    } catch (error) {
      console.error('Error retrieving API key:', error);
      return null;
    }
  }

  async hasApiKey() {
    const apiKey = await this.getApiKey();
    return !!apiKey;
  }

  async analyzeRizz(text, context = '') {
    const apiKey = await this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found. Please set your API key in settings.');
    }

    const prompt = `
You are a charismatic and witty AI dating coach. Analyze the following pickup line/rizz attempt and provide detailed feedback.

Rizz: "${text}"
Context: ${context}

Please provide:
1. Tone (one word: e.g., Romantic, Playful, Confident, Cheesy, Bold)
2. Cleverness score (1-10)
3. Boldness score (1-10)
4. Overall effectiveness score (1-10)
5. Constructive suggestions for improvement (2-3 sentences)
6. A fun, encouraging comment about their attempt

Format your response as JSON with these exact keys: tone, cleverness, boldness, overallScore, suggestions, encouragement
`;

    try {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert dating coach and rizz analyzer. Always respond in valid JSON format.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const analysisText = data.choices[0].message.content;
      
      try {
        return JSON.parse(analysisText);
      } catch (parseError) {
        // Fallback if JSON parsing fails
        return {
          tone: 'Unknown',
          cleverness: 5,
          boldness: 5,
          overallScore: 5,
          suggestions: analysisText,
          encouragement: 'Keep practicing your rizz game!'
        };
      }
    } catch (error) {
      console.error('Error analyzing rizz:', error);
      throw error;
    }
  }

  async generateRizzSuggestion(scenario, style = 'confident') {
    const apiKey = await this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found. Please set your API key in settings.');
    }

    const prompt = `
You are a creative dating coach. Generate 3 original pickup lines for this scenario:

Scenario: ${scenario}
Style: ${style}

Requirements:
- Be respectful and appropriate
- Make them creative and unique
- Vary the approach (confident, funny, sweet)
- Keep each line under 20 words

Format as JSON array with objects containing: text, style, reasoning
`;

    try {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a creative dating coach. Always respond in valid JSON format.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 400,
          temperature: 0.8,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const suggestionsText = data.choices[0].message.content;
      
      try {
        return JSON.parse(suggestionsText);
      } catch (parseError) {
        // Fallback suggestions
        return [
          {
            text: "I couldn't help but notice you from across the room.",
            style: "confident",
            reasoning: "Direct and honest approach"
          }
        ];
      }
    } catch (error) {
      console.error('Error generating suggestions:', error);
      throw error;
    }
  }

  async simulateResponse(rizzLine) {
    const apiKey = await this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found. Please set your API key in settings.');
    }

    const prompt = `
You are roleplaying as someone receiving a pickup line. Respond naturally as a real person would.

Pickup line: "${rizzLine}"

Provide a realistic response that could be positive, neutral, or negative based on the line quality. Be authentic and natural.
`;

    try {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are roleplaying as a person receiving a pickup line. Respond naturally and authentically.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 100,
          temperature: 0.9,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error simulating response:', error);
      throw error;
    }
  }
}

export default new OpenAIService();
