import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';




const ChartThree= ({results}) => {

  const [state, setState] = useState<any>({
    series: [0,0,0],
  });
  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    colors: ['#10B981', '#375E83', '#259AE6'],
    labels: [
      'Qté bonne <div class="chartLegend">'+state.series[0]+'</div>', 
      'Qté DNR <div class="chartLegend">'+state.series[1]+'</div>',  
      'Qté mauvaise <div class="chartLegend">'+state.series[2]+'</div>',
    ], 
    legend: {
      show: true,
      position: 'bottom',
    },
  
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  useEffect(() => {
    setState({series:[results?.PASS,results?.DNR,results?.FAIL ]})
  }, [results]);
  
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            
            
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

     
    </div>
  );
};

export default ChartThree;
