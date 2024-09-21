import React from 'react';

const Filters = () => {
  return (
    <div className="p-4 border rounded-lg border-gray-300 h-[100%] w-[20%]">
      <input type="text" placeholder="Filter 1" className="w-full p-2 border rounded-md" />
      <input type="text" placeholder="Filter 2" className="w-full p-2 border rounded-md" />
    </div>
  );
}

export default Filters;
