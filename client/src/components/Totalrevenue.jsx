import React from 'react';
import ReactApexChart from 'react-apexcharts';

const TotalRevenueChart = () => {
  const TotalRevenueSeries = [
    {
      name: "Last Month",
      data: [183, 124, 115, 85, 143, 143, 96],
    },
    {
      name: "Running Month",
      data: [95, 84, 72, 44, 108, 108, 47],
    },
  ];

  const TotalRevenueOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: ["#475BE8", "#CFC8FF"],
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    stroke: {
      colors: ["transparent"],
      width: 4,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    tooltip: {
      y: {
        formatter(val) {
          return `$ ${val} thousands`;
        },
      },
    },
  };

  return (
    <div className="chart-container flex flex-col bg-slate-100 rounded-2xl p-3 m-2">
      <p className='font-semibold text-2xl'>Total Revenue</p>
      <p className='font-mono text-4xl mt-4 '>$236282</p>
      <ReactApexChart
        options={TotalRevenueOptions}
        series={TotalRevenueSeries}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default TotalRevenueChart;
