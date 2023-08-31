import React, { useState } from "react";

const DataTables = ({ data,growth }) => {
    console.log();
    const [expandedMaster, setExpandedMaster] = useState("");
    const [expandedCat1, setExpandedCat1] = useState("");

    const toggleMaster = (masterCategory) => {
        if (expandedMaster === masterCategory) {
            setExpandedMaster("");
        } else {
            setExpandedMaster(masterCategory);
        }
    };

    const toggleCat1 = (cat1Value) => {
        if (expandedCat1 === cat1Value) {
            setExpandedCat1("");
        } else {
            setExpandedCat1(cat1Value);
        }
    };

    const getMasterSales = (masterCategory, field) => {
        const cat1Items = data.filter(
            (item) => item["master_category"] === masterCategory
        );
        return cat1Items.reduce((sum, item) => sum + item[field], 0);
    };

    const getCat1Sales = (cat1category, field) => {
        const cat1Items = data.filter(
            (item) => item["cat_1"] === cat1category
        );
        return cat1Items.reduce((sum, item) => sum + item[field], 0);
    };

    const calculateGrowthPercentage = (currentValue, lastValue) => {
        if (lastValue !== 0) {
            const growthPercentage = ((currentValue - lastValue) / lastValue) * 100;
            return growthPercentage.toFixed(2);
        }
        return 0;
    };
    return (
        <>
            <table className="min-w-full mb-16">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Master Category
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Sales This
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Sales Last
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Sales Growth %
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {data
                        .reduce((uniqueMasters, item) => {
                            if (!uniqueMasters.includes(item["master_category"])) {
                                uniqueMasters.push(item["master_category"]);
                            }
                            return uniqueMasters;
                        }, [])
                        .map((masterCategory, index) => (
                            <React.Fragment key={index}>
                            
                            {(growth == "degrowth" && calculateGrowthPercentage(
                                getMasterSales(masterCategory, "sales_this"),
                                getMasterSales(masterCategory, "sales_last")
                            ) < 0 &&
                                <React.Fragment key={index}>
                                    <tr
                                        className={`cursor-pointer text-xs transition-colors hover:bg-gray-50 sm:text-base ${expandedMaster === masterCategory ? "bg-gray-50" : ""
                                            }`}
                                        onClick={() => toggleMaster(masterCategory)}
                                    >
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={() => toggleMaster(masterCategory)}
                                                className="mr-2 focus:outline-none"
                                            >
                                                {expandedMaster === masterCategory ? "-" : "+"}
                                            </button>
                                            {masterCategory}
                                        </td>
                                        <td className="px-4 py-4">
                                            {getMasterSales(masterCategory, "sales_this").toFixed(2)}
                                        </td>
                                        <td className="px-4 py-4">
                                            {getMasterSales(masterCategory, "sales_last").toFixed(2)}
                                        </td>
                                        <td className="px-4 py-4">
                                            {calculateGrowthPercentage(
                                                getMasterSales(masterCategory, "sales_this"),
                                                getMasterSales(masterCategory, "sales_last")
                                            )}
                                            %
                                        </td>
                                    </tr>
                                    {expandedMaster === masterCategory && (
                                        <tr>
                                            <td colSpan="4" className="py-4">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="bg-gray-50">
                                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                CAT 1
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                Sales This
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                Sales Last
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                Sales Growth %
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-gray-100 text-xs sm:text-base">
                                                        {data
                                                            .filter(
                                                                (item) =>
                                                                    item["master_category"] === masterCategory
                                                            )
                                                            .reduce((uniqueCat1, subItem) => {
                                                                if (!uniqueCat1.includes(subItem["cat_1"])) {
                                                                    uniqueCat1.push(subItem["cat_1"]);
                                                                }
                                                                return uniqueCat1;
                                                            }, [])
                                                            .map((subItem, subIndex) => (
                                                                <React.Fragment key={subIndex}>
                                                                    <tr
                                                                        className={`cursor-pointer transition-colors hover:bg-gray-50 ${expandedCat1 === subItem
                                                                                ? "bg-gray-50"
                                                                                : ""
                                                                            }`}
                                                                        onClick={() => toggleCat1(subItem)}
                                                                    >
                                                                        <td className="px-4 py-4">
                                                                            <button
                                                                                onClick={() => toggleCat1(subItem)}
                                                                                className="mr-2 focus:outline-none"
                                                                            >
                                                                                {expandedCat1 === subItem ? "-" : "+"}
                                                                            </button>
                                                                            {subItem}
                                                                        </td>
                                                                        <td className="px-4 py-4">
                                                                            {getCat1Sales(
                                                                                subItem,
                                                                                "sales_this"
                                                                            ).toFixed(2)}
                                                                        </td>
                                                                        <td className="px-4 py-4">
                                                                            {getCat1Sales(
                                                                                subItem,
                                                                                "sales_last"
                                                                            ).toFixed(2)}
                                                                        </td>
                                                                        <td className="px-4 py-4">
                                                                            {calculateGrowthPercentage(
                                                                                getCat1Sales(
                                                                                    subItem,
                                                                                    "sales_this"
                                                                                ),
                                                                                getCat1Sales(
                                                                                    subItem,
                                                                                    "sales_last"
                                                                                )
                                                                            )}
                                                                            %
                                                                        </td>
                                                                    </tr>
                                                                    {expandedCat1 === subItem && (
                                                                        <tr>
                                                                            <td colSpan="4" className="py-4">
                                                                                <table className="w-full">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                                                Cat 3
                                                                                            </th>
                                                                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                                                Sales This
                                                                                            </th>
                                                                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                                                Sales Last
                                                                                            </th>
                                                                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                                                Sales Growth %
                                                                                            </th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody className="bg-gray-400">
                                                                                        {data
                                                                                            .filter(
                                                                                                (item) =>
                                                                                                    item["cat_1"] === subItem
                                                                                            )
                                                                                            .map((cat3Item, cat3Index) => (
                                                                                                <tr
                                                                                                    key={cat3Index}
                                                                                                    className="bg-gray-50"
                                                                                                >
                                                                                                    <td className="px-4 py-4 ">
                                                                                                        {cat3Item["cat_3"]}
                                                                                                    </td>
                                                                                                    <td className="px-4 py-4 ">
                                                                                                        {cat3Item["sales_this"]}
                                                                                                    </td>
                                                                                                    <td className="px-4 py-4 ">
                                                                                                        {cat3Item["sales_last"]}
                                                                                                    </td>
                                                                                                    <td className="px-4 py-4 ">
                                                                                                        {calculateGrowthPercentage(
                                                                                                            cat3Item["sales_this"],
                                                                                                            cat3Item["sales_last"]
                                                                                                        )}
                                                                                                        %
                                                                                                    </td>
                                                                                                </tr>
                                                                                            ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>)}
                            {(growth == "growth" && calculateGrowthPercentage(
                                getMasterSales(masterCategory, "sales_this"),
                                getMasterSales(masterCategory, "sales_last")
                            ) > 0 &&
                                <React.Fragment key={index}>
                                    <tr
                                        className={`cursor-pointer text-xs transition-colors hover:bg-gray-50 sm:text-base ${expandedMaster === masterCategory ? "bg-gray-50" : ""
                                            }`}
                                        onClick={() => toggleMaster(masterCategory)}
                                    >
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={() => toggleMaster(masterCategory)}
                                                className="mr-2 focus:outline-none"
                                            >
                                                {expandedMaster === masterCategory ? "-" : "+"}
                                            </button>
                                            {masterCategory}
                                        </td>
                                        <td className="px-4 py-4">
                                            {getMasterSales(masterCategory, "sales_this").toFixed(2)}
                                        </td>
                                        <td className="px-4 py-4">
                                            {getMasterSales(masterCategory, "sales_last").toFixed(2)}
                                        </td>
                                        <td className="px-4 py-4">
                                            {calculateGrowthPercentage(
                                                getMasterSales(masterCategory, "sales_this"),
                                                getMasterSales(masterCategory, "sales_last")
                                            )}
                                            %
                                        </td>
                                    </tr>
                                    {expandedMaster === masterCategory && (
                                        <tr>
                                            <td colSpan="4" className="py-4">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="bg-gray-50">
                                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                CAT 1
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                Sales This
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                Sales Last
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                Sales Growth %
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-gray-100 text-xs sm:text-base">
                                                        {data
                                                            .filter(
                                                                (item) =>
                                                                    item["master_category"] === masterCategory
                                                            )
                                                            .reduce((uniqueCat1, subItem) => {
                                                                if (!uniqueCat1.includes(subItem["cat_1"])) {
                                                                    uniqueCat1.push(subItem["cat_1"]);
                                                                }
                                                                return uniqueCat1;
                                                            }, [])
                                                            .map((subItem, subIndex) => (
                                                                <React.Fragment key={subIndex}>
                                                                    <tr
                                                                        className={`cursor-pointer transition-colors hover:bg-gray-50 ${expandedCat1 === subItem
                                                                                ? "bg-gray-50"
                                                                                : ""
                                                                            }`}
                                                                        onClick={() => toggleCat1(subItem)}
                                                                    >
                                                                        <td className="px-4 py-4">
                                                                            <button
                                                                                onClick={() => toggleCat1(subItem)}
                                                                                className="mr-2 focus:outline-none"
                                                                            >
                                                                                {expandedCat1 === subItem ? "-" : "+"}
                                                                            </button>
                                                                            {subItem}
                                                                        </td>
                                                                        <td className="px-4 py-4">
                                                                            {getCat1Sales(
                                                                                subItem,
                                                                                "sales_this"
                                                                            ).toFixed(2)}
                                                                        </td>
                                                                        <td className="px-4 py-4">
                                                                            {getCat1Sales(
                                                                                subItem,
                                                                                "sales_last"
                                                                            ).toFixed(2)}
                                                                        </td>
                                                                        <td className="px-4 py-4">
                                                                            {calculateGrowthPercentage(
                                                                                getCat1Sales(
                                                                                    subItem,
                                                                                    "sales_this"
                                                                                ),
                                                                                getCat1Sales(
                                                                                    subItem,
                                                                                    "sales_last"
                                                                                )
                                                                            )}
                                                                            %
                                                                        </td>
                                                                    </tr>
                                                                    {expandedCat1 === subItem && (
                                                                        <tr>
                                                                            <td colSpan="4" className="py-4">
                                                                                <table className="w-full">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                                                Cat 3
                                                                                            </th>
                                                                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                                                Sales This
                                                                                            </th>
                                                                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                                                Sales Last
                                                                                            </th>
                                                                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                                                Sales Growth %
                                                                                            </th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody className="bg-gray-400">
                                                                                        {data
                                                                                            .filter(
                                                                                                (item) =>
                                                                                                    item["cat_1"] === subItem
                                                                                            )
                                                                                            .map((cat3Item, cat3Index) => (
                                                                                                <tr
                                                                                                    key={cat3Index}
                                                                                                    className="bg-gray-50"
                                                                                                >
                                                                                                    <td className="px-4 py-4 ">
                                                                                                        {cat3Item["cat_3"]}
                                                                                                    </td>
                                                                                                    <td className="px-4 py-4 ">
                                                                                                        {cat3Item["sales_this"]}
                                                                                                    </td>
                                                                                                    <td className="px-4 py-4 ">
                                                                                                        {cat3Item["sales_last"]}
                                                                                                    </td>
                                                                                                    <td className="px-4 py-4 ">
                                                                                                        {calculateGrowthPercentage(
                                                                                                            cat3Item["sales_this"],
                                                                                                            cat3Item["sales_last"]
                                                                                                        )}
                                                                                                        %
                                                                                                    </td>
                                                                                                </tr>
                                                                                            ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>)}
                            </React.Fragment>
            
                        ))}
                </tbody>
            </table>

        </>
    )
}
export default DataTables