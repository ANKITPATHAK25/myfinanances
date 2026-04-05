export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://findash.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
