require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Test connection on startup
supabase.from('orders').select('count', { count: 'exact', head: true })
  .then(({ error }) => {
    if (error) {
      console.warn('⚠️  Supabase connection issue:', error.message);
    } else {
      console.log('✅ Connected to Supabase (HTTPS)');
    }
  });

module.exports = supabase;
