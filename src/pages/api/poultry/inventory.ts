import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type ResponseData = {
  success?: boolean;
  data?: any;
  error?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req;

  try {
    // GET: Fetch all inventory records
    if (method === 'GET') {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json({ success: true, data });
    }

    // POST: Create new inventory entry
    if (method === 'POST') {
      const { farm_id, bird_count, feed_amount, mortality, notes } = req.body;

      // Validation
      if (!farm_id || !bird_count) {
        return res.status(400).json({
          error: 'Missing required fields: farm_id, bird_count',
        });
      }

      const { data, error } = await supabase
        .from('inventory')
        .insert([
          {
            farm_id,
            bird_count,
            feed_amount,
            mortality,
            notes,
            recorded_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(201).json({ success: true, data: data?.[0] });
    }

    // PUT: Update inventory entry
    if (method === 'PUT') {
      const { id, ...updates } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Missing record ID' });
      }

      const { data, error } = await supabase
        .from('inventory')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json({ success: true, data: data?.[0] });
    }

    // DELETE: Delete inventory entry
    if (method === 'DELETE') {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Missing record ID' });
      }

      const { error } = await supabase
        .from('inventory')
        .delete()
        .eq('id', id);

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json({ success: true, message: 'Record deleted' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
