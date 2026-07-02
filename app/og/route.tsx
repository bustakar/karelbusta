import { ImageResponse } from 'next/og';
import { localeContent } from 'app/site';

export function GET(request: Request) {
  let url = new URL(request.url);
  let locale = url.searchParams.get('locale') === 'cs' ? 'cs' : 'en';
  let content = localeContent[locale];

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col justify-between bg-[#fbfaf6] p-16 text-[#141414]">
        <div tw="flex items-center justify-between">
          <div tw="flex text-3xl font-bold">KB</div>
          <div tw="flex rounded-full border border-[#ded9cf] px-5 py-2 text-2xl text-[#6f6a61]">
            {locale === 'cs' ? 'CZ' : 'EN'}
          </div>
        </div>
        <div tw="flex flex-col">
          <div tw="mb-8 flex text-7xl font-bold">Karel Busta</div>
          <div tw="flex max-w-[920px] text-4xl leading-tight text-[#2c2925]">
            {content.seo.description}
          </div>
        </div>
        <div tw="flex text-2xl text-[#2563eb]">youtube.com/@karelbusta · x.com/karelbusta</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
