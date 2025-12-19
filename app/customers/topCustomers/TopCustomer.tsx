'use client'

import { UserTotalPoints } from "@/utils/actions"
import { toast } from "react-toastify"
import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";


export const options = {
    width: 400,
    height: 500,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
    bars: "vertical",
};

// Predefined colors for the chart bars
const chartColors = [
    "#3B82F6", "#06B6D4", "#8B5CF6", "#EC4899", "#F59E0B",
    "#10B981", "#6366F1", "#F43F5E", "#84CC16", "#14B8A6",
    "#A855F7", "#EF4444", "#22C55E", "#0EA5E9", "#D946EF",
    "#FBBF24", "#4ADE80", "#38BDF8", "#C084FC", "#FB7185",
    "#2DD4BF", "#818CF8", "#F97316", "#34D399", "#E879F9"
];

const TopCustomer = ({ customersTotalPoints, error }: { customersTotalPoints?: UserTotalPoints[], error?: string }) => {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (error && mounted) {
            toast.error(error)
        }
    }, [error, mounted]);

    if (!mounted) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return null;
    }

    const dataset = customersTotalPoints?.map((customer) => ({
        totalPoints: customer.totalPoints?.totalPoints,
        Name: customer.totalPoints?.firstName,
    })).sort((a, b) => b.totalPoints! - a.totalPoints!).slice(0, 25);

    // Use deterministic colors based on index
    const datasetArr = dataset?.map((customer, index) => [
        customer.Name,
        customer.totalPoints,
        chartColors[index % chartColors.length]
    ]);

    const data = [
        [
            "Customer",
            "Total Points",
            { role: "style" },
        ],
        ...(datasetArr || []),
    ]

    return (
        <div className="p-4">
            <Chart
                chartType="BarChart"
                width="100%"
                height="600px"
                data={data}
                options={options}
            />
        </div>
    )
}

export default TopCustomer

