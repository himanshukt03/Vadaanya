import { defineField, defineType } from "sanity";

export const newsArticleSchema = defineType({
  name: "newsArticle",
  title: "News Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publisher",
      title: "Publisher",
      type: "string",
      description: "Newspaper / Media Name e.g. 'The Hindu', 'ETV Bharat'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Article Link",
      type: "url",
      description: "URL to external news article",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "linkLabel",
      title: "Link Label",
      type: "string",
      initialValue: "Read Article",
    }),
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
    }),
    defineField({
      name: "orderRank",
      title: "Order Rank",
      type: "string",
      description: "Controls display order (drag/drop in Studio)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publisher",
    },
  },
});
