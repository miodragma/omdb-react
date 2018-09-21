import React from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Line, Bar, HorizontalBar } from 'react-chartjs-2';
import 'chartjs-plugin-style';

import thousandsSeparator from '../../utils/functions/thousandsSeparator';

const chart = (props) => {

    const dataset = props.movies.map(item => {
        const color = props.statsColors.find(itemStats => itemStats.title === item.Title).color;
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
            bevelWidth: 3,
            bevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
            bevelShadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: 'rgba(255, 255, 255, 0.5)',
            data: [item[`${props.type}`] === 'N/A' ? 0 :
                props.type === 'BoxOffice' && item[`${props.type}`] !== undefined ?
                    +item[`${props.type}`].match(/\d+/g).join('') :
                    props.type === 'Ratings' && item[`${props.type}`] !== undefined && item[`${props.type}`].length > 1 ?
                        +item[`${props.type}`][1]['Value'].match(/\d+/g).join('') :
                        props.type === 'Metascore' && item[`${props.type}`] !== undefined ?
                            parseFloat(item[`${props.type}`].replace(/,/g, '')) :
                            props.type === 'imdbRating' && item[`${props.type}`] !==undefined ?
                                parseFloat(item[`${props.type}`].replace(/,/g, '')) :
                                props.type === 'imdbVotes' && item[`${props.type}`] !== undefined ?
                                    parseFloat(item[`${props.type}`].replace(/,/g, '')) :
                                    props.type === 'Runtime' && item[`${props.type}`] !== undefined ?
                                        parseFloat(item[`${props.type}`].replace(/,/g, '')) : 0]
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
                                return n + `${props.type === 'Ratings' ? '%' : ''}` + `${props.from > 0 || props.from === 'min' ? ' / ' + props.from : ''}`;
                            }

                            return formatNumber(value);
                        }
                    },
                    gridLines: {color: "#ececec"}
                }],
                xAxes: [{
                    barPercentage: 0.5,
                    categoryPercentage: 0.5,
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
                                return n + `${props.from > 0 || props.from === 'min' ? ' / ' + props.from : ''}`;
                            }

                            return formatNumber(value);
                        }
                    },
                    gridLines: {color: "#ececec"}
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
                bevelWidth: 3,
                bevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
                bevelShadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
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
        if (props.chartType === 'line') {
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

const mapStateToProps = state => {
    return {
        statsColors: state.stats.colors
    }
};

export default connect(mapStateToProps)(chart);