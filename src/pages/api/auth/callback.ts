import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code required' });
    }

    // Exchange code for session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Auth callback error:', error);
      return res.status(401).json({ error: error.message });
    }

    // Set session cookie (if using cookie-based sessions)
    if (data.session) {
      res.setHeader(
        'Set-Cookie',
        `sb-auth=${JSON.stringify(data.session)};Path=/;HttpOnly;SameSite=Lax`
      );
    }

    return res.status(200).json({
      success: true,
      session: data.session,
      user: data.user,
    });
  } catch (error: any) {
    console.error('Callback handler error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
}
