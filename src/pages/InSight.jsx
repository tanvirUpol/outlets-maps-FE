import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Search from "../components/Search";

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




    const allStore = data?.filter((obj) => obj["ff_this"] >= 0);
    const sameStore = data?.filter(
        (obj) => obj["ff_this"] > 0 && obj["ff_last"] > 0
    );

    const actual_data = (type === "all" ? allStore : sameStore)


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

    const sortedOutlets = (searchResults.length > 0 ? searchResults : actual_data)?.slice().sort((a, b) => {
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
        obj.sales_growth = calculateGrowthPercentage(obj.sales_this, obj.sales_last);
        obj.ff_growth = calculateGrowthPercentage(obj.ff_this, obj.ff_last);
        obj.bs_growth = calculateGrowthPercentage(obj.bs_this, obj.bs_last);
        obj.gpv_growth = calculateGrowthPercentage(obj.gpv_this, obj.gpv_last);
    }

    console.log(sortedOutlets);




    if (!sortedOutlets.length > 0) {
        return <Loading />
    }

    return (<>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold capitalize text-center mt-4 mb-8 text-rose-500">{field} and {field} Growth info for the month of {data[0].month}</h1>

            <div className="mb-4 flex items-start justify-between md:flex-row md:items-center">
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
                    <div className=" flex flex-col md:flex-row items-start md:items-center justify-center gap-2">
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




            <table className="min-w-full overflow-hidden rounded-lg bg-white text-sm sm:text-base md:text-lg  shadow-md">
                <thead>
                    <tr className="bg-teal-500 text-white capitalize">
                        <th className="p-4 text-left">Code</th>
                        <th className="p-4 text-left">Outlet Name</th>
                        <th className="p-4 text-left">{field} This</th>
                        <th className="p-4 text-left">{field} Last</th>
                        <th className="p-4 text-left">Growth</th>
                        {/* <th className="p-4 text-left">Total FF</th> */}
                    </tr>
                </thead>
                <tbody>
                    {sortedOutlets.map(
                        (outlet, index) => (
                            <tr
                                key={index}
                                className={`cursor-pointer font-medium hover:bg-teal-100 ${index % 2 === 0 ? "bg-teal-50" : "bg-white"
                                    }`}
                            >
                                <td className="px-4 py-3 hover:underline">
                                    <Link to={`/outlet/${outlet.outlet_code}`}>
                                        {outlet.outlet_code}
                                    </Link>
                                </td>
                                <td className="px-4 py-3">
                                    
                                        {outlet.name}
                                    
                                </td>
                                <td className="px-4 py-3">
                                    {numFor.format(outlet[field + "_this"].toFixed(2))}
                                </td>
                                <td className="px-4 py-3">
                                    {numFor.format(outlet[field + "_last"].toFixed(2))}
                                </td>
                                <td className={`p-3  ${outlet[field + "_growth"] <
                                    0 ? "text-rose-500" : "text-green-600"} font-medium`}>
                                    {
                                        outlet[field + "_growth"]
                                    }
                                </td>

                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    </>);
};
export default InSight;
