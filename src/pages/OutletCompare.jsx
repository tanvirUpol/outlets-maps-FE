import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Search from "../components/Search";

const OutletCompare = () => {
  const [data, setData] = useState([]);
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;
  const { user } = useAuthContext();
  const [sortBy, setSortBy] = useState("sales_this");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Function to handle sorting
  const handleSort = (event) => {
    const { name, value } = event.target;
    if (name === "sortBy") {
      setSortBy(value);
    } else if (name === "sortOrder") {
      setSortOrder(value);
    }
  };

  // Fetch data from the API
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

  // Sort the outlets based on the selected field and order
  const sortedOutlets = data?.slice().sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === "asc") {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });
  // console.log(data);

  const handleSearch = (query) => {
    setSearchText(query);
    console.log(query);
    if (query.trim() === "") {
      // If the query is empty, show all data
      setSearchResults(sortedOutlets);
    } else {
      // Otherwise, filter the outlets based on the query
      const results = sortedOutlets?.filter((outlet) =>
        outlet.outlet_code.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const numFor = Intl.NumberFormat("en-US");

  if (!data.length > 0) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Outlets</h1>
      <div className="mb-4 flex md:flex-row items-start md:items-center justify-between">
        <div className="mr-4 flex flex-col items-start justify-center gap-2">
          <p className="font-semibold">Seach:</p>
          <Search onSearch={handleSearch} />
        </div>

        <div className="flex items-center justify-center">
          <div className="mr-4 flex flex-col md:flex-row items-start md:items-center justify-center gap-2">
            <label htmlFor="sortBy" className="block font-semibold">
              Sort By:
            </label>
            <select
              name="sortBy"
              id="sortBy"
              value={sortBy}
              onChange={handleSort}
              className="rounded border p-2"
            >
              <option value="total_sales">Total Sales</option>
              <option value="total_bs">Total BS</option>
              <option value="total_pos_gpv">Total POS GPV</option>
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
      <table className="min-w-full overflow-hidden rounded-lg bg-white text-sm shadow-md">
        <thead>
          <tr className="bg-teal-500 text-white">
            <th className="p-4 text-left">Outlet Code</th>
            <th className="p-4 text-left">Total Sales</th>
            <th className="p-4 text-left">Total BS</th>
            <th className="p-4 text-left">Total GPV</th>
            <th className="p-4 text-left">Total FF</th>
          </tr>
        </thead>
        <tbody>
          {(searchText === "" ? sortedOutlets : searchResults).map(
            (outlet, index) => (
              <tr
                key={index}
                className={`cursor-pointer font-medium hover:bg-teal-100 ${
                  index % 2 === 0 ? "bg-teal-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-3 hover:underline">
                  <Link to={`/outlet/${outlet.outlet_code}`}>
                    {outlet.outlet_code}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  {numFor.format(outlet.sales_this.toFixed(2))}
                </td>
                <td className="px-4 py-3">
                  {numFor.format(outlet.bs_this.toFixed(2))}
                </td>
                <td className="px-4 py-3">
                  {numFor.format(outlet.gpv_this.toFixed(2))}
                </td>
                <td className="px-4 py-3">
                  {numFor.format(outlet.ff_this.toFixed(2))}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
export default OutletCompare;
