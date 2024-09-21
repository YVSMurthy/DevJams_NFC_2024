import React,{useEffect,useState} from 'react';

const Filters = ({ setDuration, setCategory,category,duration }) => {
  const productTypes = ['All','Electronics', 'Accessories', 'Wearables', 'Smart Home', 'Home Appliances', 'Health', 'Fitness'];
  const durations = ['Last 6 months','Current year','Last year'];

  return (
    <div className="p-4 border rounded-lg border-gray-300 h-[100%] w-[20%] space-y-4">
      <div>
        <label className="block mb-1 text-gray-700">Product Type</label>
        <select 
          className="w-full p-2 border rounded-md"
          value = {category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {productTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-gray-700">Duration</label>
        <select 
          className="w-full p-2 border rounded-md"
          value = {duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          {durations.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filters;
