require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function createTables() {
  const client = await pool.connect();
  try {
    console.log('🔧 Creating tables in Supabase...\n');

    // ── Orders table ─────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        order_id          VARCHAR(30)    PRIMARY KEY,
        customer_name     VARCHAR(150)   NOT NULL,
        email             VARCHAR(200),
        phone             VARCHAR(30)    NOT NULL,
        city              VARCHAR(100)   NOT NULL,
        payment_method    VARCHAR(30)    DEFAULT 'bank',
        items             JSONB          NOT NULL,
        subtotal          NUMERIC(10,2)  NOT NULL,
        delivery_charge   NUMERIC(10,2)  NOT NULL DEFAULT 0,
        grand_total       NUMERIC(10,2)  NOT NULL,
        bank_transfer_ref VARCHAR(200),
        tracking_number   VARCHAR(100),
        status            VARCHAR(50)    NOT NULL DEFAULT 'Pending',
        created_at        TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
        updated_at        TIMESTAMPTZ
      );
    `);
    console.log('✅ orders table ready');

    // ── Contacts table ────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id         SERIAL        PRIMARY KEY,
        name       VARCHAR(150)  NOT NULL,
        email      VARCHAR(200)  NOT NULL,
        phone      VARCHAR(30),
        subject    VARCHAR(100),
        message    TEXT          NOT NULL,
        created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
      );
    `);
    console.log('✅ contacts table ready');

    // ── Index for faster admin queries ────────────────────
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_orders_status     ON orders(status);
      CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
    `);
    console.log('✅ indexes created');

    console.log('\n🎉 All tables created successfully! Your database is ready.\n');

  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

createTables();
