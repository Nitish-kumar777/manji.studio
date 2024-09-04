import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req = NextApiRequest, res = NextApiResponse) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    process.env.NEXT_PUBLIC_REDIRECT_URI
  );

  const { code } = req.query;

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Store the tokens securely (e.g., in a database or in session cookies)

  res.redirect('/');
}