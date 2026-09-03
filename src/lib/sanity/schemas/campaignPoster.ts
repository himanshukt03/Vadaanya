import { defineField, defineType } from "sanity";

export const campaignPosterSchema = defineType({
  name: "campaignPoster",
  title: "Campaign Posters",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Poster Title",
      type: "string",
      description: 'Short title of the campaign poster, e.g., "Talent Test 2026 Awareness Poster"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Detailed description or context of the campaign poster (displayed when poster is clicked)",
      rows: 4,
    }),
    defineField({
      name: "posterImage",
      title: "Poster Image",
      type: "image",
      description: "High-resolution vertical/portrait poster graphic",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required().error("Alt text is required for accessibility and SEO"),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date / Year",
      type: "string",
      description: 'e.g. "January 2026", "2025 Campaign"',
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: 'e.g. "Talent Test", "Social Welfare", "Education", "Awareness"',
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "posterImage",
    },
  },
});
