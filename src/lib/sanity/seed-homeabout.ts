/**
 * Sanity Seed Script - Home About Section Only
 *
 * Run with: npx tsx src/lib/sanity/seed-homeabout.ts
 *
 * Requires SANITY_API_WRITE_TOKEN environment variable with write permissions.
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "b4t4r5i2";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-08";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("❌ SANITY_API_WRITE_TOKEN is required");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

/* ─── Helpers ─── */

async function uploadImage(filePath: string): Promise<string | null> {
  try {
    const fullPath = path.join(process.cwd(), "public", filePath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️ Image not found: ${fullPath}`);
      return null;
    }
    const buffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload("image", buffer, {
      filename: path.basename(filePath),
    });
    console.log(`📤 Uploaded image: ${asset._id}`);
    return asset._id;
  } catch (err) {
    console.error(`❌ Failed to upload ${filePath}:`, err);
    return null;
  }
}

function imageRef(assetId: string | null) {
  if (!assetId) return undefined;
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
  };
}

/* ─── Seed Home About ─── */

async function seedHomeAbout() {
  console.log(`\n🏠 Seeding Home About Us Section...`);

  // Upload the image
  const imageAssetId = await uploadImage("/IMG-20230417-WA0004.jpg");

  // The content to seed
  const content = {
    _type: "homeAbout",
    _id: "homeAbout-main",
    title: "Turning a Government-School Child's Hope into a <span>Degree</span>",
    description: "We are a passionate community of volunteers dedicated to bridging the educational divide. By providing scholarships, mentorship, and essential resources like digital tools, we empower underprivileged students across India to build a brighter, self-reliant future.",
    image: imageRef(imageAssetId),
    statsLabel: "15k+",
    statsText: "STUDENTS SUPPORTED",
    orderRank: "0|100000:",
  };

  await client.createOrReplace(content);
  console.log(`✅ Home About Us Section seeded successfully!`);
}

/* ─── Main ─── */

async function main() {
  console.log("🌱 Starting Sanity seed for Home About...");

  await seedHomeAbout();

  console.log("\n🎉 Home About data seeded successfully!");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
