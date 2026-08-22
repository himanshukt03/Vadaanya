import { defineField, defineType } from "sanity";

export const founderProfileSchema = defineType({
  name: "founderProfile",
  title: "Founder Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Designation",
      type: "string",
      description: "e.g. 'Lead QA Engineer, OpenText'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "linkedInUrl",
      title: "LinkedIn URL",
      type: "url",
      description: "Full LinkedIn profile URL",
    }),
    defineField({
      name: "image",
      title: "Founder Photo",
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
      name: "bioParagraphs",
      title: "Bio Paragraphs",
      type: "array",
      of: [
        {
          type: "text",
          rows: 3,
        },
      ],
      description: "Add each bio paragraph as a separate item",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "orderRank",
      title: "Order Rank",
      type: "string",
      description: "Controls display order (for multiple founders)",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});
