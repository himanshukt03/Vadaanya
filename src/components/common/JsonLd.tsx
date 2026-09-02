interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Injects a JSON-LD structured data script tag into the page.
 * Use in Server Components (pages, layouts) for SEO.
 *
 * @example
 * <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", ... }} />
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization + WebSite schema for the root layout */
export function getOrganizationJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "NGO",
      "@id": "https://vadaanya.org/#organization",
      name: "Vadaanya Janaa Society",
      alternateName: "Vadaanya",
      url: "https://vadaanya.org",
      logo: "https://vadaanya.org/logos/web-app-manifest-512x512.png",
      image: "https://vadaanya.org/logos/web-app-manifest-512x512.png",
      description:
        "Vadaanya Janaa Society is a registered non-profit organization (Reg. No. 1433/2010 · NGO Darpan ID: TS/2024/0396868 · CSR ID: CSR00071897) founded in 2010 by Founder & President Ashok Padapati. It empowers underprivileged government-school students across India through talent tests, scholarships, laptops, and mentorship.",
      foundingDate: "2010-11",
      identifier: [
        { "@type": "PropertyValue", name: "Registration Number", value: "1433/2010" },
        { "@type": "PropertyValue", name: "NGO Darpan ID", value: "TS/2024/0396868" },
        { "@type": "PropertyValue", name: "CSR Registration ID", value: "CSR00071897" },
      ],
      founder: {
        "@type": "Person",
        "@id": "https://vadaanya.org/#founder",
        name: "Ashok Padapati",
        jobTitle: "Founder & President",
        url: "https://vadaanya.org/team-vadaanya",
        sameAs: "https://www.linkedin.com/in/ashok-padapati-67277b50/",
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "SASTRA University",
        },
        description:
          "Founder & President of Vadaanya Janaa Society, IT Quality Assurance engineering leader, and social entrepreneur.",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Flat No. 528, Road No. 15, Vasantha Nagar, KPHB Colony",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500072",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "General Inquiry",
        email: "vadaanyasociety@gmail.com",
        telephone: "+91-8109598109",
        url: "https://vadaanya.org/contact",
      },
      sameAs: [
        "https://www.facebook.com/people/Vadaanya-Janaa-Society/100064704815056/",
        "https://www.instagram.com/vadaanya_janaa_society/",
        "https://www.linkedin.com/company/vadaanya-janaa-society/",
        "https://www.youtube.com/@vadaanyajanaasociety9272",
        "https://x.com/VadaanyaJanaa",
      ],
      nonprofitStatus: "Nonprofit501c3",
      taxID: "80G & 12A Certified",
      keywords:
        "education NGO, scholarship, talent test, government school, non-profit, India",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://vadaanya.org/#website",
      url: "https://vadaanya.org",
      name: "Vadaanya Janaa Society",
      description:
        "Official website of Vadaanya Janaa Society — From Dreams to Degrees.",
      publisher: { "@id": "https://vadaanya.org/#organization" },
      inLanguage: "en-IN",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": "https://vadaanya.org/#sitelinks",
      name: "Main Navigation Sitelinks",
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          position: 1,
          name: "Vadaanya Talent Test",
          description:
            "Annual talent test, question papers booklet, awards, and IIT-JEE mentorship for government school students.",
          url: "https://vadaanya.org/talent-test",
        },
        {
          "@type": "SiteNavigationElement",
          position: 2,
          name: "About Vadaanya",
          description:
            "Learn about Vadaanya Janaa Society mission, history, and 80G/12A tax-exempt registration.",
          url: "https://vadaanya.org/about",
        },
        {
          "@type": "SiteNavigationElement",
          position: 3,
          name: "Founder & Team Vadaanya",
          description:
            "Meet Team Vadaanya led by Founder Ashok Padapati and dedicated volunteers across India.",
          url: "https://vadaanya.org/team-vadaanya",
        },
        {
          "@type": "SiteNavigationElement",
          position: 4,
          name: "Media Gallery & Press Coverage",
          description:
            "Explore photos, newspaper clippings, and videos documenting Vadaanya's educational work.",
          url: "https://vadaanya.org/gallery",
        },
        {
          "@type": "SiteNavigationElement",
          position: 5,
          name: "Student Success Stories",
          description:
            "Read inspiring journeys of government school scholars supported by Vadaanya scholarships.",
          url: "https://vadaanya.org/success-stories",
        },
        {
          "@type": "SiteNavigationElement",
          position: 6,
          name: "Contact Us",
          description:
            "Get in touch with Vadaanya Janaa Society team for inquiries, support, and volunteering.",
          url: "https://vadaanya.org/contact",
        },
        {
          "@type": "SiteNavigationElement",
          position: 7,
          name: "Donate",
          description:
            "Support underprivileged government school students from Class 10 through graduation.",
          url: "https://vadaanya.org/#donate",
        },
      ],
    },
  ];
}

/** Breadcrumb schema generator for inner pages */
export function getBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Talent Test educational program schema */
export function getTalentTestJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "@id": "https://vadaanya.org/talent-test#program",
    name: "Vadaanya Talent Test",
    description:
      "Annual mathematics and aptitude talent test for government school students across Andhra Pradesh & Telangana, organized by Vadaanya Janaa Society with merit scholarships and IIT-JEE mentorship.",
    provider: {
      "@id": "https://vadaanya.org/#organization",
    },
    educationalProgramMode: "hybrid",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      category: "Free Merit Scholarship Program",
    },
    url: "https://vadaanya.org/talent-test",
  };
}
