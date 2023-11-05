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

    const sameStore = data?.filter(
        (obj) => obj["ff_this"] > 0 && obj["ff_last"] > 0
    );

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

    console.log(searchResults);

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

                <div className="flex items-center justify-between mb-8 mt-4 " >
                    <h1 className="text-center text-base  lg:text-xl font-bold capitalize text-teal-500">
                        {type} Store <span className="uppercase text-rose-500">{field}</span>{" "}
                        and <span className="uppercase text-rose-500">{field} Growth </span>{" "}
                        info for {data[0].month} [ 1 - {data[0].day} ]
                    </h1>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={downloadOutletsCollection}
                    >
                        Download Full Data
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
