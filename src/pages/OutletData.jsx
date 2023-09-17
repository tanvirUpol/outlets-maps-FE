import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SalesComparisonChart from "../components/SalesComparisonChart";
// import DataTables from "../components/DataTables";

import DataTable from "../components/DataTable";

const OutletData = () => {
  const [data, setData] = useState([]);
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;
  const { user } = useAuthContext();
  const { id } = useParams();
  const [selectedMetric, setSelectedMetric] = useState("sales");
  const [masterCategoryData, setMasterCategoryData] = useState([]);
  const [cat1Data, setCat1Data] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [selectedOutlets, setSelectedOutlets] = useState(id);
  const [selectedMode, setSelectedMode] = useState("cat");

  const [bestSellingProduct, setBestSellingProduct] = useState("");
  const [maxSales, setMaxSales] = useState(-Infinity);

  // console.log(user);

  // Define a function to trim object
  const trimObjectValues = (obj) => {
    const trimmedObj = {};
    // console.log(obj);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // console.log(obj[key]);
        if (typeof obj[key] === "string") {
          trimmedObj[key] = obj[key].trim();
        } else {
          trimmedObj[key] = obj[key];
        }
      }
    }
    return trimmedObj;
  };

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/${selectedMode}/${id}`, {
          headers: {
            Authorization: `'Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          console.log(json);
          const trimmedData = json.map((item) => trimObjectValues(item));
          console.log(trimmedData);
          setData(trimmedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (user) {
      fetchData();
    }
  }, [selectedMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/cat/${selectedOutlets}`, {
          headers: {
            Authorization: `'Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          console.log(json);
          const trimmedData = json.map((item) => trimObjectValues(item));
          console.log(trimmedData);
          setData(trimmedData);
          setMaxSales(-Infinity);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (user) {
      fetchData();
    }
  }, [selectedOutlets]);

  // new code starts here

  useEffect(() => {
    // Helper function to aggregate data for a specific category
    const aggregateData = (category) => {
      const aggregatedData = {};
      data.forEach((item) => {
        const categoryValue = item[category];
        if (!aggregatedData[categoryValue]) {
          aggregatedData[categoryValue] = { ...item };
        } else {
          // Sum the corresponding values for each category excluding 'cat_1', 'cat_3', 'master_category', and 'zonal'
          for (const key in item) {
            if (
              key !== category &&
              key !== "cat_1" &&
              key !== "cat_3" &&
              key !== "master_category" &&
              key !== "zonal" &&
              key !== "name" &&
              key !== "format" &&
              key !== "outlet_code" &&
              key !== "_id"
            ) {
              aggregatedData[categoryValue][key] += item[key];
            }
          }
        }
      });
      return Object.values(aggregatedData);
    };

    // Aggregate data for 'Master Category'
    const masterCategoryAggregated = aggregateData("master_category");
    const filteredMasterCategoryData = masterCategoryAggregated.map((item) => {
      const { cat_1, cat_3, ...rest } = item;
      return { ...rest };
    });
    setMasterCategoryData(filteredMasterCategoryData);

    // Aggregate data for 'CAT_3'
    const cat3Aggregated = aggregateData("cat_3");
    const filteredCat1Data = cat3Aggregated.map((item) => {
      const { cat_3, ...rest } = item;
      return { ...rest };
    });


    // Aggregate data for 'CAT_1'
    const cat1Aggregated = aggregateData("cat_1");
    setCat1Data(cat1Aggregated);
  }, [data]);

  // new code end

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

  // Calculate total sales for each product
  const productSales = {};
  data?.forEach((item) => {
    const product = item["cat_3"];
    const sales = item["sales_this"];
    if (productSales[product]) {
      productSales[product] += sales;
    } else {
      productSales[product] = sales;
    }
  });

  // console.log(productSales);

  for (const product in productSales) {
    if (productSales[product] > maxSales) {
      // console.log(product);
      setMaxSales(productSales[product]);
      setBestSellingProduct(product);
    }
  }

  const numFor = Intl.NumberFormat("en-US");

  useEffect(() => {
    const local_outlets = JSON.parse(localStorage.getItem("outlets"));
    if (local_outlets) {
      setOutlets(local_outlets);
    }
  }, []);

  // console.log(selectedOutlets);

  if (!data.length > 0) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        {data && (
          <h1 className="text-lg font-semibold md:text-xl">
            {data[0].name} Data
          </h1>
        )}
        <div className="flex items-center justify-start gap-2">
          <h1>Outlet:</h1>
          <select
            value={selectedOutlets}
            onChange={(e) => setSelectedOutlets(e.target.value)}
            className="block w-32 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-900 focus:border-blue-500  focus:ring-blue-500 md:w-44 md:p-3"
          >
            {outlets.map((outlet) => (
              <option key={outlet} value={outlet}>
                {outlet}
              </option>
            ))}
          </select>
        </div>
        
      </div>
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
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
        {/* <Card
          title={"Avg. Basket Size"}
          mainData={averageBasketSizeThis}
          diff={averageBasketSizeThis - averageBasketSizeLast}
          percentage={calculateGrowthPercentage(
            averageBasketSizeThis,
            averageBasketSizeLast
          )}
        /> */}
        <div
          className="mx-1 block w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-5 shadow hover:bg-gray-100"
        >
          <h5 className="mb-1 text-sm font-bold tracking-tight text-gray-600 lg:text-lg">
            Best Selling Product
          </h5>
          <p className="mb-1 text-lg font-semibold text-gray-950 lg:text-2xl">
            {numFor.format(Math.round(maxSales))}
          </p>
          <p className="mb-1 text-xs font-semibold text-green-600">
            {bestSellingProduct}
          </p>
        </div>
      </div>

      <div className="">

        <div className="flex justify-between items-center" >

          <div className="flex items-center justify-start gap-2">
            <h1>Filter By:</h1>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="block w-44 rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm font-medium  text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="bs">Basket Size</option>
              <option value="sales">Sales</option>
              <option value="pos_gpv">POS GPV</option>
            </select>
          </div>

          <div className="flex items-center justify-start gap-2">
            <h1>Mode:</h1>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="block w-32 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-900 focus:border-blue-500  focus:ring-blue-500 md:w-44 md:p-3"
            >
              <option value="cat">SPLY</option>
              <option value="catm">SPLM</option>
        
            </select>
          </div>

        </div>

        <h1 className="mt-7 text-xl font-bold text-rose-600">Degrowth Table</h1>
        <DataTable
          growth="degrowth"
          masterCategoryData={masterCategoryData}
          cat1Data={cat1Data}
          data={data}
          selectedMetric={selectedMetric}
        />
        <h1 className="mt-5 text-xl  font-bold text-green-600">Growth Table</h1>
        <DataTable
          growth="growth"
          masterCategoryData={masterCategoryData}
          cat1Data={cat1Data}
          data={data}
          selectedMetric={selectedMetric}
        />
      </div>

      <SalesComparisonChart selectedMetric={selectedMetric} data={data} />
    </div>
  );
};

export default OutletData;
