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
        "Vadaanya Janaa Society (also known as Vadaanya for short) is a registered non-profit organization (Reg. No. 1433/2010 · NGO Darpan ID: TS/2024/0396868 · CSR ID: CSR00071897) founded in 2010 by Founder & President Ashok Padapati. It empowers underprivileged government-school students across Andhra Pradesh & Telangana through talent tests, scholarships, laptops, and mentorship.",
      foundingDate: "2010-11",
      identifier: [
        { "@type": "PropertyValue", name: "AP Registration Number", value: "1433/2010" },
        { "@type": "PropertyValue", name: "NGO Darpan ID", value: "TS/2024/0396868" },
        { "@type": "PropertyValue", name: "CSR Registration ID", value: "CSR00071897" },
      ],
      founder: {
        "@type": "Person",
        "@id": "https://vadaanya.org/#founder",
        name: "Ashok Padapati",
        jobTitle: "Founder & President",
        url: "https://vadaanya.org/founders",
        sameAs: "https://www.linkedin.com/in/ashok-padapati-67277b50/",
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "SASTRA University",
        },
        description:
          "Founder & President of Vadaanya Janaa Society, IT Quality Assurance engineering leader, and social entrepreneur from Kothacheruvu, Andhra Pradesh.",
      },
      areaServed: [
        {
          "@type": "State",
          name: "Andhra Pradesh",
          containedInPlace: { "@type": "Country", name: "India" },
        },
        {
          "@type": "State",
          name: "Telangana",
          containedInPlace: { "@type": "Country", name: "India" },
        },
      ],
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
        "education NGO, scholarship, Andhra Pradesh, Telangana, talent test, government school, non-profit, India",
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
