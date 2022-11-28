import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import axios from 'axios'

const v3 = () => {

    const [tableData, setTableData] = useState(null)

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/v3");
            const response2 = await axios.get("http://localhost:3001/v4");



            setTableData({
                datasets: [
                    {
                        label: "Annual Havaji",
                        data: response.data.map(d => ({ time: new Date(d.Time_ga), value: d.anomaly_gm })),
                        borderColor: "black",
                        backgroundColor: "grey",

                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,
                        borderWidth: 0.9,

                    },
                    {
                        label: "Monthly Havaji",
                        data: response.data.map(d => ({ time: new Date(d.Time_gm), value: d.anomaly_gm })),
                        borderColor: "black",
                        backgroundColor: "grey",

                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,
                        borderWidth: 0.9,

                    },
                    
                    {
                        label: "Antarctic ice annualy",
                        data: response2.data.map(d => ({ time: new Date(d.Time_sm), value: d.anomaly_sm })),
                        borderColor: "red",
                        borderWidth: 1,
                        backgroundColor: "#FF6B6B",
                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,

                    },
                
                ],
            })

        } catch (error) {
            console.log("err")
        }
    }

    useEffect(() => {
        getData()
    }, [])


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "CO2 measurements",
            },
        },
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "month",
                },
            },
            yAxis: {
                type: "linear",
            },
        },
    };

    return (
        <div className='max-w-[1000px]'>{tableData && <Line options={options} data={tableData} />}</div>
    )
}

export default v3