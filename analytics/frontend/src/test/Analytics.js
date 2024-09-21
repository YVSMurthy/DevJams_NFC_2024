import React, { useEffect, useState } from 'react';
import Filters from './Filter';
import ValueBox from './ValueBox';
import Graphs from './Graphs';
import { PieChart } from './PieChart';
import axios from 'axios';
const backgroundImage = require('../assets/abstract_bg.png');

function Analytics() {
  const ip = '172.18.231.72'
  const [genderData, setGenderData] = useState({ labels: ['Male', 'Female'], data: [35, 47] });
  const [memberData, setMemberData] = useState({ labels: ['Customer', 'Employee'], data: [78, 53] });
  const [productData, setProductData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [duration, setDuration] = useState('5m');
  const [category, setCategory] = useState('All');
  const [lineData, setLineData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = 'http://' + ip + ':3001/';
        const genderResponse = await axios.get(api + 'getPieDataGender');
        setGenderData({ labels: ['Male', 'Female'], data: genderResponse.data });
  
        const memberResponse = await axios.get(api + 'getPieDataCustomerType');
        setMemberData({ labels: ['Customer', 'Employee'], data: memberResponse.data });
  
        const lineResponse = await axios.get(api + 'getSalesProductData');
        console.log('API Response:', lineResponse.data);  // Log the entire response
  
        if (lineResponse.data && lineResponse.data.productData) {
          setProductData(lineResponse.data.productData);
        }
        if (lineResponse.data && lineResponse.data.salesData) {
          setSalesData(lineResponse.data.salesData);
        }
      

        let tp = 0;
        lineResponse.data.productData.forEach((prod) => {
          tp += prod.product_price;
        })

        setTotalPrice(tp);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    if (salesData.length > 0 && productData.length > 0) {
      console.log("Filter function");
      filterSalesData();
    }
  }, [category, duration, salesData, productData]);

  function filterSalesData() {
    const today = new Date();
  
    function filterByDuration(saleDate) {
      const saleDateObj = new Date(saleDate);
      if (duration === 'Last 6 months') {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6);
        return saleDateObj >= sixMonthsAgo && saleDateObj <= today;
      } else if (duration === 'Current year') {
        const currentYearStart = new Date(today.getFullYear(), 0, 1);
        return saleDateObj >= currentYearStart && saleDateObj <= today;
      } else if (duration === 'Last 5 years') {
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(today.getFullYear() - 5);
        return saleDateObj >= fiveYearsAgo && saleDateObj <= today;
      }
      return true;
    }
  
    function filterByCategory(product) {
      if (category === 'All') {
        return true;
      }
      return product.product_type === category;
    }
  
    let data = [];
  
    salesData.forEach((sale) => {
      const product = productData.find((p) => p.product_id === sale.product_id);
  
      if (product && filterByCategory(product) && filterByDuration(sale.sale_date)) {
        data.push(
          sale.sale_price
        );
      }
    });
  
    console.log("Filtered data:", data);
    setLineData(data);
  }
  
  

  return (
    <div className="px-5 py-6 w-full h-full">
      <div className="flex flex-row h-[100%] w-[100%] gap-5">
        <Filters setDuration={setDuration} setCategory={setCategory} duration={duration} category={category} />
        <div className="flex flex-col flex-1 w-[80%]">
          <div className="flex flex-row justify-between h-[20%] w-[100%] rounded-lg p-6" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <ValueBox title="Value 1" value={totalPrice} />
            <ValueBox title="Value 2" value="200" />
            <ValueBox title="Value 3" value="300" />
            <ValueBox title="Value 4" value="400" />
          </div>
          <div className="flex flex-row h-[80%] w-full gap-6 mt-4">
            <Graphs lineData={lineData} duration={duration} />
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

export default Analytics;
