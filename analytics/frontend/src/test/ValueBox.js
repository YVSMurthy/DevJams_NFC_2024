import React from 'react';

const ValueBox = ({ value, title }) => {
  return (
    <div className="flex-1 p-4 m-2 border rounded-lg border-gray-300 w-[25%]">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
}

export default ValueBox;
