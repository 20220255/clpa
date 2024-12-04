'use client'

import { UserTotalPoints } from "@/utils/actions"
import { toast } from "react-toastify"
import React from "react";
import { Chart } from "react-google-charts";


export const options = {
    // title: "Top 25 Customers",
    width: 400,
    height: 500,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
    bars: "vertical", // Required for Material Bar Charts.
};



const TopCustomer = ({ customersTotalPoints, error }: { customersTotalPoints?: UserTotalPoints[], error?: string }) => {

    if (error) {
        toast.error(error)
        return null
    }

    const dataset = customersTotalPoints?.map((customer) => ({
        totalPoints: customer.totalPoints?.totalPoints,
        Name: customer.totalPoints?.firstName,
    })).sort((a, b) => b.totalPoints! - a.totalPoints!).slice(0, 25);
    const randomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);
    const datasetArr = dataset?.map((customer) => [customer.Name, customer.totalPoints, randomColor()]);
    const data = [
        [
            "Customer",
            "Total Points",
            { role: "style" },
        ],
        ...(datasetArr || []),
    ]

    return (
        <Chart
            chartType="BarChart"
            width="100%"
            height="100px"
            data={data}
            options={options}
        />
    )
}

export default TopCustomer
