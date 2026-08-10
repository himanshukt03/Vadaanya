/**
 * Sanity Seed Script
 *
 * Run with: npx tsx src/lib/sanity/seed.ts
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

/* ─── Seed News Articles ─── */

async function seedNewsArticles() {
  const { newsItems } = await import("@/data/vadaanya/NewsData");

  console.log(`\n📰 Seeding ${newsItems.length} news articles...`);

  for (let i = 0; i < newsItems.length; i++) {
    const item = newsItems[i];
    const doc = {
      _type: "newsArticle",
      _id: `newsArticle-${item.id}`,
      title: item.title,
      publisher: item.publisher,
      description: item.description,
      link: item.link,
      linkLabel: item.linkLabel || "Read Article",
      tag: item.tag,
      date: item.date,
      orderRank: i,
    };

    await client.createOrReplace(doc);
    process.stdout.write(`✅ ${item.title.slice(0, 50)}...\n`);
  }

  console.log("📰 News articles seeded.");
}

/* ─── Seed Gallery Events ─── */

async function seedGalleryEvents() {
  const { galleryEvents } = await import("@/data/vadaanya/GalleryData");

  console.log(`\n📸 Seeding ${galleryEvents.length} gallery events...`);

  for (let i = 0; i < galleryEvents.length; i++) {
    const event = galleryEvents[i];

    const coverAssetId = await uploadImage(event.coverImage);
    const imageAssetIds: string[] = [];

    for (const imgPath of event.images) {
      const assetId = await uploadImage(imgPath);
      if (assetId) imageAssetIds.push(assetId);
    }

    const doc = {
      _type: "galleryEvent",
      _id: `galleryEvent-${event.id}`,
      title: event.title,
      date: event.date,
      coverImage: imageRef(coverAssetId),
      images: imageAssetIds.map((id) => imageRef(id)),
      orderRank: i,
    };

    await client.createOrReplace(doc);
    process.stdout.write(`✅ ${event.title}\n`);
  }

  console.log("📸 Gallery events seeded.");
}

/* ─── Seed Print Media Collections ─── */

async function seedPrintMediaCollections() {
  const { printMediaCollections } = await import("@/data/vadaanya/PrintMediaData");

  console.log(`\n📰 Seeding ${printMediaCollections.length} print media collections...`);

  for (let i = 0; i < printMediaCollections.length; i++) {
    const collection = printMediaCollections[i];

    const coverAssetId = await uploadImage(collection.coverImage);
    const imageAssetIds: string[] = [];

    for (const imgPath of collection.images) {
      const assetId = await uploadImage(imgPath);
      if (assetId) imageAssetIds.push(assetId);
    }

    const doc = {
      _type: "printMediaCollection",
      _id: `printMediaCollection-${collection.id}`,
      title: collection.title,
      language: collection.language,
      date: collection.date,
      coverImage: imageRef(coverAssetId),
      images: imageAssetIds.map((id) => imageRef(id)),
      orderRank: i,
    };

    await client.createOrReplace(doc);
    process.stdout.write(`✅ ${collection.title}\n`);
  }

  console.log("📰 Print media collections seeded.");
}

/* ─── Seed Success Stories ─── */

async function seedSuccessStories() {
  const { stories } = await import("@/data/vadaanya/SuccessStoriesData");

  console.log(`\n⭐ Seeding ${stories.length} success stories...`);

  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];

    const imageAssetId = await uploadImage(story.imageUrl);

    const doc = {
      _type: "successStory",
      _id: `successStory-${story.id}`,
      name: story.name,
      occupation: story.occupation,
      shortCaption: story.shortCaption,
      fullStory: story.fullStory,
      quote: story.quote,
      covered: story.covered,
      videoUrl: story.videoUrl,
      image: imageRef(imageAssetId),
      orderRank: i,
    };

    await client.createOrReplace(doc);
    process.stdout.write(`✅ ${story.name}\n`);
  }

  console.log("⭐ Success stories seeded.");
}

/* ─── Seed Milestones ─── */

async function seedMilestones() {
  const { milestonesData } = await import("@/data/vadaanya/MilestonesData");

  console.log(`\n🏆 Seeding ${milestonesData.length} milestones...`);

  for (let i = 0; i < milestonesData.length; i++) {
    const item = milestonesData[i];
    const doc = {
      _type: "milestone",
      _id: `milestone-${item.id || i + 1}`,
      year: item.year,
      desc: item.desc,
      orderRank: i,
    };

    await client.createOrReplace(doc);
    process.stdout.write(`✅ Milestone ${item.year}: ${item.desc.slice(0, 40)}...\n`);
  }

  console.log("🏆 Milestones seeded.");
}

/* ─── Main ─── */

async function main() {
  console.log("🌱 Starting Sanity seed...");

  await seedNewsArticles();
  await seedGalleryEvents();
  await seedPrintMediaCollections();
  await seedSuccessStories();
  await seedMilestones();

  console.log("\n🎉 All data seeded successfully!");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
