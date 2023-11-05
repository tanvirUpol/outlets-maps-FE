import React, { useEffect, useState } from "react";
import Search from "./Search";


const DataTableAlt = ({ data, benchData }) => {
    // console.log(benchData);

    const [sortOrder, setSortOrder] = useState("desc");
    const [sortBy, setSortBy] = useState(null);
    const [customData, setCustomData] = useState([])
    // const [customBenchData, setCustomBenchData] = useState([])
    const [searchResults, setSearchResults] = useState([]);

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
                console.log(currentObj);
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
                                                {(item["sales_contribution"] * 100).toFixed(4)} %
                                            </td>
                                            <td className={`p-3  ${item["bench_sales_contribution"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {(item["bench_sales_contribution"] * 100).toFixed(4)} %
                                            </td>
                                            <td className={`p-3  ${item["sales_diff"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {(item["sales_diff"] * 100).toFixed(4)}
                                            </td>
                                            <td className={`p-3  ${item["gp_percent"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {(item["gp_percent"] * 100).toFixed(4)} %
                                            </td>
                                            <td className={`p-3  ${item["bench_gp_percent"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {(item["bench_gp_percent"] * 100).toFixed(4)} %
                                            </td>
                                            <td className={`p-3  ${item["gp_diff"] < 0
                                                ? "text-rose-500"
                                                : "text-green-600"
                                                } font-medium`}>
                                                {(item["gp_diff"] * 100).toFixed(4)} %
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
