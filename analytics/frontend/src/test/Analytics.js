import React, { useEffect, useState } from 'react';
import Filters from './Filter';
import ValueBox from './ValueBox';
import Graphs from './Graphs';
import { PieChart } from './PieChart';
import axios from 'axios';
const backgroundImage = require('../assets/abstract_bg.png');

function Analytics() {
  const ip = '172.18.228.125'
  const [genderData, setGenderData] = useState({ labels: ['Male', 'Female'], data: [35, 47] });
  const [memberData, setMemberData] = useState({ labels: ['Customer', 'Employee'], data: [78, 53] });
  const [productData, setProductData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [duration, setDuration] = useState('5m');
  const [category, setCategory] = useState('All');
  const [lineData, setLineData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalCogs , setTotalCogs] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = 'http://' + ip + ':3001/';
        const genderResponse = await axios.get(api + 'getPieDataGender');
        setGenderData({ labels: ['Male', 'Female'], data: genderResponse.data });
  
        const memberResponse = await axios.get(api + 'getPieDataCustomerType');
        setMemberData({ labels: ['Customer', 'Employee'], data: memberResponse.data });
  
        const lineResponse = await axios.get(api + 'getSalesProductData');
        console.log('API Response:', lineResponse.data); 
  
        if (lineResponse.data && lineResponse.data.productData) {
          setProductData(lineResponse.data.productData);
        }
        if (lineResponse.data && lineResponse.data.salesData) {
          setSalesData(lineResponse.data.salesData);
        }
      
        calculateTotalStats(lineResponse.data.productData); 
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  function calculateTotalStats(filteredProducts) {
    let tp = 0;
    let tq = 0;
    let tc = 0;
  
    filteredProducts.forEach((prod) => {
      tp += prod.product_price * prod.product_quantity;
      tq += prod.product_quantity;
      tc += prod.product_cogs * prod.product_quantity;  
    });
  
    setTotalPrice(tp.toFixed(2));
    setTotalQuantity(tq);
    setTotalCogs(tc.toFixed(2));
  }
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
  
    let filteredProducts = [];
    let data = [];
  
    salesData.forEach((sale) => {
      const product = productData.find((p) => p.product_id === sale.product_id);
  
      if (product && filterByCategory(product) && filterByDuration(sale.sale_date)) {
        data.push(sale.sale_price);
        filteredProducts.push(product);
      }
    });
  
    console.log("Filtered data:", data);
    setLineData(data);
    calculateTotalStats(filteredProducts);
  }

  function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'; 
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; 
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'; 
    } else {
        return num.toString(); 
    }
  }
  

  return (
    <div className="px-5 py-6 w-full h-full">
      <div className="flex flex-row h-[100%] w-[100%] gap-5">
        <Filters setDuration={setDuration} setCategory={setCategory} duration={duration} category={category} />
        <div className="flex flex-col flex-1 w-[80%]">
          <div className="flex flex-row justify-between h-[20%] w-[100%] rounded-lg p-6" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <ValueBox title="Total sales" value={formatNumber(totalPrice)} />
            <ValueBox title="Quantity sold" value={formatNumber(totalQuantity)} />
            <ValueBox title="Cogs" value={formatNumber(totalCogs)} />
            <ValueBox title="Profit" value={formatNumber((totalPrice-totalCogs).toFixed(2))} />
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
