import React, { useEffect, useState } from 'react';
import Filters from './Filter';
import ValueBox from './ValueBox';
import Graphs from './Graphs';
import { PieChart } from './PieChart';
import axios from 'axios';
const backgroundImage = require('../assets/abstract_bg.png');

function Analytics() {
  const ip = '172.18.162.147';
  const [genderData, setGenderData] = useState({ labels: ['Male', 'Female'], data: [35, 47] });
  const [memberData, setMemberData] = useState({ labels: ['Customer', 'Employee'], data: [78, 53] });
  const [productData, setProductData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [duration, setDuration] = useState('5m');
  const [category, setCategory] = useState('all');
  const [lineData, setLineData] = useState([]);
  const [totalProductPrice, setTotalProductPrice] = useState(0); 
  const [totalProductQuantity, setTotalProductQuantity] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = 'http://' + ip + ':3001/';
        const genderResponse = await axios.get(api + 'getPieDataGender');
        setGenderData({ labels: ['Male', 'Female'], data: genderResponse.data });

        const memberResponse = await axios.get(api + 'getPieDataCustomerType');
        setMemberData({ labels: ['Customer', 'Employee'], data: memberResponse.data });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const salesProductData = async () => {
      try {
        const api = 'http://' + ip + ':3001/';
        const lineResponse = await axios.get(api + 'getSalesProductData');

        if (lineResponse.data.productData) {
          setProductData(lineResponse.data.productData);

          // const totalPrice = lineResponse.data.productData.reduce((sum, product) => {
          //   return sum + (product.product_price || 0); 
          // }, 0);

          let totalPrice = 0;
          lineResponse.data.productData.forEach(element => {
            totalPrice += element.product_price
          });

          console.log(totalPrice)
          setTotalProductPrice(totalPrice)

          const totalQuantity = lineResponse.data.productData.reduce((sum, product) => {
            return sum + (product.product_quantity || 0); 
          }, 0);

          setTotalProductPrice(totalPrice);
          setTotalProductQuantity(totalQuantity);
        }

        if (lineResponse.data.salesData) {
          setSalesData(lineResponse.data.salesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    salesProductData();
  }, []);

  useEffect(() => {
    setLineData([35, 46, 23, 45, 35, 46, 56, 53, 63, 54, 52, 64]);
  }, [category, duration]);

  return (
    <div className="px-5 py-6 w-full h-full">
      <div className="flex flex-row h-[100%] w-[100%] gap-5">
        <Filters setDuration={setDuration} setCategory={setCategory} duration={duration} category={category} />
        <div className="flex flex-col flex-1 w-[80%]">
          <div className="flex flex-row space-evenly h-[20%] w-[100%] rounded-lg p-6" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <ValueBox title="Total Product Price" value={totalProductPrice.toFixed(2)} /> 
            <ValueBox title="Total Product Quantity" value={totalProductQuantity} /> 
          </div>
          <div className="flex flex-row h-[80%] w-full gap-6 mt-4">
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

export default Analytics;
