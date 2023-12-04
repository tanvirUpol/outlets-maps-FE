import React, { useEffect, useState } from "react";
import Search from "./Search";


const DataTableAlt = ({ data, benchData, allData }) => {
    // console.log(data);

    const [sortOrder, setSortOrder] = useState("desc");
    const [sortBy, setSortBy] = useState(null);
    const [customData, setCustomData] = useState([])
    // const [customBenchData, setCustomBenchData] = useState([])
    const [searchResults, setSearchResults] = useState([]);

    console.log("data", data);
    console.log("all-data", allData);





    useEffect(() => {
        const updatedData = data.map(item => {
            const gp_percent = item.pos_gpv_this / item.sales_this
            return {
                ...item,
                gp_percent: gp_percent ? gp_percent : 0,
            }
        });



        const updatedBenchData = benchData.map(item => {
            const gp_percent = item.pos_gpv_this / item.sales_this
            return {
                ...item,
                gp_percent: gp_percent ? gp_percent : 0,
            }
        });

        const updatedFinalData = updatedData.map(item => {
            let connectedObj = updatedBenchData.find(o => o.cat_3 === item.cat_3)
            return {
                ...item,
                bench_sales_contribution: connectedObj?.sales_contribution,
                sales_diff: item.sales_contribution - connectedObj?.sales_contribution,
                bench_gp_percent: connectedObj?.gp_percent,
                gp_diff: item.gp_percent - connectedObj?.gp_percent,
            }
        }).slice().sort((a, b) => {
            const aValue = a["sales_contribution"];
            const bValue = b["sales_contribution"];

            return bValue - aValue;

        });

        // console.log(updatedFinalData);

        function filterObjectsFor85Percent(arr) {
            let sum = 0;
            let result = [];

            console.log(arr);

            for (let i = 0; i < arr.length; i++) {
                const currentObj = arr[i];
                // console.log(currentObj);
                if (sum + currentObj.sales_contribution <= 0.85) {
                    result.push(currentObj);
                    sum += currentObj.sales_contribution;
                } else {
                    break; // Stop when the sum exceeds 85%
                }
            }

            return result;
        }

        const updatedFinalDataCut = filterObjectsFor85Percent(updatedFinalData)
        console.log(updatedFinalDataCut);


        setCustomData(updatedFinalDataCut)
        // setCustomBenchData(updatedBenchData)



        return () => {
            updatedData
        }
    }, [data])


    const toggleSort = (column) => {
        if (column === sortBy) {
            // If the same column is clicked, toggle the sorting direction
            console.log(column);
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // If a new column is clicked, set it as the sorting column and default to ascending order
            setSortBy(column);
            setSortOrder("asc");
        }
    };



    const handleSearch = (query) => {
        const results = customData?.filter((outlet) =>
            outlet.cat_3.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
    };



    const sortedOutlets = (searchResults.length > 0 ? searchResults : customData)
        ?.slice().sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];
            if (sortOrder === "asc") {
                return aValue - bValue;
            } else {
                return bValue - aValue;
            }
        });


    // console.log(sortedOutlets);

    const numFor = Intl.NumberFormat("en-US");

    if (!allData?.length > 0) {
        return <div class="border border-300 shadow rounded-md p-4 mt-4 w-full mx-auto">
            <div class="animate-pulse flex space-x-4">
            
                <div class="flex-1 space-y-4 py-1">
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="h-2 bg-slate-200 rounded"></div>
                    
                </div>
            </div>
        </div>;
    }


    const getMaxGP = (cat3Name, format) => {
        const filteredItems = allData.filter((item) => item.cat_3 === cat3Name && item.format === format);

        if (filteredItems.length === 0) {
            return 'Category not found';
        }

        const maxGP = filteredItems.reduce((maxItem, currentItem) => {
            return currentItem.gp_percent > maxItem.gp_percent ? currentItem : maxItem;
        });

        return maxGP.gp_percent.toFixed(2);
    };


    const getMaxSC = (cat3Name, format) => {
        const filteredItems = allData.filter((item) => item.cat_3 === cat3Name && item.format === format);

        if (filteredItems.length === 0) {
            return 'Category not found';
        }

        const maxSC = filteredItems.reduce((maxItem, currentItem) => {
            return currentItem.sales_contribution > maxItem.sales_contribution ? currentItem : maxItem;
        });

        return maxSC.sales_contribution;
    };

    
    const getMaxGPVPercent = (cat3Name,format) => {
        const filteredItems = allData.filter((item) => item.cat_3 === cat3Name && item.format === format);

        if (filteredItems.length === 0) {
            return 'Category not found';
        }

        const maxSC = filteredItems.reduce((maxItem, currentItem) => {
            return currentItem.pos_gpv_value > maxItem.pos_gpv_value ? currentItem : maxItem;
        });

        return maxSC.pos_gpv_value;
    }


    return (<>
        <div className="mr-4 w-full flex flex-col items-start justify-center gap-2 md:flex-row md:items-center my-4">
            {/* <p className="font-semibold">Seach:</p> */}
            <Search onSearch={handleSearch} />
        </div>
        <div className="overflow-auto h-screen relative" >
            <table className=" mb-16 mt-4 min-w-full shadow-sm rounded">
                <thead className="sticky top-0">
                    <tr className="bg-teal-500 ">
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                            Division
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                            CAT 1
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                            CAT 3
                        </th>
                        <th onClick={() => toggleSort("sales_contribution")} className="cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                            Sales Contribution
                            {sortBy === "sales_contribution" &&
                                (sortOrder === "asc" ? " ▲" : " ▼")}
                        </th>
                        <th onClick={() => toggleSort("bench_sales_contribution")} className="cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                            Bench Sales Contribution
                            {sortBy === "bench_sales_contribution" &&
                                (sortOrder === "asc" ? " ▲" : " ▼")}
                        </th>
                        <th onClick={() => toggleSort("sales_diff")} className="cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                            Sales Diff
                            {sortBy === "sales_diff" &&
                                (sortOrder === "asc" ? " ▲" : " ▼")}
                        </th>
                        <th onClick={() => toggleSort("pos_gpv_this")} className="cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                            GPV This
                            {sortBy === "pos_gpv_this" &&
                                (sortOrder === "asc" ? " ▲" : " ▼")}
                        </th>
                        <th onClick={() => toggleSort("gpv_value")} className="cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                            GPV Growth Value
                            {sortBy === "gpv_value" &&
                                (sortOrder === "asc" ? " ▲" : " ▼")}
                        </th>
                        <th onClick={() => toggleSort("gpv_growth")} className="cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                            GPV Growth Percent
                            {sortBy === "gpv_growth" &&
                                (sortOrder === "asc" ? " ▲" : " ▼")}
                        </th>
                       
                        <th  className="cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                            Bench GPV Value
                            {sortBy === "gpv_growth" &&
                                (sortOrder === "asc" ? " ▲" : " ▼")}
                        </th>
                        <th onClick={() => toggleSort("gp_percent")} className="cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                            GP%
                            {sortBy === "gp_percent" &&
                                (sortOrder === "asc" ? " ▲" : " ▼")}
                        </th>
                        <th onClick={() => toggleSort("bench_gp_percent")} className="cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                            Bench GP%
                            {sortBy === "bench_gp_percent" &&
                                (sortOrder === "asc" ? " ▲" : " ▼")}
                        </th>
                        <th onClick={() => toggleSort("gp_diff")} className="cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                            GP% Diff
                            {sortBy === "gp_diff" &&
                                (sortOrder === "asc" ? " ▲" : " ▼")}
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {sortedOutlets.map((item, index) => (
                        <React.Fragment key={index}>
                            {
                                item.master_category !== "44-HOME DELIVERY" &&
                                item.master_category !== "Undf# 2" && (
                                    <>
                                        <tr className="cursor-pointer bg-rose-50 text-xs transition-colors hover:bg-rose-100 sm:text-sm">
                                            <td className="p-3">{item.master_category}</td>
                                            <td className="p-3">{item.cat_1}</td>
                                            <td className="p-3">{item.cat_3}</td>
                                            <td className={`p-3  ${item["sales_contribution"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {(item["sales_contribution"] * 100).toFixed(2)} %
                                            </td>
                                            <td className={`p-3  ${item["sales_contribution"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {(getMaxSC(item.cat_3, item.format) * 100).toFixed(2)} %
                                            </td>
                                            {/* <td className={`p-3  ${item["bench_sales_contribution"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {(item["bench_sales_contribution"] * 100).toFixed(2)} %
                                            </td> */}
                                            <td className={`p-3  ${item["sales_diff"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {(item["sales_diff"] * 100).toFixed(2)}
                                            </td>
                                            <td className={`p-3  ${item["pos_gpv_this"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {numFor.format((item["pos_gpv_this"] * 100).toFixed())}
                                            </td>
                                            <td className={`p-3  ${item["gpv_value"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {numFor.format((item["gpv_value"]).toFixed(2))} 
                                            </td>
                                            <td className={`p-3  ${item["gpv_growth"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {numFor.format((item["gpv_growth"]).toFixed(2))} %
                                            </td>
                                            <td className={`p-3  ${(getMaxGPVPercent(item.cat_3, item.format)) < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {numFor.format((getMaxGPVPercent(item.cat_3, item.format)).toFixed(2))} 
                                            </td>
                                            <td className={`p-3  ${item["gp_percent"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {(item["gp_percent"] * 100).toFixed(2)} %
                                            </td>
                                            {/* <td className={`p-3  ${item["bench_gp_percent"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {(item["bench_gp_percent"] * 100).toFixed(2)} %
                                            </td> */}
                                            <td className={`p-3  ${item["bench_gp_percent"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {getMaxGP(item.cat_3, item.format)} %
                                            </td>
                                            <td className={`p-3  ${item["gp_diff"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {(item["gp_diff"] * 100).toFixed(2)} %
                                            </td>

                                        </tr>
                                    </>
                                )}


                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    </>
    );
};
export default DataTableAlt;
