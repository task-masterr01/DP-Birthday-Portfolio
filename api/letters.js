import { createClient } from '@vercel/kv';

// KV client is initialized inside handler

export default async function handler(req, res) {
  let kv;
  try {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    
    if (!url || !token) {
      const keys = Object.keys(process.env).filter(k => k.includes('UPSTASH') || k.includes('KV') || k.includes('REDIS'));
      return res.status(500).json({ error: 'Database not linked. Available keys: ' + keys.join(', ') });
    }

    kv = createClient({ url, token });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to init db: ' + err.message });
  }

  if (req.method === 'POST') {
    try {
      const { name, password, photo, message, from } = req.body;

      if (!name || !password || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const normalizedName = name.trim().toLowerCase();
      const userKey = `user:${normalizedName}`;

      // Verify user and password
      const user = await kv.hgetall(userKey);
      
      if (!user || Object.keys(user).length === 0) {
        return res.status(401).json({ error: 'User not found. Please log in first.' });
      }

      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid password.' });
      }

      if (user.hasWritten) {
        return res.status(403).json({ error: 'You have already submitted your letter!' });
      }

      // Construct letter object
      const newLetter = {
        id: Date.now().toString(),
        name: user.displayName, // Use original casing
        photo: photo || null,
        message: message.trim(),
        from: from.trim(),
        createdAt: new Date().toISOString()
      };

      // Add to letters list
      await kv.lpush('all_letters', JSON.stringify(newLetter));

      // Mark user as having written
      await kv.hset(userKey, { hasWritten: true });

      return res.status(201).json({ success: true, letter: newLetter });
    } catch (error) {
      console.error('Error posting letter:', error);
      return res.status(500).json({ error: error.message || 'Internal server error' });
    }
  } 
  
  if (req.method === 'GET') {
    try {
      // Get all letters from the list
      // lrange from 0 to -1 gets all elements
      const lettersData = await kv.lrange('all_letters', 0, -1);
      
      // kv.lrange parses JSON automatically if stored via kv.lpush, 
      // but let's be safe in case it returns strings
      const letters = lettersData.map(item => typeof item === 'string' ? JSON.parse(item) : item);

      return res.status(200).json(letters);
    } catch (error) {
      console.error('Error fetching letters:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
