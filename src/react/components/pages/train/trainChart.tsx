// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React from "react";
import Chart from "chart.js";
import { ITag } from "../../../../models/applicationState";

export interface ITrainChartProps {
    modelId: string;
    projectTags: ITag[];
}

export interface ITrainChartState {}

// Use PureComponent instead of Component to avoid re-rendering if Props are same
export default class TrainChart
    extends React.PureComponent<ITrainChartProps, ITrainChartState> {

    private chartRef: React.RefObject<HTMLCanvasElement> = React.createRef();
    private chart;

    public render() {
        return (
            <div className="train-chart-container">
            <canvas ref={this.chartRef} id="chart-canvas" className="train-chart"></canvas>
            </div>
        );
    }

    public componentDidMount = (): void => {
        this.chart = this.newChart();
    }

    public componentDidUpdate = (): void => {
        this.chart = this.newChart();
    }

    private newChart = (): Chart => {
        return new Chart(this.chartRef.current, {
            type: "horizontalBar",
            options: this.chartOptions(),
        });
    }

    private chartOptions = (): object => {
        return {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Accuracy (%)",
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                }],
                yAxes: [{
                    barThickness: 6,
                }],
            },
            animation: {
                easing: "easeInOutCubic",
            },
            layout: {
                padding: 20,
            },
        };
    }

    private toPercent(num: number): string {
        return (num * 100).toFixed(2);
    }
}
