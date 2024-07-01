import axios from 'axios';
import { setCookie } from 'cookies-next';

export default async function handler(req:any, res:any) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const { access_token } = response.data;

    if (!access_token) {
      return res.status(400).json({ error: 'Failed to retrieve access token' });
    }

    // Store token in cookie
    setCookie('github_token', access_token, { req, res, maxAge: 60 * 60 * 24 });

    res.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/github/repos`); // Redirect to the page displaying repositories
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}