import { PersonalHome } from 'app/components/personal-home';
import { metadataForLocale } from 'app/site';

export const metadata = metadataForLocale('en');

export default function EnglishPage() {
  return <PersonalHome locale="en" />;
}
