import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Search from "../components/Search";
import * as XLSX from "xlsx";

const InSight = () => {
    const [data, setData] = useState([]);
    const api_url = import.meta.env.VITE_REACT_APP_API_URL;
    const { user } = useAuthContext();

    const [searchResults, setSearchResults] = useState([]);
    const [searchText, setSearchText] = useState("");
    const { id } = useParams();
    const arr = id.split("-");
    const field = arr[0];
    const type = arr[1];
    const [sortBy, setSortBy] = useState(field + "_growth");
    const [sortOrder, setSortOrder] = useState("asc");

    // Function to handle sorting
    const handleSort = (event) => {
        const { name, value } = event.target;
        if (name === "sortBy") {
            setSortBy(value);
        } else if (name === "sortOrder") {
            setSortOrder(value);
        }
    };

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${api_url}/outlets`, {
                    headers: {
                        Authorization: `'Bearer ${user.token}`,
                    },
                });
                const json = await response.json();

                if (response.ok) {
                    // console.log(json);
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


    const downloadOutletsCollection = async () => {
        try {



            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "SPLY");
            XLSX.writeFile(workbook, "data.xlsx");
        } catch (error) {
            console.error("Error downloading users collection:", error);
        }
    };

    const allStore = data?.filter((obj) => obj["ff_this"] >= 0);

    const allStoreGrowth = allStore?.filter((obj) => obj[field + "_this"] >= obj[field + "_last"]);
    const allStoreGrowthCount = allStoreGrowth.length;

    const allStoreDeGrowth = allStore?.filter((obj) => obj[field + "_this"] < obj[field + "_last"]);
    const allStoreDeGrowthCount = allStoreDeGrowth.length;

    const customSameStores = [
        
            "D017", "D055", "D065", "D070", "D072", "D089", "D091", "F032", "F038", "F040", "F056", "F064", "F075", "F118",
            "F124", "F130", "F160", "F095", "F174", "D004", "D031", "D059", "D061", "D075", "D076", "F071", "F083", "F114",
            "F115", "F143", "F159", "F166", "F189", "S001", "S002", "S003", "S006", "F245", "F255", "S007", "S008", "D047",
            "F053", "F077", "F079", "F090", "F103", "F119", "F145", "F152", "F175", "F184", "F200", "C012", "D003", "D016",
            "D023", "D046", "D058", "D079", "F010", "F015", "F027", "F034", "F048", "F082", "F102", "F104", "F105", "F147",
            "F156", "F162", "F190", "F250", "F214", "F224", "D021", "D081", "D084", "D088", "F009", "F060", "F256", "F065",
            "F122", "F091", "F097", "F125", "F131", "F133", "F148", "F204", "F205", "F207", "F212", "F196", "F239", "R009",
            "F252", "F210", "F216", "R008", "F001", "F110", "F113", "F123", "F129", "F140", "F158", "F185", "F188", "F191",
            "F192", "F201", "F236", "F211", "F218", "F244", "F208", "K006", "F004", "F094", "F116", "F127", "F135", "F161",
            "F163", "F232", "F227", "F177", "F217", "D024", "F007", "F016", "F074", "F081", "F101", "F142", "F195", "F246",
            "F249", "F151", "F222", "C001", "C009", "C014", "C015", "F100", "F253", "F107", "F193", "D002", "D034", "D041",
            "D045", "D067", "D068", "D074", "D078", "D086", "F021", "F023", "F044", "F062", "F089", "F098", "F109", "F128",
            "F134", "F138", "F141", "F180", "C011", "C013", "F003", "F088", "F092", "F165", "F215", "C016", "F234", "F221",
            "F178", "F181", "D007", "D064", "F012", "D093", "F002", "F024", "F087", "F096", "F099", "F137", "F146", "F149",
            "F155", "F168", "F173", "D094", "F120", "F241", "F235", "F237", "F238", "F179", "F182", "D049", "D062", "F013",
            "F112", "F121", "F172", "D011", "D018", "D053", "D063", "F022", "F051", "F067", "F086", "F229", "F228", "F226",
            "F117", "F132", "F093", "D056", "D071", "F033", "F050", "F068", "F073", "F085", "F144", "F164", "D014", "F070",
            "F136", "F139", "F150", "F167", "F170", "F176", "F199", "F187", "F213", "D006", "D019", "D051", "D054", "D060",
            "D080", "D083", "F017", "F039", "F046", "F240", "F054", "F111", "D013", "D027", "F020", "F041", "F052", "F061",
            "F066", "F069", "F126"
        
    ]
    
    
      // console.log(customSameStores);
    
    
      const sameStore = data?.filter((obj)=> customSameStores.includes(obj["outlet_code"]) )
    // const sameStore = data?.filter(
    //     (obj) => obj["ff_this"] > 0 && obj["ff_last"] > 0
    // );

    console.log(sameStore);


    const sameStoreGrowth = sameStore?.filter((obj) => obj[field + "_this"] >= obj[field + "_last"]);
    const sameStoreGrowthCount = sameStoreGrowth.length;

    const sameStoreDeGrowth = sameStore?.filter((obj) => obj[field + "_this"] < obj[field + "_last"]);
    const sameStoreDeGrowthCount = sameStoreDeGrowth.length;

    const actual_data = type === "all" ? allStore : sameStore;

    // Sort the outlets based on the selected field and order

    const handleSearch = (query) => {
        setSearchText(query);
        console.log(query);

        const results = (type === "all" ? allStore : sameStore).filter((outlet) =>
            outlet.outlet_code.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
    };

    // console.log(searchResults);

    const sortedOutlets = (searchResults.length > 0 ? searchResults : actual_data)
        ?.slice()
        .sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];
            if (sortOrder === "asc") {
                return aValue - bValue;
            } else {
                return bValue - aValue;
            }
        });

    const numFor = Intl.NumberFormat("en-US");

    const calculateGrowthPercentage = (currentValue, lastValue) => {
        if (lastValue !== 0) {
            const growthPercentage = ((currentValue - lastValue) / lastValue) * 100;
            return growthPercentage.toFixed(2);
        }
        return 0;
    };

    for (const obj of sortedOutlets) {
        obj.sales_growth = calculateGrowthPercentage(
            obj.sales_this,
            obj.sales_last
        );
        obj.ff_growth = calculateGrowthPercentage(obj.ff_this, obj.ff_last);
        obj.bs_growth = calculateGrowthPercentage(obj.bs_this, obj.bs_last);
        obj.gpv_growth = calculateGrowthPercentage(obj.gpv_this, obj.gpv_last);
    }

    console.log(sortedOutlets);

    const totalThis = sortedOutlets.reduce(
        (sum, obj) => sum + obj[field + "_this"],
        0
    );

    const totalLast = sortedOutlets.reduce(
        (sum, obj) => sum + obj[field + "_last"],
        0
    );

    if (!sortedOutlets.length > 0) {
        return <Loading />;
    }

    return (
        <>
            <div className="container mx-auto p-4">

                <div className="flex flex-col gap-4 md:flex-row items-center justify-between mb-8 mt-4 " >
                    <h1 className="text-center text-base  lg:text-xl font-bold capitalize text-teal-500">
                        {type} Store <span className="uppercase text-rose-500">{field}</span>{" "}
                        and <span className="uppercase text-rose-500">{field} Growth </span>{" "}
                        info for {data[0].month} [ 1 - {data[0].day} ]
                    </h1>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={downloadOutletsCollection}
                    >
                        Download Data
                    </button>

                </div>

                <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="mx-1 block w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-5 shadow hover:bg-gray-100">
                        <h5 className="mb-1 text-sm font-bold uppercase tracking-tight text-gray-600 lg:text-base">
                            Total {type} Store
                        </h5>
                        <p className="mb-1 text-lg font-semibold text-gray-950 lg:text-2xl">
                            {(type === "all" ? allStore : sameStore).length}
                        </p>
                        {/* <p className="mb-1 text-xs font-semibold text-green-600">
                        {bestSellingProduct}
                    </p> */}
                    </div>
                    <div className="mx-1 block w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-5 shadow hover:bg-gray-100">
                        <h5 className="mb-1 text-sm font-bold uppercase tracking-tight text-gray-600 lg:text-base">
                            Total Growth ({field})
                        </h5>
                        <p className={`  ${totalThis < totalLast
                            ? "text-rose-500"
                            : "text-green-600"
                            } font-medium mb-1 text-lg  text-gray-950 lg:text-2xl`}>
                            {calculateGrowthPercentage(totalThis, totalLast)} %
                        </p>

                    </div>
                    <div className="mx-1 block w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-5 shadow hover:bg-gray-100">
                        <h5 className="mb-1 text-sm font-bold uppercase tracking-tight text-gray-600 lg:text-base">
                            Total {field} This
                        </h5>
                        <p className="mb-1 text-lg font-semibold text-gray-950 lg:text-2xl">
                            {numFor.format(Math.round(totalThis))}
                        </p>
                        {/* <p className="mb-1 text-xs font-semibold text-green-600">
                        {bestSellingProduct}
                    </p> */}
                    </div>

                    <div className="mx-1 block w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-5 shadow hover:bg-gray-100">
                        <h5 className="mb-1 text-sm font-bold uppercase tracking-tight text-gray-600 lg:text-base">
                            Total {field} Last
                        </h5>
                        <p className="mb-1 text-lg font-semibold text-gray-950 lg:text-2xl">
                            {numFor.format(totalLast)}
                        </p>
                        {/* <p className="mb-1 text-xs font-semibold text-green-600">
                        {bestSellingProduct}
                    </p> */}
                    </div>
                    <div className="mx-1 block w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-5 shadow hover:bg-gray-100">
                        <h5 className="mb-1 text-sm font-bold uppercase tracking-tight text-gray-600 lg:text-base">
                            Total Stores in Growth ({field})
                        </h5>
                        <p className="mb-1 text-lg font-semibold text-gray-950 lg:text-2xl">
                            {numFor.format(type == "all" ? allStoreGrowthCount : sameStoreGrowthCount)}
                        </p>
                        {/* <p className="mb-1 text-xs font-semibold text-green-600">
                        {bestSellingProduct}
                    </p> */}
                    </div>
                    <div className="mx-1 block w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-5 shadow hover:bg-gray-100">
                        <h5 className="mb-1 text-sm font-bold uppercase tracking-tight text-gray-600 lg:text-base">
                            Total Stores in Degrowth ({field})
                        </h5>
                        <p className="mb-1 text-lg font-semibold text-gray-950 lg:text-2xl">
                            {numFor.format(type == "all" ? allStoreDeGrowthCount : sameStoreDeGrowthCount)}
                        </p>
                        {/* <p className="mb-1 text-xs font-semibold text-green-600">
                        {bestSellingProduct}
                    </p> */}
                    </div>



                </div>
                <div className="mb-4 flex flex-col-reverse gap-3 items-start justify-between md:flex-row md:items-center">
                    <div className="mr-4 flex flex-col items-start justify-center gap-2 md:flex-row md:items-center">
                        <p className="font-semibold">Seach:</p>
                        <Search onSearch={handleSearch} />
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="mr-4 flex flex-col items-start justify-center gap-2 md:flex-row md:items-center">
                            <label htmlFor="sortBy" className="block font-semibold">
                                Sort By:
                            </label>
                            <select
                                name="sortBy"
                                id="sortBy"
                                value={sortBy}
                                onChange={handleSort}
                                className="rounded border p-2 uppercase"
                            >
                                <option value={field + "_this"}>{field + " This"}</option>
                                <option value={field + "_last"}>{field + " Last"}</option>
                                <option value={field + "_growth"}>{field + " Growth"}</option>
                            </select>
                        </div>
                        <div className=" flex flex-col items-start justify-center gap-2 md:flex-row md:items-center">
                            <label htmlFor="sortOrder" className="block font-semibold">
                                Sort Order:
                            </label>
                            <select
                                name="sortOrder"
                                id="sortOrder"
                                value={sortOrder}
                                onChange={handleSort}
                                className="rounded border p-2"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>
                </div>

                <table className="min-w-full overflow-hidden rounded-lg bg-white text-sm shadow-md sm:text-base  md:text-lg">
                    <thead>
                        <tr className="bg-teal-500 capitalize text-white">
                            <th className="px-3 py-4 text-left">Code</th>
                            <th className="px-3 py-4 text-left">Outlet Name</th>
                            <th className="px-3 py-4 text-left">{field} This</th>
                            <th className="px-3 py-4 text-left">{field} Last</th>
                            <th className="px-3 py-4 text-left">Growth</th>
                            {/* <th className="p-4 text-left">Total FF</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOutlets.map((outlet, index) => (
                            <React.Fragment key={index}>

                                {outlet[field + "_this"] !== 0 &&
                                    <tr
                                        key={index}
                                        className={`text-sm font-medium hover:bg-teal-100 ${index % 2 === 0 ? "bg-teal-50" : "bg-white"
                                            }`}
                                    >
                                        <td className="p-3 hover:underline cursor-pointer ">
                                            <Link className="flex justify-start items-center gap-2 underline text-blue-500" to={`/outlet/${outlet.outlet_code}`}>
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                                </svg> */}
                                                <span>{outlet.outlet_code}</span>
                                            </Link>
                                        </td>
                                        <td className="p-3">{outlet.name}</td>
                                        <td className="p-3">
                                            {numFor.format(outlet[field + "_this"].toFixed(2))}
                                        </td>
                                        <td className="p-3">
                                            {numFor.format(outlet[field + "_last"].toFixed(2))}
                                        </td>
                                        <td
                                            className={`p-3  ${outlet[field + "_growth"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}
                                        >
                                            {outlet[field + "_growth"]}
                                        </td>
                                    </tr>}

                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default InSight;
