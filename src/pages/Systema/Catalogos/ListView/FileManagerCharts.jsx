import React from 'react';
import ReactApexChart from "react-apexcharts";

const getChartColorsArray = (colors) => {
    colors = JSON.parse(colors);
    return colors.map(function (value) {
        var newValue = value.replace(" ", "");
        if (newValue.indexOf(",") === -1) {
            var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);

            if (color.indexOf("#") !== -1)
                color = color.replace(" ", "");
            if (color) return color;
            else return newValue;
        } else {
            var val = value.split(',');
            if (val.length === 2) {
                var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                return rgbaColor;
            } else {
                return newValue;
            }
        }
    });
};

const SimpleDonutCharts = ({ dataColors }) => {
    var chartDonutBasicColors = getChartColorsArray(dataColors);
    const series = [27.01, 20.87, 33.54, 37.58]
    var options = {
        chart: {
            height: 330,
            type: 'donut',
        },
        labels: ["Documents", "Media", "Others", "Free Space"],
        dataLabels: {
            dropShadow: {
                enabled: false,
              }
        },
        legend: {
            position: 'bottom'
        },
        colors: chartDonutBasicColors
    };
    return (
        <ReactApexChart dir="ltr"
            series={series}
            options={options}
            type="donut"
            height={330}
            className="apex-charts mt-3"
        />

    )
}

export default SimpleDonutCharts;
