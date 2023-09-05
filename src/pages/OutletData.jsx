import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Card from "../components/Card";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SalesComparisonChart from "../components/SalesComparisonChart";
import DataTables from "../components/DataTables";

const OutletData = () => {
  const [data, setData] = useState([]);
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;
  const { user } = useAuthContext();
  const { id } = useParams();
  const [selectedMetric, setSelectedMetric] = useState('sales');
  const [masterCategoryData, setMasterCategoryData] = useState([]);
  const [cat3Data, setCat3Data] = useState([]);
  const [cat1Data, setCat1Data] = useState([]);




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
            if (key !== category && key !== 'cat_1' && key !== 'cat_3' && key !== 'master_category' && key !== 'zonal'  && key !== 'name' && key !== 'format' && key !== 'outlet_code' && key !== '_id') {
              aggregatedData[categoryValue][key] += item[key];
            }
          }
        }
      });
      return Object.values(aggregatedData);
    };

    // Aggregate data for 'Master Category'
    const masterCategoryAggregated = aggregateData('master_category');
    const filteredMasterCategoryData = masterCategoryAggregated.map((item) => {
      const { cat_1, cat_3, ...rest } = item;
      return { ...rest };
    });
    setMasterCategoryData(filteredMasterCategoryData);

    // Aggregate data for 'CAT_3'
    const cat3Aggregated = aggregateData('cat_3');
    const filteredCat1Data = cat3Aggregated.map((item) => {
      const { cat_3, ...rest } = item;
      return { ...rest };
    });
    setCat3Data(filteredCat1Data);

    // Aggregate data for 'CAT_1'
    const cat1Aggregated = aggregateData('cat_1');
    setCat1Data(cat1Aggregated);
  }, [data]);


  


  useEffect(() => {
    console.log(masterCategoryData);
  }, [masterCategoryData]);


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
  data.forEach((item) => {
    const product = item["cat_3"];
    const sales = item["sales_this"];
    if (productSales[product]) {
      productSales[product] += sales;
    } else {
      productSales[product] = sales;
    }
  });


  const [bestSellingProduct,setBestSellingProduct] = useState("")
  const [worstSellingProduct,setWorstSellingProduct] = useState("")
  const [maxSales,setMaxSales] = useState(-Infinity)
  const [minSales,setMinSales] = useState(Infinity)

  for (const product in productSales) {
    if (productSales[product] > maxSales) {
      setMaxSales(productSales[product])
      setBestSellingProduct(product);
    }
    if (productSales[product] < minSales) {
      setMinSales(productSales[product])
      setWorstSellingProduct(product);
    }
  }








  const numFor = Intl.NumberFormat("en-US");

  if (!data.length > 0) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      {data && (
        <h1 className="mb-4 text-xl font-semibold">{data[0].name} Data</h1>
      )}
      <div className="mb-8 grid gap-4 grid-cols-2 md:grid-cols-4">
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
        <div href="#" className="block cursor-pointer mx-1 w-full p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                <h5 className="mb-1 text-sm lg:text-lg font-bold tracking-tight text-gray-600">Best Selling Product</h5>
                <p className="mb-1 font-semibold text-gray-950 text-lg lg:text-2xl">{ numFor.format( Math.round(maxSales) )}</p>
                <p className="mb-1 font-semibold text-green-600 text-xs">{bestSellingProduct}</p>
              
          </div>
        {/* <div href="#" className="block cursor-pointer mx-1 w-full p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                <h5 className="mb-1 text-sm lg:text-lg font-bold tracking-tight text-gray-600">Worst Selling Product</h5>
                <p className="mb-1 font-semibold text-gray-950 text-lg lg:text-2xl">{ numFor.format( Math.round(minSales) )}</p>
                <p className="mb-1 font-semibold text-green-600 text-xs">{worstSellingProduct}</p>
              
          </div> */}
      </div>

      <div className="">
        <div className="flex justify-start items-center gap-2">
          <h1>Filter By:</h1>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-44  p-3 text-sm font-medium"
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
