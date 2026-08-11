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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "orderRank",
      title: "Order Rank",
      type: "number",
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
