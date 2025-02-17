'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Shorten = () => {
  const [url, setUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [storedLinks, setStoredLinks] = useState([]);

  useEffect(() => {
    const fetchStoredLinks = async () => {
      const response = await fetch('/api/stored');
      const data = await response.json();
      setStoredLinks(data);
    };
    fetchStoredLinks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(url, customUrl);
    
    const response = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ url, customUrl }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const data = await response.json();
    
    if (data.customUrl) {
      setGeneratedUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/${data.customUrl}`);
    } else {
      console.error("Error generating URL");
    }

    setUrl('');
    setCustomUrl('');
  };

  return (
    <>
      <div className="relative min-h-[50vh]">
        <form className="flex flex-col justify-center items-center gap-4 bg-[rgb(211,239,227)] p-6 rounded-md w-full max-w-lg mt-10 absolute top-0 left-0 ml-20">
          <h1 className="text-2xl font-bold mb-4">Generate your URL here</h1>
          <div className="flex flex-col justify-center items-center gap-2 w-full">
            <input 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="text" 
              placeholder="Enter the URL" 
              className="p-2 rounded-md w-full border border-gray-300"
            />
            <input 
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              type="text" 
              placeholder="Enter your custom URL" 
              className="p-2 rounded-md w-full border border-gray-300"
            />
            <button 
              onClick={handleSubmit}
              type="submit" 
              className="mt-4 bg-[rgb(29,80,58)] text-white p-2 rounded-md w-full"
            >
              Generate
            </button>
          </div>
        </form>

        {generatedUrl && (
          <div className="flex justify-end items-center absolute bottom-0 right-0 w-full mr-20">
            <div className="flex flex-col justify-center items-center gap-2 bg-[rgb(211,239,227)] p-6 rounded-md w-full max-w-lg mt-10">
              <h1 className="text-2xl font-bold mb-4">Your generated URL</h1>
              <p className="text-lg"><Link target='_blank' href={generatedUrl}>{generatedUrl}</Link></p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Shorten;
