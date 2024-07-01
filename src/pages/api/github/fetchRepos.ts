import axios from 'axios';
import { getCookie } from 'cookies-next';

export default async function handler(req:any, res:any) {
  const token = getCookie('github_token', { req, res });

  if (!token) {
    return res.status(400).json({ error: 'Missing token' });
  }

  try {
    const userRepos = await axios.get('https://api.github.com/user/repos', {
      headers: { Authorization: `token ${token}` },
    });

    res.status(200).json(userRepos.data);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}