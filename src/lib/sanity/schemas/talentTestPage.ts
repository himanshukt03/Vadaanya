import { defineArrayMember, defineField, defineType } from "sanity";

export const announcementItemSchema = defineType({
  name: "announcementItem",
  title: "Announcement",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "desc",
      title: "Short Description",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "actionType",
      title: "Action Type",
      type: "string",
      options: {
        list: [
          { title: "None (No Action)", value: "none" },
          { title: "Anchor (#section)", value: "anchor" },
          { title: "External Link / PDF", value: "link" },
        ],
        layout: "radio",
      },
      initialValue: "none",
    }),
    defineField({
      name: "actionLabel",
      title: "Action Label",
      type: "string",
      description: "Optional when Action Type is None",
      hidden: ({ parent }) => !parent?.actionType || parent.actionType === "none",
      validation: (Rule) =>
        Rule.custom((val, context) => {
          const parent = context.parent as { actionType?: string } | undefined;
          if (parent?.actionType && parent.actionType !== "none" && !val) {
            return "Action label is required when an action type is selected";
          }
          return true;
        }),
    }),
    defineField({
      name: "href",
      title: "Target URL / Anchor",
      type: "string",
      hidden: ({ parent }) => !parent?.actionType || parent.actionType === "none",
    }),
    defineField({
      name: "date",
      title: "Display Date",
      type: "string",
      description: "e.g. '01 Feb 2025' or '15 Jan 2025'",
    }),
    defineField({
      name: "image",
      title: "Card Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "image",
    },
  },
});

export const talentTestPageSchema = defineType({
  name: "talentTestPage",
  title: "Talent Test Page",
  type: "document",
  groups: [
    { name: "announcements", title: "1. Announcements" },
    { name: "about", title: "2. About Flagship Exam" },
    { name: "stats", title: "3. Stats Bar" },
    { name: "howItWorks", title: "4. How It Works" },
    { name: "equity", title: "5. Fair Evaluation & Awards" },
    { name: "iitScholars", title: "6. IIT Scholars" },
    { name: "faqs", title: "7. Q&A / FAQs" },
  ],
  fields: [
    defineField({
      name: "announcements",
      title: "Live Announcements",
      type: "array",
      group: "announcements",
      of: [
        defineArrayMember({
          type: "announcementItem",
        }),
      ],
    }),

    defineField({
      name: "aboutEyebrow",
      title: "About Eyebrow",
      type: "string",
      group: "about",
      initialValue: "Our Annual Flagship Exam",
    }),
    defineField({
      name: "aboutTitle",
      title: "About Heading / Title",
      type: "string",
      group: "about",
      initialValue: "About the Talent Test",
    }),
    defineField({
      name: "aboutParagraphs",
      title: "About Content Paragraphs",
      type: "array",
      group: "about",
      of: [defineArrayMember({ type: "text", rows: 3 })],
      description: "Paragraphs of content for the About the Talent Test section.",
    }),
    defineField({
      name: "aboutImages",
      title: "About Shuffling Slideshow Images",
      type: "array",
      group: "about",
      description: "Multiple photos that automatically shuffle and fade in/out with subtle manual navigation arrows.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative Text",
              initialValue: "Vadaanya Talent Test event photo",
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "stats",
      title: "4 Impact Stat Badges",
      type: "array",
      group: "stats",
      validation: (Rule) => Rule.max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "statItem",
          title: "Stat Badge",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Primary Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "sublabel",
              title: "Sublabel",
              type: "string",
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "howItWorksEyebrow",
      title: "Section Eyebrow",
      type: "string",
      group: "howItWorks",
      initialValue: "THE ANNUAL CYCLE",
    }),
    defineField({
      name: "howItWorksHeading",
      title: "Section Heading",
      type: "string",
      group: "howItWorks",
      initialValue: "How the Talent Test Works",
    }),
    defineField({
      name: "howItWorksLead",
      title: "Section Lead Paragraph",
      type: "text",
      rows: 2,
      group: "howItWorks",
    }),
    defineField({
      name: "howItWorksSteps",
      title: "Cycle Steps (Cards)",
      type: "array",
      group: "howItWorks",
      of: [
        defineArrayMember({
          type: "object",
          name: "howItWorksStep",
          title: "Step Card",
          fields: [
            defineField({
              name: "step",
              title: "Step Number",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "desc",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "equityEyebrow",
      title: "Section Eyebrow",
      type: "string",
      group: "equity",
      initialValue: "FAIR EVALUATION",
    }),
    defineField({
      name: "equityHeading",
      title: "Section Heading",
      type: "string",
      group: "equity",
      initialValue: "Recognition, Built for Equity",
    }),
    defineField({
      name: "equityDescription",
      title: "Section Description",
      type: "text",
      rows: 3,
      group: "equity",
    }),
    defineField({
      name: "equityTiers",
      title: "Award Tier Cards",
      type: "array",
      group: "equity",
      of: [
        defineArrayMember({
          type: "object",
          name: "equityTier",
          title: "Award Tier Card",
          fields: [
            defineField({
              name: "tier",
              title: "Tier Badge Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "medal",
              title: "Medal Emoji / Icon",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Card Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "desc",
              title: "Eligibility / Scope",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "rewardVal",
              title: "Reward Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "rewardSub",
              title: "Reward Subtitle",
              type: "string",
              initialValue: "Trophy & Merit Certificate",
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "iitEyebrow",
      title: "Section Eyebrow",
      type: "string",
      group: "iitScholars",
      initialValue: "NATIONAL ACADEMIC SUCCESS",
    }),
    defineField({
      name: "iitHeading",
      title: "Section Heading",
      type: "string",
      group: "iitScholars",
      initialValue: "From Government Classrooms to IITs",
    }),
    defineField({
      name: "iitLead",
      title: "Section Lead Paragraph",
      type: "text",
      rows: 3,
      group: "iitScholars",
    }),
    defineField({
      name: "iitScholars",
      title: "IIT Scholars List",
      type: "array",
      group: "iitScholars",
      of: [
        defineArrayMember({
          type: "object",
          name: "iitScholar",
          title: "IIT Scholar",
          fields: [
            defineField({
              name: "name",
              title: "Student Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "airRank",
              title: "AIR Rank",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "categoryRank",
              title: "Category Rank",
              type: "string",
            }),
            defineField({
              name: "college",
              title: "Institution / College",
              type: "string",
              initialValue: "Indian Institute of Technology (IIT)",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Student Photo",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "faqEyebrow",
      title: "Section Eyebrow",
      type: "string",
      group: "faqs",
      initialValue: "FAQ",
    }),
    defineField({
      name: "faqHeading",
      title: "Section Heading",
      type: "string",
      group: "faqs",
      initialValue: "Frequently Asked Questions",
    }),
    defineField({
      name: "faqs",
      title: "Questions & Answers",
      type: "array",
      group: "faqs",
      of: [
        defineArrayMember({
          type: "object",
          name: "talentTestFaq",
          title: "FAQ Item",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
});
