import { createClient } from '@vercel/kv';

// KV client is initialized inside handler

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let kv;
  try {
    const url = "https://rapid-cub-172018.upstash.io";
    const token = "gQAAAAAAAp_yAAIgcDJmZTMwMWE2ZDU4NWM0OWE5OWNhYjllNDZmMTA3Y2NkZQ";
    
    kv = createClient({ url, token });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to init db: ' + err.message });
  }

  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: 'Name and password are required' });
    }

    const normalizedName = name.trim().toLowerCase();
    const userKey = `user:${normalizedName}`;

    // Check if user exists
    const user = await kv.hgetall(userKey);

    if (user && Object.keys(user).length > 0) {
      // User exists, verify password
      if (String(user.password) !== String(password)) {
        return res.status(401).json({ error: 'Incorrect password for this name.' });
      }
      return res.status(200).json({ success: true, message: 'Login successful', hasWritten: user.hasWritten });
    } else {
      // User does not exist, create new
      await kv.hset(userKey, {
        password: password,
        hasWritten: false,
        displayName: name.trim() // preserve original casing for display
      });
      return res.status(201).json({ success: true, message: 'Account created successfully', hasWritten: false });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
