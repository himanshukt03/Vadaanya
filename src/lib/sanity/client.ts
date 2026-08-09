import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "b4t4r5i2";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-08";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Fast, cached published-content reads
});
