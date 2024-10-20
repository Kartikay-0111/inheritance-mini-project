import React from 'react'
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";
const PieChart = (props) => {
    return (
        <div className=' text-white flex flex-row gap-2 justify-between bg-slate-600 w-64 rounded-lg'>
            <div className='m-3'>
                <p>{props.title}</p>
                <p className='text-2xl'>{props.value}</p>
            </div>
            <div className=' self-center'>
                <ReactApexChart
                    options={{
                        chart: { type: 'donut' },
                        colors: props.colours,
                        legend: { show: false },
                        dataLabels: { enabled: false }
                    }}
                    series={props.series}
                    type="donut"
                    width="90px"
                />
            </div>
        </div>
    )
}
export default PieChart