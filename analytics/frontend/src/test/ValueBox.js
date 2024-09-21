import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ValueBox = ({ value, title }) => {
  const [fetchedValue, setFetchedValue] = useState(value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/your-endpoint'); 
        setFetchedValue(response.data.value); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // fetchData();
  }, []);

  return (
    <div className="flex flex-col p-4 bg-[#fff] rounded-xl w-[20%] h-full opacity-80">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-2xl">{fetchedValue}</p>
    </div>
  );
}

export default ValueBox;
