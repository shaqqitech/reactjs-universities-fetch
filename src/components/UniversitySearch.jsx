import React, { useState } from 'react';

const UniversitySearch = () => {
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setUniversities(data);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-10 text-white text-center">Search Universities by Country</h1>
      <div className="flex flex-col items-center justify-center mb-4 w-full space-y-2">
        <input
          type="text"
          placeholder="Enter country name"
          className="p-2 border rounded-l-md mb-2 md:mb-0 w-full text-center outline-none font-semibold text-xl px-4 py-3 bg-transparent text-white "
          value={country}
          onChange={(e) => setCountry(e.target.value.toUpperCase())}
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md w-full outline-none"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className='mt-10'>
        {universities.length > 0 && (
          <ul className='space-y-6'>
            {universities.map((uni) => (
              <li key={uni.name} className="mb-2 border-2 border-gray-500 py-5 px-4 rounded-lg text-gray-400">
                <a href={uni.web_pages} target='_blank' className='text-xl cursor-pointer font-semibold text-white'>{uni.name}</a> - {uni.country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UniversitySearch;
