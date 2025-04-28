import React, { useState } from 'react'
import Chart from 'react-apexcharts'


const GraficaLineaHome = ({ data }) => {
    const [options, setOptions] = useState({
        chart: {
            type: 'bar',
            height: 350
        }, plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        }, stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            decimalsInFloat: undefined,
        },
        fill: {
            opacity: 0.8
        },
    })


    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="card-header">
                    <h5 className="card-title">Reporte de recolección mensual del año actual</h5>
                </div>
                <div id="chart" className="apexcharts-content">
                    <Chart options={options} series={data} type="bar" height={335} />
                </div>
            </div>
        </div>
    );
}

export default GraficaLineaHome;