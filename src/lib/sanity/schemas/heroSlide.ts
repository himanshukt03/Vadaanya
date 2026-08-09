import { defineField, defineType } from "sanity";

export const heroSlideSchema = defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "document",
  fields: [
    defineField({
      name: "mainHeadingPart1",
      title: "Main Heading (Part 1)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainHeadingPart2",
      title: "Main Heading Accent (Part 2)",
      type: "string",
      description: "Gold highlighted text in headline",
    }),
    defineField({
      name: "description",
      title: "Slide Subtext / Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "desktopImage",
      title: "Desktop Banner Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mobileImage",
      title: "Mobile Banner Image (Optional)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "secondaryButtonLabel",
      title: "Secondary CTA Button Label",
      type: "string",
      initialValue: "Success Stories",
    }),
    defineField({
      name: "secondaryButtonUrl",
      title: "Secondary CTA Button URL / Anchor",
      type: "string",
      initialValue: "#stories",
    }),
    defineField({
      name: "orderRank",
      title: "Order Rank",
      type: "number",
      description: "Controls display order of carousel slides",
    }),
  ],
  preview: {
    select: {
      title: "mainHeadingPart1",
      subtitle: "mainHeadingPart2",
      media: "desktopImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: [title, subtitle].filter(Boolean).join(" "),
        media,
      };
    },
  },
});
