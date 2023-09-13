import React, { useState } from "react";

import plus from "/assets/plus.svg"
import minus from "/assets/minus.svg"

const DataTable = ({ masterCategoryData, cat1Data, data, selectedMetric, growth }) => {

  const [expandedMaster, setExpandedMaster] = useState("");
  const [expandedCat1, setExpandedCat1] = useState("");


  const toggleMaster = (masterCategory) => {
    if (expandedMaster === masterCategory) {
      setExpandedMaster("");
    } else {
      setExpandedMaster(masterCategory);
    }
  };

  // console.log(expandedMaster);

  const toggleCat1 = (cat1Value) => {
    if (expandedCat1 === cat1Value) {
      setExpandedCat1("");
    } else {
      setExpandedCat1(cat1Value);
    }
  };

  const calculateGrowthPercentage = (currentValue, lastValue) => {
    if (lastValue !== 0) {
      const growthPercentage = ((currentValue - lastValue) / lastValue) * 100;
      return growthPercentage.toFixed(2);
    }
    return 0;
  };


  const numFor = Intl.NumberFormat("en-US");

  return (
    <table className=" mt-4 mb-16 min-w-full shadow-sm">
      <thead>
        <tr className="bg-teal-700 text-left">
          <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
            Master Category
          </th>
          <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
            {selectedMetric} This
          </th>
          <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
            {selectedMetric} Last
          </th>
          <th className="p-3 text-left text-xs font-medium uppercase tracking-wider text-white">
            {selectedMetric} Growth %
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {masterCategoryData.map((item, index) => (
          <React.Fragment key={index}>
            {growth == "growth" && calculateGrowthPercentage(
              item[selectedMetric + "_this"],
              item[selectedMetric + "_last"]
            ) >= 0 && item.master_category !=="44-HOME DELIVERY" && item.master_category !=="Undf# 2" && (
                <>
                  <tr
                    onClick={() => toggleMaster(item.master_category)}
                    className="cursor-pointer text-xs transition-colors hover:bg-teal-100 sm:text-base"
                  >
                    <td className="p-3 flex items-center">
                      <button
                        onClick={() => toggleMaster(item.master_category)}
                        className="mr-2 focus:outline-none font-medium text-base"
                      >
                        {expandedMaster === item.master_category ? <img className="w-6 h-6 max-w-none" src={minus} /> : <img className="w-6 h-6 max-w-none" src={plus} />}
                      </button>
                      <span>
                        {item.master_category}
                      </span>
                    </td>
                    <td className="p-3">
                      {item[selectedMetric + "_this"].toFixed(2)}
                    </td>
                    <td className="p-3">
                      {item[selectedMetric + "_last"].toFixed(2)}
                    </td>
                    <td className="p-3 text-green-600 font-medium">
                      {calculateGrowthPercentage(
                        item[selectedMetric + "_this"],
                        item[selectedMetric + "_last"]
                      )}
                    </td>
                  </tr>
                  <tr>
                    {expandedMaster === item.master_category && (
                      <td colSpan="4" className="py-4">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-emerald-500">
                              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                CAT 1
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                {selectedMetric} This
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                {selectedMetric} Last
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                {selectedMetric} Growth %
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {cat1Data.map((item, index) => (
                              <React.Fragment key={index}>
                                {item.master_category === expandedMaster && (
                                  <>
                                    <tr
                                      onClick={() => toggleCat1(item.cat_1)}
                                      className="cursor-pointer text-xs transition-colors bg-emerald-50 hover:bg-green-100 sm:text-base"
                                    >
                                      <td className="p-3 flex items-center">
                                        <button
                                          onClick={() => toggleCat1(item.cat_1)}
                                          className="mr-2 focus:outline-none font-medium text-base"
                                        >
                                          {expandedCat1 === item.cat_1 ? <img className="w-6 h-6 max-w-none" src={minus} /> : <img className="w-6 h-6 max-w-none" src={plus} />}
                                        </button>
                                        <span>
                                          {item.cat_1}
                                        </span>
                                      </td>
                                      <td className="p-3">
                                        {item[selectedMetric + "_this"].toFixed(
                                          2
                                        )}
                                      </td>
                                      <td className="p-3">
                                        {item[selectedMetric + "_last"].toFixed(
                                          2
                                        )}
                                      </td>
                                      <td className={`p-3  ${item[selectedMetric + "_this"] <
                                        item[selectedMetric + "_last"] ? "text-rose-500" : "text-green-600"} font-medium`}>
                                        {calculateGrowthPercentage(
                                          item[selectedMetric + "_this"],
                                          item[selectedMetric + "_last"]
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      {expandedCat1 === item.cat_1 && (
                                        <td colSpan="4" className="py-4">
                                          <table className="w-full shadow">
                                            <thead>
                                              <tr className="bg-rose-500">
                                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                                  CAT 3
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                                  {selectedMetric} This
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                                  {selectedMetric} Last
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                                  {selectedMetric} Growth %
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                                  Format {selectedMetric} GR %
                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {data.map((item, index) => (
                                                <React.Fragment key={index}>
                                                  {item.master_category ===
                                                    expandedMaster && (
                                                      <tr className="cursor-pointer text-xs transition-colors bg-rose-50 hover:bg-rose-100 sm:text-base">
                                                        <td className="p-3">
                                                          {item.cat_3}
                                                        </td>
                                                        <td className="p-3">
                                                          {item[
                                                            selectedMetric + "_this"
                                                          ].toFixed(2)}
                                                        </td>
                                                        <td className="p-3">
                                                          {item[
                                                            selectedMetric + "_last"
                                                          ].toFixed(2)}
                                                        </td>
                                                        <td className={`p-3  ${item[selectedMetric + "_this"] <
                                                          item[selectedMetric + "_last"] ? "text-rose-500" : "text-green-600"} font-medium`}>
                                                          {calculateGrowthPercentage(
                                                            item[
                                                            selectedMetric +
                                                            "_this"
                                                            ],
                                                            item[
                                                            selectedMetric +
                                                            "_last"
                                                            ]
                                                          )}
                                                        </td>
                                                        <td className={`p-3  ${item["format_"+ selectedMetric + "_gr"] <
                                                          0? "text-rose-500" : "text-green-600"} font-medium`}>
                                                          {item[
                                                            "format_"+ selectedMetric + "_gr"
                                                          ].toFixed(2)}
                                                        </td>
                                                      </tr>
                                                    )}
                                                </React.Fragment>
                                              ))}
                                            </tbody>
                                          </table>
                                        </td>
                                      )}
                                    </tr>
                                  </>
                                )}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    )}
                  </tr>
                </>
              )}


            {growth == "degrowth" && calculateGrowthPercentage(
              item[selectedMetric + "_this"],
              item[selectedMetric + "_last"]
            ) < 0 &&  item.master_category !=="44-HOME DELIVERY" && item.master_category !=="Undf# 2" && (
                <>
                  <tr
                    onClick={() => toggleMaster(item.master_category)}
                    className="cursor-pointer text-xs transition-colors hover:bg-teal-100 sm:text-base"
                  >
                    <td className="p-3 flex items-center">
                      <button
                        onClick={() => toggleMaster(item.master_category)}
                        className="mr-2 focus:outline-none font-medium text-base"
                      >
                        {expandedMaster === item.master_category ? <img className="w-6 h-6 max-w-none" src={minus} /> : <img className="w-6 h-6 max-w-none" src={plus} />}
                      </button>
                      <span>
                        {item.master_category}
                      </span>
                    </td>
                    <td className="p-3">
                      {item[selectedMetric + "_this"].toFixed(2)}
                    </td>
                    <td className="p-3">
                      {item[selectedMetric + "_last"].toFixed(2)}
                    </td>
                    <td className="p-3 text-rose-600 font-medium">
                      {calculateGrowthPercentage(
                        item[selectedMetric + "_this"],
                        item[selectedMetric + "_last"]
                      )}
                    </td>
                  </tr>
                  <tr>
                    {expandedMaster === item.master_category && (
                      <td colSpan="4" className="py-4">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-emerald-500">
                              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                CAT 1
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                {selectedMetric} This
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                {selectedMetric} Last
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                {selectedMetric} Growth%
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {cat1Data.map((item, index) => (
                              <React.Fragment key={index}>
                                {item.master_category === expandedMaster && (
                                  <>
                                    <tr
                                      onClick={() => toggleCat1(item.cat_1)}
                                      className="cursor-pointer text-xs transition-colors bg-emerald-50 hover:bg-green-100 sm:text-base"
                                    >
                                      <td className="p-3 flex items-center">
                                        <button
                                          onClick={() => toggleCat1(item.cat_1)}
                                          className="mr-2 focus:outline-none font-medium text-base"
                                        >
                                          {expandedCat1 === item.cat_1 ? <img className="w-6 h-6 max-w-none" src={minus} /> : <img className="w-6 h-6 max-w-none" src={plus} />}
                                        </button>
                                        <span>
                                          {item.cat_1}
                                        </span>
                                      </td>
                                      <td className="p-3">
                                        {item[selectedMetric + "_this"].toFixed(
                                          2
                                        )}
                                      </td>
                                      <td className="p-3">
                                        {item[selectedMetric + "_last"].toFixed(
                                          2
                                        )}
                                      </td>
                                      <td className={`p-3  ${item[selectedMetric + "_this"] <
                                        item[selectedMetric + "_last"] ? "text-rose-500" : "text-green-600"} font-medium`}>
                                        {calculateGrowthPercentage(
                                          item[selectedMetric + "_this"],
                                          item[selectedMetric + "_last"]
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      {expandedCat1 === item.cat_1 && (
                                        <td colSpan="4" className="py-4">
                                          <table className="w-full shadow">
                                            <thead>
                                              <tr className="bg-rose-500">
                                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                                  CAT 3
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                                  {selectedMetric} This
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                                  {selectedMetric} Last
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                                  {selectedMetric} Growth%
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                                  Format {selectedMetric} GR%
                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {data.map((item, index) => (
                                                <React.Fragment key={index}>
                                                  {item.master_category ===
                                                    expandedMaster && (
                                                      <tr className="cursor-pointer text-xs transition-colors bg-rose-50 hover:bg-rose-100 sm:text-base">
                                                        <td className="p-3">
                                                          {item.cat_3}
                                                        </td>
                                                        <td className="p-3">
                                                          {item[
                                                            selectedMetric + "_this"
                                                          ].toFixed(2)}
                                                        </td>
                                                        <td className="p-3">
                                                          {item[
                                                            selectedMetric + "_last"
                                                          ].toFixed(2)}
                                                        </td>
                                                        <td className={`p-3  ${item[selectedMetric + "_this"] <
                                                          item[selectedMetric + "_last"] ? "text-rose-500" : "text-green-600"} font-medium`}>
                                                          {calculateGrowthPercentage(
                                                            item[
                                                            selectedMetric +
                                                            "_this"
                                                            ],
                                                            item[
                                                            selectedMetric +
                                                            "_last"
                                                            ]
                                                          )}
                                                        </td>
                                                        <td className={`p-3  ${item["format_"+ selectedMetric + "_gr"] <
                                                          0? "text-rose-500" : "text-green-600"} font-medium`}>
                                                          {item[
                                                            "format_"+ selectedMetric + "_gr"
                                                          ].toFixed(2)}
                                                        </td>
                                                      </tr>
                                                    )}
                                                </React.Fragment>
                                              ))}
                                            </tbody>
                                          </table>
                                        </td>
                                      )}
                                    </tr>
                                  </>
                                )}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    )}
                  </tr>
                </>
              )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}
export default DataTable