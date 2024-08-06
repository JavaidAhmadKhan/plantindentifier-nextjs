import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { image } = await request.json();

  const apiKey = process.env.PLANT_ID_API_KEY;

  const response = await fetch('https://api.plant.id/v2/identify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': apiKey!,
    },
    body: JSON.stringify({
      images: [image],
      modifiers: ['crops_fast', 'similar_images'],
      plant_language: 'en',
      plant_details: ['common_names', 'url', 'name_authority', 'wiki_description', 'taxonomy', 'synonyms'],
    }),
  });

  const result = await response.json();
  return NextResponse.json(result);
}