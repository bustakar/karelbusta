import { PersonalHome } from 'app/components/personal-home';
import { metadataForLocale } from 'app/site';

export const metadata = metadataForLocale('cs');

export default function Page() {
  return <PersonalHome locale="cs" />;
}
