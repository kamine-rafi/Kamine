module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const apiKey = process.env.OPENAI_API_KEY; // Vercel-এ আগের নামটাই থাকবে, শুধু ভেতরে Groq Key বসবে

  if (!apiKey) {
    return res.status(500).json({ error: "API Key is missing in Vercel settings." });
  }

  try {
    // এখানে আমরা Groq-এর অতি দ্রুতগতির এবং ফ্রি সার্ভার ব্যবহার করছি
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Groq-এর অন্যতম সেরা এবং দ্রুতগতির মডেল
        messages: [
          { role: 'system', content: 'You are Kamine, a helpful AI assistant. You address the user as Boss.' },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0]) {
      return res.status(200).json({ reply: data.choices[0].message.content });
    } else {
      return res.status(500).json({ error: 'Invalid response from AI Server', details: data });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
