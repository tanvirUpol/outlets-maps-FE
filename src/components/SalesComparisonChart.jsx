import React, { useRef, useState } from "react";
import Chart from "chart.js/auto";
import zoomPlugin from 'chartjs-plugin-zoom';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar, Doughnut, Pie, getElementAtEvent } from "react-chartjs-2";
Chart.register(zoomPlugin, ChartDataLabels);




const SalesComparisonChart = ({ data }) => {
    const [chartClick, setChartClick] = useState(0);
    const [labelVal, setLabelVal] = useState("Master Category");
    const chartRef = useRef();


    const options = {
        indexAxis: 'y',
        maintainAspectRatio: false, // Set to false to allow manual control of chart size
        // responsive: true, // Enable responsiveness
        layout:{
            padding: {
                right: 80,
            },
        },
        plugins: {
            legend: {
                position: "bottom",
                // align: "start"
                // display: false
            },
            title: {
                display: true,
                text: `${labelVal}`,
            },
            // zoom: {
            //     zoom: {
            //         wheel: {
            //             enabled: true,
            //         },
            //         pinch: {
            //             enabled: true
            //         },
            //         mode: 'xy',
            //     },

            //     pan: {
            //         enabled: true,
            //     }

            // },
            datalabels: {
                color: '#333',
                align: 'end',
                anchor: 'end',
                listeners: {
                    click: function (context, event) {
                        //   console.log('label ' + context.dataIndex + ' has been clicked!');
                        if (context) {
                            if (chartClick < 2) {
                                setChartClick(chartClick + 1)
                                setLabelVal(labels[context.dataIndex])
                            } else {
                                setChartClick(0)
                            }
                        }
                    }
                }
            }

        },
        scales: {
            x: {
                
                ticks: {
                    // autoSkip: false,
                    // maxRotation: 90,
                    // minRotation: 90,
                    
                    font: {
                        size: 12,
                    }
                },
            },
            y: {
                
                ticks: {
                    // autoSkip: false,
                    // anchor: 'center',
                    // maxRotation: 90,
                    // minRotation: 90,
                    // align: 'end',                  
                    font: {
                        size: 11,
                    }
                },
            },
        },
    };

    const sortDataByValue = (data) => {
        const dataArray = Object.entries(data).map(([label, value]) => ({ label, value }));
        dataArray.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
        return dataArray;
    };

    const calculateSalesByCategoryTop = (category) => {
        const categoryItems = data.filter(item => item.master_category === category);
        const totalSales = categoryItems.reduce((sum, item) => sum + item.sales_this, 0);
        return totalSales.toFixed(2);
    };

    const calculateSalesByCategoryMid = (category) => {
        const categoryItems = data.filter(item => item.cat_1 === category);
        const totalSales = categoryItems.reduce((sum, item) => sum + item.sales_this, 0);
        console.log(totalSales);
        return totalSales.toFixed(2);
    };

    const calculateSalesByCategoryLow = (category) => {
        const categoryItems = data.filter(item => item.cat_3 === category);
        const totalSales = categoryItems.reduce((sum, item) => sum + item.sales_this, 0);
        return totalSales.toFixed(2);
    };

    let result = {};
    let finalResult = {};

    const TopLayer = () => {

        const allMaster = [...new Set(data.map(item => item.master_category))];
        // console.log(allMaster);

        allMaster.forEach(category => {
            result[category] = calculateSalesByCategoryTop(category);
        });

        result = sortDataByValue(result);

    }

    const MidLayer = (indexVal) => {
        const selectedMasterCategory = indexVal
        // const selectedMasterCategory = "FRESH PRODUCE"

        // console.log(index);

        const customCat1 = [...new Set(data.filter(item => item.master_category === selectedMasterCategory).map(item => item.cat_1))];

        customCat1.forEach(category => {
            result[category] = calculateSalesByCategoryMid(category);
        });
        
        result = sortDataByValue(result);

    }

    const LowLayer = (indexVal) => {
        const selectedCat1Category = indexVal
        // const selectedMasterCategory = "FRESH PRODUCE"

        const customCat3 = [...new Set(data.filter(item => item.cat_1 === selectedCat1Category).map(item => item.cat_3))];

        customCat3.forEach(category => {
            result[category] = calculateSalesByCategoryLow(category);
        });

        result = sortDataByValue(result);

    }


    if (chartClick == 0) {
        console.log("top called");
        TopLayer()

    } else if (chartClick == 1) {
        console.log("Mid called");
        MidLayer(labelVal)
    } else if (chartClick == 2) {
        console.log("Low called");
        LowLayer(labelVal)
    }



    const labels = result.map(item => item.label);
    const dataValues = result.map(item => item.value);



    // const updatedData = data.map(item => ({
    //     ...item,
    //     cat_1_3: `${item.cat_1} - ${item.cat_3}`
    // }));

    // const categories = [...new Set(updatedData.map(item => item.cat_1_3))];



    // console.log(categories);
    // const salesData = categories.map(cat => {
    //     const sales = updatedData.filter(item => item.cat_1_3 === cat).map(item => item.sales_this);
    //     return {
    //         label: cat,
    //         data: sales[0],
    //     };
    // });


    // console.log(salesData);

    // const labels = salesData.map((entry) => entry.label);
    // const dataValues = salesData.map((entry) => entry.data);

    const data_chart = {
        labels,
        datasets: [
            {
                label: "Category Wise Data",
                data: dataValues,
                backgroundColor: [
                    '#ffd166',
                    '#ef476f',
                    '#06d6a0',
                    '#118ab2',
                    '#073b4c',
                    '#c1121f',
                    '#669bbc'
                ],
            },
        ],
    };


    const onClick = (event, element) => {
        const item = getElementAtEvent(chartRef.current, event)[0]
        if (item) {
            if (chartClick < 2) {
                console.log(item);
                setChartClick(chartClick + 1)
                setLabelVal(labels[item.index])
            } else {
                setChartClick(0)
                setLabelVal("Master Category")
            }
        }

    }

    return (
        <>
            <div className="chart-container" >
                <Bar id="chart" ref={chartRef} onClick={onClick} options={options} data={data_chart} />
            </div>

            {/* <Pie id="doughnut" ref={chartRef} onClick={onClick}   options={options} data={data_chart}  /> */}
        </>
    )
};
export default SalesComparisonChart;
