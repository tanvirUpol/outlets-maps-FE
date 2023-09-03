import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SalesComparisonChart from "../components/SalesComparisonChart";
import DataTables from "../components/DataTables";

const OutletData = () => {
  const [data, setData] = useState([]);
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;
  const { user } = useAuthContext();
  const { id } = useParams();
  const [selectedMetric, setSelectedMetric] = useState('sales');




  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/cat/${id}`, {
          headers: {
            Authorization: `'Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          console.log(json);
          setData(json);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (user) {
      fetchData();
    }
  }, []);


  const totalSalesThis = data?.reduce(
    (sum, item) => sum + item["sales_this"],
    0
  );
  const totalSalesLast = data?.reduce(
    (sum, item) => sum + item["sales_last"],
    0
  );

  const totalPosGPVThis = data?.reduce(
    (sum, item) => sum + item["pos_gpv_this"],
    0
  );
  const totalPosGPVLast = data?.reduce(
    (sum, item) => sum + item["pos_gpv_last"],
    0
  );

  const averageBasketSizeThis =
    data?.reduce((sum, item) => sum + item["bs_this"], 0) / data.length;
  const averageBasketSizeLast =
    data?.reduce((sum, item) => sum + item["bs_last"], 0) / data.length;


  const calculateGrowthPercentage = (currentValue, lastValue) => {
    if (lastValue !== 0) {
      const growthPercentage = ((currentValue - lastValue) / lastValue) * 100;
      return growthPercentage.toFixed(2);
    }
    return 0;
  };

  // const numFor = Intl.NumberFormat("en-US");

  if (!data.length > 0) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      {data && (
        <h1 className="mb-4 text-xl font-semibold">{data[0].name} Data</h1>
      )}
      <div className="mb-8 grid gap-4 grid-cols-2 md:grid-cols-3">
        <Card
          title={"Total Sales"}
          mainData={totalSalesThis}
          diff={totalSalesThis - totalSalesLast}
          percentage={calculateGrowthPercentage(totalSalesThis, totalSalesLast)}
        />
        <Card
          title={"Total POS GPV"}
          mainData={totalPosGPVThis}
          diff={totalPosGPVThis - totalPosGPVLast}
          percentage={calculateGrowthPercentage(
            totalPosGPVThis,
            totalPosGPVLast
          )}
        />
        <Card
          title={"Avg. Basket Size"}
          mainData={averageBasketSizeThis}
          diff={averageBasketSizeThis - averageBasketSizeLast}
          percentage={calculateGrowthPercentage(
            averageBasketSizeThis,
            averageBasketSizeLast
          )}
        />
      </div>

      <div className="">
        <div className="flex justify-start items-center gap-2">
          <h1>Filter By:</h1>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-44  p-3"
          >
            <option value="bs">Basket Size</option>
            <option value="sales">Sales</option>
            <option value="pos_gpv">POS GPV</option>
          </select>
        </div>

        <h1 className="text-xl font-bold my-4 text-rose-600" >Degrowth Table</h1>
        <DataTables selectedMetric={selectedMetric} growth="degrowth" data={data} />
        <h1 className="text-xl font-bold mb-4 mt-5 text-green-600">Growth Table</h1>
        <DataTables selectedMetric={selectedMetric} growth="growth" data={data} />
      </div>

      <SalesComparisonChart selectedMetric={selectedMetric} data={data} />
    </div>
  );
};

export default OutletData;
