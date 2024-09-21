import React, { useEffect, useState } from 'react';
import Filters from './test/Filter';
import ValueBox from './test/ValueBox';
import Graphs from './test/Graphs';
import { PieChart } from './test/PieChart';
import axios from 'axios';

function App() {
  const [genderData, setGenderData] = useState({ labels: ['Male', 'Female'], data: [0, 0] });
  const [memberData, setMemberData] = useState({ labels: ['Customer', 'Employee'], data: [0, 0] });


  const [productData, setProductData] = useState([]);
  const [salesData, setSalesData] = useState([]);


  const [duration,setDuration] = useState('5m');
  const [category,setCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genderResponse = await axios.get('http://192.168.56.206:3001/getPieDataGender');
        setGenderData({ labels: ['Male', 'Female'], data: genderResponse.data });

        const memberResponse = await axios.get('http://192.168.56.206:3001/getPieDataCustomerType');
        setMemberData({ labels: ['Customer', 'Employee'], data: memberResponse.data });
      }catch(error){
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(()=>{
    const salesProductData = async()=>{
      try {
        const lineResponse = await axios.get('http://192.168.56.206:3001/getSalesProductData');
        if(lineResponse.productData){
          setProductData(lineResponse.productData);
        }
        if(lineResponse.salesData){
          setSalesData(lineResponse.salesData);
        }
      }catch(error){
        console.error('Error fetching data:', error);
      }
    } 
    salesProductData();

  },[])

  const [lineData , setLineData] = useState([]);

  function filterSalesData() {
    // Get today's date for comparison
    const today = new Date();
    
    // Define helper function to filter by duration
    function filterByDuration(saleDate) {
        const saleDateObj = new Date(saleDate);

        // Duration filters
        if (duration === 'Last 6 months') {
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(today.getMonth() - 6);
            return saleDateObj >= sixMonthsAgo && saleDateObj <= today;
        } 
        else if (duration === 'Current year') {
            const currentYearStart = new Date(today.getFullYear(), 0, 1); // Start of current year
            return saleDateObj >= currentYearStart && saleDateObj <= today;
        } 
        else if (duration === 'Last 5 years') {
            const fiveYearsAgo = new Date();
            fiveYearsAgo.setFullYear(today.getFullYear() - 5);
            return saleDateObj >= fiveYearsAgo && saleDateObj <= today;
        } 
        return true; // No duration filter
    }

    // Define helper function to filter by category
    function filterByCategory(product) {
        if (category === 'All') {
            return true; // No category filter, include all products
        }
        return product.product_type === category;
    }

    // Array to store filtered sales data
    let lineData = [];

    // Iterate over sales data
    salesData.forEach((sale) => {
        // Find the corresponding product for the sale
        const product = productData.find(p => p.product_id === sale.product_id);

        if (product && filterByCategory(product) && filterByDuration(sale.sale_date)) {
            // Push the sales price and quantity into the lineData array
            lineData.push({
                sale_price: sale.sale_price,
                quantity_sold: sale.quantity_sold
            });
        }
    });

    return lineData;
}

useEffect(()=>{
  setLineData(filterSalesData());
},[category,duration]);

  return (
    <div className="px-5 py-6 w-[100vw] h-[100vh]">
      <div className="flex flex-row h-[100%] w-[100%] gap-5">
        <Filters setDuration = {setDuration} setCategory = {setCategory} duration = {duration} category = {category}/>
        <div className="flex flex-col flex-1 w-[80%]">
          <div className="flex flex-row h-[20%] w-[95%] ml-9">
            <ValueBox title="Value 1" value="100" />
            <ValueBox title="Value 2" value="200" />
            <ValueBox title="Value 3" value="300" />
            <ValueBox title="Value 4" value="400" />
          </div>
          <div className="flex flex-row h-[80%] w-full gap-6 px-2 py-2">
            <Graphs lineData={lineData} />
            <div className="flex flex-col justify-between w-[40%] h-full">
              <PieChart chartData={genderData} />
              <PieChart chartData={memberData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
