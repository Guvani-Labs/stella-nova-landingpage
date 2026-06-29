import { nap, SITE_ORIGIN, type NapLanguage } from "./site-nap";

const SCHEMA_IMAGES = [
  nap.ogImage,
  `${SITE_ORIGIN}/images/stella-nova-ext-5-1.jpg`,
  `${SITE_ORIGIN}/images/stella-nova-ext-1.jpg`,
  `${SITE_ORIGIN}/images/stella-nova-1.jpg`,
];

const postalAddress = {
  "@type": "PostalAddress" as const,
  addressLocality: nap.address.addressLocality,
  addressRegion: nap.address.addressRegion,
  addressCountry: nap.address.addressCountry,
};

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

  const sellerId = `${SITE_ORIGIN}/#seller`;
  const yachtId = `${SITE_ORIGIN}/#yacht`;
  const offerId = `${SITE_ORIGIN}/#offer`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": sellerId,
        name: nap.seller.label[lang],
        description: nap.seller.description[lang],
        email: nap.email,
        ...(nap.telephone ? { telephone: nap.telephone } : {}),
        knowsAbout: [...nap.knowsAbout],
        ...(nap.sameAs.length > 0 ? { sameAs: [...nap.sameAs] } : {}),
        address: postalAddress,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        name: nap.displayName,
        alternateName: nap.displayName,
        url: SITE_ORIGIN,
        publisher: { "@id": sellerId },
        inLanguage: lang === "sv" ? ["sv", "en"] : ["en", "sv"],
      },
      {
        "@type": "Place",
        "@id": `${SITE_ORIGIN}/#location`,
        name: nap.address.addressLocality,
        address: postalAddress,
      },
      {
        "@type": "Service",
        "@id": `${SITE_ORIGIN}/#listing-service`,
        name: listingServiceName,
        description: listingServiceDescription,
        provider: { "@id": sellerId },
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
        "@type": "Vehicle",
        additionalType: "https://schema.org/Boat",
        "@id": yachtId,
        name: nap.boat.name,
        description,
        image: SCHEMA_IMAGES,
        vehicleModelDate: String(nap.boat.yearBuilt),
        productionDate: String(nap.boat.yearBuilt),
        brand: {
          "@type": "Brand",
          name: nap.boat.builder,
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
        offers: { "@id": offerId },
      },
      {
        "@type": "Offer",
        "@id": offerId,
        url: `${SITE_ORIGIN}${nap.listing.contactPath}`,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/UsedCondition",
        itemOffered: { "@id": yachtId },
        seller: { "@id": sellerId },
        areaServed: {
          "@type": "Country",
          name: areaServed,
        },
      },
    ],
  };
}
