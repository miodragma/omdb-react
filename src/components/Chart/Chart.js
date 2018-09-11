import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Line, Bar, HorizontalBar } from 'react-chartjs-2';

import thousandsSeparator from '../../utils/functions/thousandsSeparator';

const chart = (props) => {

    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r},${g},${b}, `;
    };

    const dataset = props.movies.map(item => {
        const color = getRandomColor();
        console.log(item[`${props.type}`][1]['Value']);
        return {
            label: item.Title,
            backgroundColor: `${color} 1)`,
            borderDisableColor: `${color} 0.5)`,
            borderColor: `${color} 1)`,
            pointBackgroundColor: `${color} 1)`,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: `${color} 0.8)`,
            borderWidth: 1,
            data: [item[`${props.type}`] === 'N/A' ?
                0 : props.type === 'BoxOffice' ? +item[`${props.type}`].match(/\d+/g).join('')
                : props.type === 'Ratings' ? +item[`${props.type}`][1]['Value'].match(/\d+/g).join('') : parseFloat(item[`${props.type}`].replace(/,/g, ''))]
        }
    });

    const data = {
        datasets: dataset
    };

    const options = () => {
        return {
            responsive: true,
            title: {
                display: true,
                text: props.title,
                fontSize: 16,
                fontColor: '#ececec',
                lineHeight: 1.5
            },
            animation:
                {
                    duration: 100,
                    easing: 'linear'
                },
            hover: {
                animationDuration: 0
            },
            scales: {
                yAxes: [{
                    barPercentage: 0.5,
                    scaleLabel: {
                        display: true,
                        labelString: props.title,
                        fontColor: '#ececec',
                        fontSize: 15,
                        lineHeight: 3.5
                    },
                    ticks: {
                        max: props.max > 0 ? props.max : undefined,
                        stepSize: props.step > 0 ? props.step : undefined,
                        fontColor: '#ececec',
                        beginAtZero: true,
                        callback: function (value) {
                            const ranges = [
                                {divider: 1e6, suffix: 'M'},
                                {divider: 1e3, suffix: 'k'}
                            ];

                            function formatNumber(n) {
                                for (let i = 0; i < ranges.length; i++) {
                                    if (n >= ranges[i].divider) {
                                        return (n / ranges[i].divider).toString() + ranges[i].suffix;
                                    }
                                }
                                return n + `${props.type === 'Ratings' ? '%' : ''}` +  `${props.from > 0 || props.from === 'min' ? ' / ' + props.from : ''}`;
                            }

                            return formatNumber(value);
                        }
                    },
                    gridLines: { color: "#ececec" }
                }],
                xAxes: [{
                    barPercentage: 0.5,
                    // scaleLabel: {
                    //     display: true,
                    //     // labelString: props.title,
                    //     // fontColor: '#ececec',
                    //     // fontSize: 15,
                    //     // lineHeight: 3.5
                    // },
                    ticks: {
                        max: props.max > 0 ? props.max : undefined,
                        stepSize: props.step > 0 ? props.step : undefined,
                        fontColor: '#ececec',
                        beginAtZero: true,
                        callback: function (value) {
                            const ranges = [
                                {divider: 1e6, suffix: 'M'},
                                {divider: 1e3, suffix: 'k'}
                            ];

                            function formatNumber(n) {
                                for (let i = 0; i < ranges.length; i++) {
                                    if (n >= ranges[i].divider) {
                                        return (n / ranges[i].divider).toString() + ranges[i].suffix;
                                    }
                                }
                                return n +  `${props.from > 0 || props.from === 'min' ? ' / ' + props.from : ''}`;
                            }

                            return formatNumber(value);
                        }
                    },
                    gridLines: { color: "#ececec" }
                }],
            },
            legend: {
                position: 'bottom',
                labels: {
                    // generateLabels: this.generateLabels,
                    usePointStyle: true,
                    boxWidth: 20,
                    fontSize: 14,
                    fontColor: '#ececec',
                    padding: 30
                }
            },
            tooltips: {
                titleMarginBottom: 10,
                bodySpacing: 6,
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += `${props.from === 'min' ? tooltipItem.xLabel : thousandsSeparator(tooltipItem.yLabel)}` + props.toTooltip;
                        return label;
                    }
                }
            },
            maintainAspectRatio: false
        };
    };

    let chart = null;

    if (props.movies.length) {
        if (props.chartType === 'bar') {
            chart = <Bar data={data} options={options()}/>
        }
        if (props.chartType === 'line'){
            chart = <Line data={data} options={options()}/>
        }
        if (props.chartType === 'horizontalBar') {
            chart = <HorizontalBar data={data} options={options()}/>
        }
    }

    return (
        <Aux>
            {chart}
        </Aux>
    );

};

export default chart;