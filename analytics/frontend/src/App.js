import React from 'react';
import Filters from './test/Filter';
import ValueBox from './test/ValueBox';
import Graphs from './test/Graphs';
import PieChart from './test/PieChart';

function App() {

  
  return (
    <div className="px-5 py-6 w-[100vw] h-[100vh]">
      <div className="flex flex-row h-[100%] w-[100%] gap-5">
        <Filters />
        <div className="flex flex-col flex-1 w-[80%]">
          <div className="flex flex-row h-[20%] w-[95%] ml-9">
            <ValueBox title="Value 1" value="100" />
            <ValueBox title="Value 2" value="200" />
            <ValueBox title="Value 3" value="300" />
            <ValueBox title="Value 4" value="400" />
          </div>
          <div className="flex flex-row h-[80%] w-full gap-6 px-2 py-2">
            <Graphs />
            <div className="flex flex-col justify-between w-[40%] h-full">
              <PieChart />
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
