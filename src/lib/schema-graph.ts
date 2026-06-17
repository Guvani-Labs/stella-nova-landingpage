import { nap, SITE_ORIGIN, type NapLanguage } from "./site-nap";

const SCHEMA_IMAGES = [
  nap.ogImage,
  `${SITE_ORIGIN}/images/stella-nova-ext-5-1.jpg`,
  `${SITE_ORIGIN}/images/stella-nova-ext-1.jpg`,
  `${SITE_ORIGIN}/images/stella-nova-1.jpg`,
];

export function buildSchemaGraph(description: string, lang: NapLanguage) {
  const areaServed = lang === "sv" ? "Sverige" : "Sweden";
  const listingServiceName =
    lang === "sv"
      ? "Försäljning av klassisk motoryacht"
      : "Classic motor yacht for sale";
  const listingServiceDescription =
    lang === "sv"
      ? "Privat försäljning av den totalrenoverade 27-meters motoryachten Stella Nova i Saltsjöbaden."
      : "Private sale of the fully refitted 27-metre motor yacht Stella Nova in Saltsjöbaden.";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#organization`,
        name: nap.displayName,
        legalName: nap.legalName,
        alternateName: nap.displayName,
        url: nap.url,
        logo: nap.logo,
        email: nap.email,
        ...(nap.telephone ? { telephone: nap.telephone } : {}),
        description,
        foundingDate: String(nap.boat.yearBuilt),
        knowsAbout: [...nap.knowsAbout],
        ...(nap.sameAs.length > 0 ? { sameAs: [...nap.sameAs] } : {}),
        address: {
          "@type": "PostalAddress",
          addressLocality: nap.address.addressLocality,
          addressRegion: nap.address.addressRegion,
          addressCountry: nap.address.addressCountry,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        name: nap.displayName,
        alternateName: nap.displayName,
        url: SITE_ORIGIN,
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
        inLanguage: lang === "sv" ? ["sv", "en"] : ["en", "sv"],
      },
      {
        "@type": "Place",
        "@id": `${SITE_ORIGIN}/#location`,
        name: nap.address.addressLocality,
        address: {
          "@type": "PostalAddress",
          addressLocality: nap.address.addressLocality,
          addressRegion: nap.address.addressRegion,
          addressCountry: nap.address.addressCountry,
        },
      },
      {
        "@type": "Service",
        "@id": `${SITE_ORIGIN}/#listing-service`,
        name: listingServiceName,
        description: listingServiceDescription,
        provider: { "@id": `${SITE_ORIGIN}/#organization` },
        areaServed: {
          "@type": "Country",
          name: areaServed,
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${SITE_ORIGIN}${nap.listing.contactPath}`,
          serviceEmail: nap.email,
        },
      },
      {
        "@type": ["Product", "Vehicle"],
        additionalType: "https://schema.org/Boat",
        "@id": `${SITE_ORIGIN}/#yacht`,
        name: nap.boat.name,
        description,
        image: SCHEMA_IMAGES,
        category: "Motor yacht",
        productionDate: String(nap.boat.yearBuilt),
        brand: {
          "@type": "Brand",
          name: nap.boat.name,
        },
        manufacturer: {
          "@type": "Organization",
          name: nap.boat.builder,
        },
        location: { "@id": `${SITE_ORIGIN}/#location` },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Length overall",
            value: `${nap.boat.lengthMeters} m`,
          },
          {
            "@type": "PropertyValue",
            name: "Beam",
            value: `${nap.boat.beamMeters} m`,
          },
          {
            "@type": "PropertyValue",
            name: "Original owner",
            value: nap.boat.originalOwner,
          },
          {
            "@type": "PropertyValue",
            name: "Refit",
            value: nap.boat.refitYears,
          },
          {
            "@type": "PropertyValue",
            name: "Engines",
            value: nap.boat.engines,
          },
          {
            "@type": "PropertyValue",
            name: "Location",
            value: nap.boat.locationLabel[lang],
          },
        ],
        offers: {
          "@type": "Offer",
          url: `${SITE_ORIGIN}${nap.listing.contactPath}`,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/UsedCondition",
          seller: { "@id": `${SITE_ORIGIN}/#organization` },
          areaServed: {
            "@type": "Country",
            name: areaServed,
          },
        },
      },
    ],
  };
}
