import { defineField, defineType } from "sanity";

export const printMediaCollectionSchema = defineType({
  name: "printMediaCollection",
  title: "Print Media Collection",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "e.g. 'English News', 'Telugu News'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      description: "e.g. 'English Press Coverage', 'తెలుగు పత్రికా వార్తలు'",
    }),
    defineField({
      name: "date",
      title: "Date Label",
      type: "string",
      description: "e.g. 'Press Clippings'",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Press Clipping Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
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
      subtitle: "language",
      media: "coverImage",
    },
  },
});
