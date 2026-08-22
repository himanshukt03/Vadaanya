import { defineField, defineType } from "sanity";

export const awardSchema = defineType({
  name: "award",
  title: "Award / Honor",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Award or recognition title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Award Photo",
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
      title: "title",
      media: "image",
    },
  },
});
