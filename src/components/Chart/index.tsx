import React, { useRef, useEffect, useCallback, useState, memo } from 'react';
import { Chart as ChartCanvas, ChartData } from 'chart.js';
import { Container } from './styles';

export interface IChartProps {
  chartData?: ChartData;
  animation?: boolean;
}

const Chart: React.FC<IChartProps> = ({ chartData, animation }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<Chart>();

  const createChart = useCallback(current => {
    const ctx = current.getContext('2d');
    if (ctx) {
      const chartCreated = new ChartCanvas(ctx, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [],
        },
        options: {
          animation: {
            duration: animation ? 0 : 1000,
          },
          maintainAspectRatio: false,
          legend: {
            position: 'top',
            display: false,
          },
          scales: {
            xAxes: [
              {
                stacked: true,
              },
            ],
            yAxes: [
              {
                stacked: true,

                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
      setChart(chartCreated);
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      createChart(ref.current);
    }
  }, [createChart]);

  useEffect(() => {
    if (chart && chartData) {
      chart.data.labels = chartData.labels;
      chart.data.datasets = chartData.datasets;
      chart.update();
    }
  }, [chart, chartData]);

  return <Container ref={ref} />;
};

export default memo(Chart);
