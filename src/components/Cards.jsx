import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import Card from "./Card";
const Cards = ({ filteredData }) => {
  const totalOutlets = filteredData.length;
  const allStore = filteredData.filter((obj) => obj["ff_this"] >= 0);
  const sameStore = filteredData.filter(
    (obj) => obj["ff_this"] > 0 && obj["ff_last"] > 0
  );

  const allStoreCount = allStore.length;
  const sameStoreCount = sameStore.length;

  const calculatePercentage = (thisVal, lastVal) => {
    return (((thisVal - lastVal) / lastVal) * 100).toFixed(2);
  };

  //@desc All store Sales Calculations
  const sumSalesThisAllStore = allStore.reduce(
    (sum, obj) => sum + obj["sales_this"],
    0
  );
  const sumSalesLastAllStore = allStore.reduce(
    (sum, obj) => sum + obj["sales_last"],
    0
  );
  const AllSalesDiff = (sumSalesThisAllStore - sumSalesLastAllStore).toFixed(2);

  const AllSalesDiffPercentage = calculatePercentage(
    sumSalesThisAllStore,
    sumSalesLastAllStore
  );

  //@desc same store Sales Calculations
  const sumSalesThisSameStore = sameStore.reduce(
    (sum, obj) => sum + obj["sales_this"],
    0
  );

  const sumSalesLastSameStore = sameStore.reduce(
    (sum, obj) => sum + obj["sales_last"],
    0
  );

  const SameSalesDiff = (sumSalesThisSameStore - sumSalesLastSameStore).toFixed(
    2
  );

  const SameSalesDiffPercentage = calculatePercentage(
    sumSalesThisSameStore,
    sumSalesLastSameStore
  );

  //@desc all store FF Calculations
  const sumFFThisAllStore = allStore.reduce(
    (sum, obj) => sum + obj["ff_this"],
    0
  );

  const sumFFLastAllStore = allStore.reduce(
    (sum, obj) => sum + obj["ff_last"],
    0
  );

  const AllFFDiff = (sumFFThisAllStore - sumFFLastAllStore).toFixed(2);

  const AllFFDiffPercentage = calculatePercentage(
    sumFFThisAllStore,
    sumFFLastAllStore
  );

  //@desc same store FF Calculations
  const sumFFThisSameStore = sameStore.reduce(
    (sum, obj) => sum + obj["ff_this"],
    0
  );

  const sumFFLastSameStore = sameStore.reduce(
    (sum, obj) => sum + obj["ff_last"],
    0
  );

  const SameFFDiff = (sumFFThisSameStore - sumFFLastSameStore).toFixed(2);

  const SameFFDiffPercentage = calculatePercentage(
    sumFFThisSameStore,
    sumFFLastSameStore
  );

  //@desc all store BS Calculations

  const avgBSThisAllStore = (sumSalesThisAllStore / sumFFThisAllStore).toFixed(
    2
  );
  const avgBSLastAllStore = (sumSalesLastAllStore / sumFFLastAllStore).toFixed(
    2
  );

  const AllBSDiff = (avgBSThisAllStore - avgBSLastAllStore).toFixed(2);

  const AllBSDiffPercentage = calculatePercentage(
    avgBSThisAllStore,
    avgBSLastAllStore
  );

  //@desc same store BS Calculations

  const avgBSThisSameStore = (
    sumSalesThisSameStore / sumFFThisSameStore
  ).toFixed(2);
  const avgBSLastSameStore = (
    sumSalesLastSameStore / sumFFLastSameStore
  ).toFixed(2);

  const SameBSDiff = (avgBSThisSameStore - avgBSLastSameStore).toFixed(2);

  const SameBSDiffPercentage = calculatePercentage(
    avgBSThisSameStore,
    avgBSLastSameStore
  );

  //@desc all store GPV Calculations
  const sumGPVThisAllStore = allStore
    .reduce((sum, obj) => sum + obj["gpv_this"], 0)
    .toFixed(2);
  const sumGPVLastAllStore = allStore
    .reduce((sum, obj) => sum + obj["gpv_last"], 0)
    .toFixed(2);

  const AllGPVDiff = (sumGPVThisAllStore - sumGPVLastAllStore).toFixed(2);

  const AllGPVDiffPercentage = calculatePercentage(
    sumGPVThisAllStore,
    sumGPVLastAllStore
  );

  //@desc same store GPV Calculations

  const sumGPVThisSameStore = sameStore
    .reduce((sum, obj) => sum + obj["gpv_this"], 0)
    .toFixed(2);

  const sumGPVLastSameStore = sameStore
    .reduce((sum, obj) => sum + obj["gpv_last"], 0)
    .toFixed(2);

  const SameGPVDiff = (sumGPVThisSameStore - sumGPVLastSameStore).toFixed(2);

  const SameGPVDiffPercentage = calculatePercentage(
    sumGPVThisSameStore,
    sumGPVLastSameStore
  );

  // const totalRevenue = filteredData.reduce((sum, item) => sum + item[' April Sales '], 0);
  // const averageRevenuePerOutlet = totalRevenue / totalOutlets;
  // const totalFootfall = filteredData.reduce((sum, item) => sum + item.Footfall, 0);
  // const averageFootfallPerOutlet = totalFootfall / totalOutlets;
  const totalProfitableStores = filteredData.filter(
    (item) => item.profitable === "Profitable"
  ).length;
  const totalNonProfitableStores = filteredData.filter(
    (item) => item.profitable !== "Profitable"
  ).length;

  return (
    <>
      <Card
        title={"All Store Sales"}
        mainData={sumSalesThisAllStore}
        diff={AllSalesDiff}
        percentage={AllSalesDiffPercentage}
        path={"/insight/sales-all"}
      />

      <Card
        title={"Same Store Sales"}
        mainData={sumSalesThisSameStore}
        diff={SameSalesDiff}
        percentage={SameSalesDiffPercentage}
        path={"/insight/sales-same"}
      />

      <Card
        title={"All Store FootFall"}
        mainData={sumFFThisAllStore}
        diff={AllFFDiff}
        percentage={AllFFDiffPercentage}
        path={"/insight/ff-all"}
      />

      <Card
        title={"Same Store FootFall"}
        mainData={sumFFThisSameStore}
        diff={SameFFDiff}
        percentage={SameFFDiffPercentage}
        path={"/insight/ff-same"}
      />

      <Card
        title={"All Store Basket"}
        mainData={avgBSThisAllStore}
        diff={AllBSDiff}
        percentage={AllBSDiffPercentage}
        path={"/insight/bs-all"}
      />

      <Card
        title={"Same Store Basket"}
        mainData={avgBSThisSameStore}
        diff={SameBSDiff}
        percentage={SameBSDiffPercentage}
        path={"/insight/bs-same"}
      />

      <Card
        title={"All Store GPV"}
        mainData={sumGPVThisAllStore}
        diff={AllGPVDiff}
        percentage={AllGPVDiffPercentage}
        path={"/insight/gpv-all"}
      />

      <Card
        title={"Same Store GPV"}
        mainData={sumGPVThisSameStore}
        diff={SameGPVDiff}
        percentage={SameGPVDiffPercentage}
        path={"/insight/gpv-same"}
      />
      {/* <Card
        title={"All Store"}
        mainData={allStoreCount}
        path={""}
      />

      <Card
        title={"Same Store"}
        mainData={sameStoreCount}
        path={""}
      />

      <Card
        title={"Profitable Stores"}
        mainData={totalProfitableStores}
        path={""}
      />
      <Card
        title={"Non Profitable Stores"}
        mainData={totalNonProfitableStores}
        path={""}
      /> */}

      <div href="#" className="mx-1 block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                  <h5 className="mb-2 text-sm lg:text-lg font-bold tracking-tight text-gray-600">All Store</h5>
                  <p className="font-semibold text-gray-950 text-2xl">{allStoreCount}</p>
              </div>

              <div href="#" className="mx-1 block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                  <h5 className="mb-2 text-sm lg:text-lg font-bold tracking-tight text-gray-600">Same Store</h5>
                  <p className="font-semibold text-gray-950 text-2xl">{sameStoreCount}</p>
              </div>
              

              <Tooltip id="my-tooltip" />
              <div href="#" className="block mx-1 w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                  <h5 className="mb-2 text-sm lg:text-lg font-bold tracking-tight text-gray-600">Profitable Stores:</h5>
                  <p className="font-semibold text-gray-950 text-lg lg:text-2xl">{totalProfitableStores}</p>
              </div>
              <div href="#" className="block mx-1 w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                  <h5 className="mb-2 text-sm lg:text-lg font-bold tracking-tight text-gray-600">Non Prof. Stores:</h5>
                  <p className="font-semibold text-gray-950 text-lg lg:text-2xl relative inline-block">{totalNonProfitableStores}
                  </p>
              </div>
    </>
  );
};
export default Cards;
