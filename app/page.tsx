'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const identifyPlant = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const response = await fetch('/api/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error identifying plant:', error);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-green-800">Plant Identifier</h1>
          <div className="mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>
          {image && (
            <div className="mb-6">
              <Image src={image} alt="Uploaded plant" width={400} height={300} className="mx-auto rounded-lg  object-cover object-center" />
            </div>
          )}
          <button
            onClick={identifyPlant}
            disabled={!image || loading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Identifying...' : 'Identify Plant'}
          </button>
          {result && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-green-800">Results:</h2>
              {result.suggestions && result.suggestions.length > 0 && (
                <div>
                  <p className="font-semibold text-green-600 text-lg">Plant Name: {result.suggestions[0].plant_name}</p>
                  <p className='font-medium text-base text-green-600'>Probability: {(result.suggestions[0].probability * 100).toFixed(2)}%</p>
                  {result.suggestions[0].plant_details.wiki_description && (
                    <p className="mt-2 font-medium text-base text-green-600">{result.suggestions[0].plant_details.wiki_description.value}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}