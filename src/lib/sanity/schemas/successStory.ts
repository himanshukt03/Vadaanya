import { defineField, defineType } from "sanity";

export const successStorySchema = defineType({
  name: "successStory",
  title: "Success Story",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Student Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "occupation",
      title: "Occupation",
      type: "string",
      description: "e.g. 'Postal Assistant, Department of Posts'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortCaption",
      title: "Short Caption",
      type: "text",
      description: "1-2 line summary for card view",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullStory",
      title: "Full Story",
      type: "text",
      description: "Full journey description",
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      description: "Testimonial quote",
      rows: 3,
    }),
    defineField({
      name: "covered",
      title: "Items Covered",
      type: "array",
      of: [{ type: "string" }],
      description: "Items provided, e.g. 'Hostel fee', 'Study materials'",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube video link",
    }),
    defineField({
      name: "image",
      title: "Student Photo",
      type: "image",
      options: { hotspot: true },
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
      name: "orderRank",
      title: "Order Rank",
      type: "string",
      description: "Controls display order",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "occupation",
      media: "image",
    },
  },
});
