import { defineField, defineType } from "sanity";

export const galleryEventSchema = defineType({
  name: "galleryEvent",
  title: "Gallery Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Name",
      type: "string",
      description: "e.g. 'Digital Teaching at High School - Hyderabad'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
      description: "e.g. 'Nov 2019' or 'Dec 2024'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Event Category",
      type: "string",
      description: "Select whether this is a Talent Test album or a General Society event",
      options: {
        list: [
          { title: "Talent Test (Exam & Awards)", value: "talent-test" },
          { title: "General Society Events", value: "general" },
        ],
        layout: "radio",
      },
      initialValue: "talent-test",
    }),
    defineField({
      name: "year",
      title: "Edition / Year",
      type: "string",
      description: "Year of the event (e.g. 2024, 2023, 2022, 2021)",
      options: {
        list: ["2025", "2024", "2023", "2022", "2021"],
      },
    }),
    defineField({
      name: "subCategory",
      title: "Sub-Category (Optional)",
      type: "string",
      description: "e.g. 'Exam Day', 'Prize Distribution', 'General'",
      options: {
        list: [
          { title: "Exam Day / Centers", value: "Exam Day" },
          { title: "Prize Distribution / Awards", value: "Prize Distribution" },
          { title: "General / Gathering", value: "General" },
        ],
      },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
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
      name: "images",
      title: "Event Photos",
      type: "array",
      of: [
        {
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
        },
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
      subtitle: "date",
      media: "coverImage",
    },
  },
});
