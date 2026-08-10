import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import {
  heroSlideSchema,
  newsArticleSchema,
  galleryEventSchema,
  printMediaCollectionSchema,
  successStorySchema,
} from "./src/lib/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "b4t4r5i2";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "vadaanya-studio",
  title: "Vadaanya Studio",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      heroSlideSchema,
      newsArticleSchema,
      galleryEventSchema,
      printMediaCollectionSchema,
      successStorySchema,
    ],
  },
});
