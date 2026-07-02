import { site } from 'app/site';

export const baseUrl = site.baseUrl;

export default async function sitemap() {
  const languages = { cs: site.czechUrl, en: site.englishUrl };
  const lastModified = new Date().toISOString().split('T')[0];

  return [
    { url: site.czechUrl, alternates: { languages }, lastModified },
    { url: site.englishUrl, alternates: { languages }, lastModified },
  ];
}
