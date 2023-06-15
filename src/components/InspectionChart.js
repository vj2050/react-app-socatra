import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { PieController, ArcElement, Tooltip } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip);

const InspectionChart = ({ filteredResults }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [inspectionData, setInspectionData] = useState([]);

  useEffect(() => {
    if (filteredResults) {
      const inspectionData = computeInspectionData(filteredResults);
      setInspectionData(inspectionData);
    }
  }, [filteredResults]);

  useEffect(() => {
    if (chartRef.current && inspectionData.length > 0) {
      if (chartInstance) {
        chartInstance.destroy();
      }
      const ctx = chartRef.current.getContext('2d');
      setChartInstance(
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: inspectionData.map(data => data.inspection_result),
            datasets: [
              {
                data: inspectionData.map(data => data.count),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        })
      );
    } else if (chartInstance) {
      chartInstance.destroy();
    }
  }, [inspectionData]);

  const computeInspectionData = filteredResults => {
    const inspectionDataMap = new Map();

    filteredResults.forEach(result => {
      const inspectionResult = result.inspection_result;
      if (inspectionDataMap.has(inspectionResult)) {
        const count = inspectionDataMap.get(inspectionResult);
        inspectionDataMap.set(inspectionResult, count + 1);
      } else {
        inspectionDataMap.set(inspectionResult, 1);
      }
    });

    const inspectionData = Array.from(inspectionDataMap).map(([inspection_result, count]) => ({
      inspection_result,
      count,
    }));

    return inspectionData;
  };

  if (filteredResults && filteredResults.length === 0) {
    return null; // Return null if there are no filtered results
  }

  return <canvas id="inspectionChart" ref={chartRef} />;
};

export default InspectionChart;
