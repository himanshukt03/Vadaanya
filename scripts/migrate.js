const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

// Load .env.local
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ Error: DIRECT_URL or DATABASE_URL not found in .env.local");
  process.exit(1);
}

console.log("Connecting to Supabase PostgreSQL database...");

const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});

async function run() {
  try {
    await client.connect();
    console.log(" Connected to Supabase PostgreSQL successfully!");

    const migrationSqlPath = path.join(__dirname, "..", "supabase", "migrations", "20261005000000_init_talent_test.sql");
    const sql = fs.readFileSync(migrationSqlPath, "utf8");

    console.log("Applying migration 20261005000000_init_talent_test.sql...");
    await client.query(sql);
    console.log(" Migration applied successfully!");

    // Verification queries
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log("\n Tables created in public schema:");
    tablesRes.rows.forEach(r => console.log(`   - ${r.table_name}`));

    const districtRes = await client.query("SELECT code, name, quota_max, registered_count FROM public.districts;");
    console.log("\n🏛️ Districts Seeded:");
    districtRes.rows.forEach(d => console.log(`   - [${d.code}] ${d.name}: Quota ${d.quota_max} (Registered: ${d.registered_count})`));

    const mandalCountRes = await client.query("SELECT COUNT(*) FROM public.mandals;");
    console.log(`\n📍 Mandals Seeded: ${mandalCountRes.rows[0].count} mandals`);

    const funcRes = await client.query(`
      SELECT routine_name 
      FROM information_schema.routines 
      WHERE routine_schema = 'public' AND routine_name = 'complete_student_registration';
    `);
    if (funcRes.rows.length > 0) {
      console.log(" Atomic Quota Function: complete_student_registration() is ACTIVE");
    }

    console.log("\n Database build and verification 100% complete!");
  } catch (err) {
    console.error("❌ Migration error:", err.message);
    if (err.detail) console.error("Detail:", err.detail);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
