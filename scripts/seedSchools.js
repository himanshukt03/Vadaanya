const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

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
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const client = new Client({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function seed() {
  try {
    await client.connect();
    const mandalsRes = await client.query("SELECT id, name FROM public.mandals;");
    console.log(`Seeding schools for ${mandalsRes.rows.length} mandals...`);

    let totalSchools = 0;
    for (const m of mandalsRes.rows) {
      const schools = [
        { name: `ZPHS (Zilla Parishad High School), ${m.name}`, cat: 'ZPHS' },
        { name: `Government High School (Boys), ${m.name}`, cat: 'Govt' },
        { name: `Government High School (Girls), ${m.name}`, cat: 'Govt' },
        { name: `AP Model School & Junior College, ${m.name}`, cat: 'Model' },
        { name: `KGBV (Kasturba Gandhi Balika Vidyalaya), ${m.name}`, cat: 'KGBV' },
        { name: `Municipal High School, ${m.name}`, cat: 'Govt' }
      ];

      for (const s of schools) {
        await client.query(`
          INSERT INTO public.schools (mandal_id, name, category)
          VALUES ($1, $2, $3)
          ON CONFLICT DO NOTHING;
        `, [m.id, s.name, s.cat]);
        totalSchools++;
      }
    }

    const countRes = await client.query("SELECT COUNT(*) FROM public.schools;");
    console.log(` Successfully seeded schools! Total schools in database: ${countRes.rows[0].count}`);
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await client.end();
  }
}

seed();
