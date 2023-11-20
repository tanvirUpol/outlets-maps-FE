import { Tooltip } from "react-tooltip";
import Card from "./Card";
const Cards = ({ filteredData }) => {
  const totalOutlets = filteredData.length;
  const allStore = filteredData.filter((obj) => obj["ff_this"] >= 0);
  // const sameStore = filteredData.filter(
  //   (obj) => obj["ff_this"] > 0 && obj["ff_last"] > 0
  // );


  // console.log(sameStore);

  // const customSameStores = [
  //   "D017", 
  //   "D055", 
  //   "D065", 
  //   "D070", 
  //   "D072", 
  //   "D089", 
  //   "D091", 
  //   "F032", 
  //   "F038", 
  //   "F040", 
  //   "F056", 
  //   "F064", 
  //   "F075", 
  //   "F118", 
  //   "F124", 
  //   "F130", 
  //   "F160", 
  //   "F095", 
  //   "F174", 
  //   "D004", 
  //   "D031", 
  //   "D059", 
  //   "D061", 
  //   "D075", 
  //   "D076", 
  //   "F071", 
  //   "F083", 
  //   "F114", 
  //   "F115", 
  //   "F143", 
  //   "F159", 
  //   "F166", 
  //   "F189", 
  //   "S001", 
  //   "S002", 
  //   "S003", 
  //   "S006", 
  //   "S007", 
  //   "S008", 
  //   "D047", 
  //   "F053", 
  //   "F077", 
  //   "F079", 
  //   "F090", 
  //   "F103", 
  //   "F119", 
  //   "F145", 
  //   "F152", 
  //   "F175", 
  //   "F184", 
  //   "F200", 
  //   "C012", 
  //   "D003", 
  //   "D016", 
  //   "D023", 
  //   "D046", 
  //   "D058", 
  //   "D079", 
  //   "F010", 
  //   "F015", 
  //   "F027", 
  //   "F034", 
  //   "F048", 
  //   "F082", 
  //   "F102", 
  //   "F104", 
  //   "F105", 
  //   "F147", 
  //   "F156", 
  //   "F162", 
  //   "F190", 
  //   "F214", 
  //   "F224", 
  //   "D021", 
  //   "D081", 
  //   "D084", 
  //   "D088", 
  //   "F009", 
  //   "F060", 
  //   "F065", 
  //   "F122", 
  //   "F091", 
  //   "F097", 
  //   "F125", 
  //   "F131", 
  //   "F133", 
  //   "F148", 
  //   "F204", 
  //   "F205", 
  //   "F207", 
  //   "F216", 
  //   "R008", 
  //   "F001", 
  //   "F110", 
  //   "F113", 
  //   "F123", 
  //   "F129", 
  //   "F140", 
  //   "F158", 
  //   "F185", 
  //   "F188", 
  //   "F191", 
  //   "F192", 
  //   "F201", 
  //   "F236", 
  //   "F211", 
  //   "F208", 
  //   "K006", 
  //   "F004", 
  //   "F094", 
  //   "F116", 
  //   "F127", 
  //   "F135", 
  //   "F161", 
  //   "F163", 
  //   "F232", 
  //   "F177", 
  //   "F217", 
  //   "D024", 
  //   "F007", 
  //   "F016", 
  //   "F074", 
  //   "F081", 
  //   "F101", 
  //   "F142", 
  //   "F151", 
  //   "F222", 
  //   "C001", 
  //   "C009", 
  //   "C014", 
  //   "C015", 
  //   "F100", 
  //   "F107", 
  //   "F193", 
  //   "D002", 
  //   "D034", 
  //   "D041", 
  //   "D045", 
  //   "D067", 
  //   "D068", 
  //   "D074", 
  //   "D078", 
  //   "D086", 
  //   "F021", 
  //   "F023", 
  //   "F044", 
  //   "F062", 
  //   "F089", 
  //   "F098", 
  //   "F109", 
  //   "F128", 
  //   "F134", 
  //   "F138", 
  //   "F141", 
  //   "F180", 
  //   "C011", 
  //   "C013", 
  //   "F003", 
  //   "F088", 
  //   "F092", 
  //   "F165", 
  //   "F215", 
  //   "C016", 
  //   "F234", 
  //   "F178", 
  //   "F181", 
  //   "D007", 
  //   "D064", 
  //   "F012", 
  //   "D093", 
  //   "F002", 
  //   "F024", 
  //   "F087", 
  //   "F096", 
  //   "F099", 
  //   "F137", 
  //   "F146", 
  //   "F149", 
  //   "F155", 
  //   "F168", 
  //   "F173", 
  //   "D094", 
  //   "F179", 
  //   "F182", 
  //   "D049", 
  //   "D062", 
  //   "F013", 
  //   "F112", 
  //   "F121", 
  //   "F172", 
  //   "D011", 
  //   "D018", 
  //   "D053", 
  //   "D063", 
  //   "F022", 
  //   "F051", 
  //   "F067", 
  //   "F086", 
  //   "F229", 
  //   "F117", 
  //   "F132", 
  //   "F093", 
  //   "D056", 
  //   "D071", 
  //   "F033", 
  //   "F050", 
  //   "F068", 
  //   "F073", 
  //   "F085", 
  //   "F144", 
  //   "F164", 
  //   "D014", 
  //   "F070", 
  //   "F136", 
  //   "F139", 
  //   "F150", 
  //   "F167", 
  //   "F170", 
  //   "F176", 
  //   "F199", 
  //   "F187", 
  //   "F213", 
  //   "D006", 
  //   "D019", 
  //   "D051", 
  //   "D054", 
  //   "D060", 
  //   "D080", 
  //   "D083", 
  //   "F017", 
  //   "F039", 
  //   "F046", 
  //   "F054", 
  //   "F111", 
  //   "D013", 
  //   "D027", 
  //   "F020", 
  //   "F041", 
  //   "F052", 
  //   "F061", 
  //   "F066", 
  //   "F069", 
  //   "F126"    
  // ]
  const customSameStores = [
    "D017", "D055", "D065", "D070", "D072", "D089", "D091", "F032", "F038", "F040",
    "F056", "F064", "F075", "F118", "F124", "F130", "F160", "F095", "F174", "D004",
    "D031", "D059", "D061", "D075", "D076", "F071", "F083", "F114", "F115", "F143",
    "F159", "F166", "F189", "S001", "S002", "S003", "S006", "F245", "S007", "S008",
    "D047", "F053", "F077", "F079", "F090", "F103", "F119", "F145", "F152", "F175",
    "F184", "F200", "C012", "D003", "D016", "D023", "D046", "D058", "D079", "F010",
    "F015", "F027", "F034", "F048", "F082", "F102", "F104", "F105", "F147", "F156",
    "F162", "F190", "F214", "F224", "D021", "D081", "D084", "D088", "F009", "F060",
    "F065", "F122", "F091", "F097", "F125", "F131", "F133", "F148", "F204", "F205",
    "F207", "F212", "F196", "F239", "R009", "F216", "R008", "F001", "F110", "F113",
    "F123", "F129", "F140", "F158", "F185", "F188", "F191", "F192", "F201", "F236",
    "F211", "F218", "F208", "K006", "F004", "F094", "F116", "F127", "F135", "F161",
    "F163", "F232", "F227", "F177", "F217", "D024", "F007", "F016", "F074", "F081",
    "F101", "F142", "F195", "F246", "F151", "F222", "C001", "C009", "C014", "C015",
    "F100", "F107", "F193", "D002", "D034", "D041", "D045", "D067", "D068", "D074",
    "D078", "D086", "F021", "F023", "F044", "F062", "F089", "F098", "F109", "F128",
    "F134", "F138", "F141", "F180", "C011", "C013", "F003", "F088", "F092", "F165",
    "F215", "C016", "F234", "F178", "F181", "D007", "D064", "F012", "D093", "F002",
    "F024", "F087", "F096", "F099", "F137", "F146", "F149", "F155", "F168", "F173",
    "D094", "F120", "F241", "F235", "F237", "F179", "F182", "D049", "D062", "F013",
    "F112", "F121", "F172", "D011", "D018", "D053", "D063", "F022", "F051", "F067",
    "F086", "F229", "F228", "F117", "F132", "F093", "D056", "D071", "F033", "F050",
    "F068", "F073", "F085", "F144", "F164", "D014", "F070", "F136", "F139", "F150",
    "F167", "F170", "F176", "F199", "F187", "F213", "D006", "D019", "D051", "D054",
    "D060", "D080", "D083", "F017", "F039", "F046", "F240", "F054", "F111", "D013",
    "D027", "F020", "F041", "F052", "F061", "F066", "F069", "F126"
]


  // console.log(customSameStores);


  const sameStore = filteredData.filter((obj)=> customSameStores.includes(obj["outlet_code"]) )

  // console.log(newSameStore);
  

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

  // console.log(sumSalesThisSameStore);

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

      {/* <Card
        title={"Same Store Sales"}
        mainData={sumSalesThisSameStore}
        diff={SameSalesDiff}
        percentage={SameSalesDiffPercentage}
        path={"/insight/sales-same"}
      /> */}

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

      {/* <Card
        title={"Same Store GPV"}
        mainData={sumGPVThisSameStore}
        diff={SameGPVDiff}
        percentage={2}
        path={"/insight/gpv-same"}
      /> */}
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
