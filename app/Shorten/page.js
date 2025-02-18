'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Shorten = () => {
  const [url, setUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [storedLinks, setStoredLinks] = useState([]);

  useEffect(() => {
    const savedLinks = JSON.parse(localStorage.getItem("shortenedLinks")) || [];
    setStoredLinks(savedLinks);
  }, []);

  const saveToLocalStorage = (links) => {
    localStorage.setItem("shortenedLinks", JSON.stringify(links));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ url, customUrl }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) return;

      const data = await response.json();
      if (data.customUrl) {
        const newUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${data.customUrl}`;
        const updatedLinks = [{ original: url, shortened: newUrl }, ...storedLinks];
        setStoredLinks(updatedLinks);
        saveToLocalStorage(updatedLinks);
      }
    } catch (error) {
      console.error(error);
    }

    setUrl('');
    setCustomUrl('');
    };

  const handleDelete = (index) => {
    const updatedLinks = storedLinks.filter((_, i) => i !== index);
    setStoredLinks(updatedLinks);
    saveToLocalStorage(updatedLinks);
  };

  return (
    <div className="flex justify-between items-start min-h-[50vh] px-20">
      <form className="flex flex-col justify-center items-center gap-4 bg-[rgb(211,239,227)] p-6 rounded-md w-1/2 mt-10">
        <h1 className="text-2xl font-bold mb-4">Generate your URL here</h1>
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
      </form>

      <div className=" flex flex-col items-center gap-2 bg-[rgb(211,239,227)] p-6 rounded-md mt-10 w-2/5">
        <h1 className="text-2xl font-bold mb-4">Your generated URLs</h1>
        {storedLinks.length === 0 ? (
          <p className="text-gray-500">No links generated yet.</p>
        ) : (
          storedLinks.map((item, index) => (
            <p key={index} className="text-lg flex justify-evenly items-center">
              <Link target='_blank' href={item.shortened}>{item.shortened}</Link>
              <button className='bg-red-500 text-white p-1 ml-5 px-2 rounded-md' onClick={() => handleDelete(index)}>Delete</button>
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default Shorten;
