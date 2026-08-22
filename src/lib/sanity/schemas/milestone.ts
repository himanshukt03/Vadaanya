import { defineField, defineType } from "sanity";

export const milestoneSchema = defineType({
  name: "milestone",
  title: "Key Milestone",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Year / Date Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "desc",
      title: "Description",
      type: "text",
      rows: 2,
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
      title: "year",
      subtitle: "desc",
    },
  },
});
