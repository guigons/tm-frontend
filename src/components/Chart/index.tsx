import React, { useState, useEffect, memo } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

import { Container } from './styles';
import { IChartPreference } from '../../hooks/preferences';
import api from '../../services/api';
import Spinner from '../Spinner';

interface IChartProps {
  chartPreference: IChartPreference;
  width?: number;
  height?: number;
  maxGroupColumns?: number;
}

const Chart: React.FC<IChartProps> = ({
  chartPreference,
  width,
  height,
  maxGroupColumns,
}) => {
  const options: ChartOptions = {
    maintainAspectRatio: false,
    legend: {
      position: 'top',
      display: false,
    },
    scales: {
      xAxes: [
        {
          stacked: chartPreference.stacked,
        },
      ],
      yAxes: [
        {
          stacked: chartPreference.stacked,

          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadChartConfig(): Promise<void> {
      setLoading(true);
      try {
        const response = await api.get<ChartData>(`/charts`, {
          params: {
            template_id: chartPreference.template_id,
            chartPreference_id: chartPreference._id,
            maxGroupColumns,
          },
        });
        setChartData(oldChartData => {
          return {
            ...oldChartData,
            labels: response.data.labels,
            datasets: response.data.datasets,
          };
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadChartConfig();
  }, [chartPreference, maxGroupColumns]);

  return (
    <Container>
      {error ? (
        <h1>Error ao processar gráfico ...</h1>
      ) : loading ? (
        <Spinner />
      ) : chartPreference.type === 'line' ? (
        <Line
          data={chartData}
          width={width || 200}
          height={height || 100}
          options={options}
        />
      ) : (
        <Bar
          data={chartData}
          width={width || 4}
          height={height || 100}
          options={options}
        />
      )}
    </Container>
  );
};

export default memo(Chart);
