import React, { useRef, useCallback, useEffect, memo, useState } from 'react';
import { ChartData } from 'chart.js';

import { MdFullscreen, MdDelete, MdFullscreenExit } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { format } from 'date-fns';
import { Container, ModalRemoveChartPreference, ModalChart } from './styles';
import {
  IChartPreference,
  usePreferences,
} from '../../../../hooks/preferences';
import Spinner from '../../../../components/Spinner';
import Button from '../../../../components/Button';
import { useFetch } from '../../../../hooks/fetch';
import Chart from '../../../../components/Chart';
import Modal, { IModalHandles } from '../../../../components/Modal';
import FormChartPreference from '../../forms/FormChartPreference';
import { ITemplate } from '../..';

type IChartDashboardProps = {
  chartPreference: IChartPreference;
  templates: ITemplate[];
  maxGroupColumns?: number;
  width: number;
  height: number;
};

const ChartDashboard: React.FC<IChartDashboardProps> = ({
  chartPreference,
  templates,
}) => {
  const modalEditChartRef = useRef<IModalHandles>();
  const modalRemoveChartRef = useRef<IModalHandles>();
  const modalChartRef = useRef<IModalHandles>();
  const { preferences, updateChartsPreference } = usePreferences();
  const [animation, setAnimation] = useState(true);

  const { data: chartData, revalidate, isValidating } = useFetch<ChartData>(
    `/charts?template_id=${chartPreference.template_id}&chartPreference_id=${chartPreference._id}`,
    { revalidateOnFocus: true, revalidateOnMount: false },
  );

  useEffect(() => {
    revalidate();
  }, [chartPreference, revalidate]);

  const handleRemovePreferenceChart = useCallback(() => {
    updateChartsPreference(
      preferences.charts.filter(c => c._id !== chartPreference._id),
    );
    modalRemoveChartRef.current?.close();
  }, [chartPreference._id, preferences.charts, updateChartsPreference]);

  const handleGroupByLabel = useCallback(() => {
    if (!chartPreference.groupBy || chartPreference.groupBy === 'nao_agrupar')
      return '';
    if (chartPreference.groupBy.includes('.')) {
      return `Por ${chartPreference.groupBy.split('.').join(' ')}`;
    }
    return `Por ${chartPreference.groupBy}`;
  }, [chartPreference.groupBy]);

  const handlePeriodLabel = useCallback(() => {
    if (!chartPreference.period) return '';
    if (chartPreference.period === 'specific') {
      const start_label = format(new Date(chartPreference.start), 'dd/MMM');
      const end_label = format(new Date(chartPreference.end), 'dd/MMM');
      return `${start_label} - ${end_label}`;
    }

    if (chartPreference.period === 'last_days') {
      return `${
        chartPreference.amount && chartPreference.amount > 1
          ? `Últimos ${chartPreference.amount} dias`
          : 'Último dia'
      }`;
    }
    if (chartPreference.period === 'last_weeks') {
      return `${
        chartPreference.amount && chartPreference.amount > 1
          ? `Últimas ${chartPreference.amount} semanas`
          : 'Última semana'
      }`;
    }
    if (chartPreference.period === 'last_months') {
      return `${
        chartPreference.amount && chartPreference.amount > 1
          ? `Últimos ${chartPreference.amount} meses`
          : 'Último mês'
      }`;
    }
    return '';
  }, [
    chartPreference.amount,
    chartPreference.end,
    chartPreference.period,
    chartPreference.start,
  ]);

  const handleChartFullScreen = useCallback(() => {
    modalChartRef.current?.open();
  }, []);

  const handleSubmitEdit = useCallback(
    async (newChartPreference: IChartPreference) => {
      const newChartPreferences = preferences.charts.map(pc => {
        if (pc._id === chartPreference._id) {
          return newChartPreference;
        }
        return pc;
      });

      updateChartsPreference(newChartPreferences);
      modalEditChartRef.current?.close();
    },
    [chartPreference._id, preferences.charts, updateChartsPreference],
  );

  if (!chartData) {
    return (
      <Container>
        <h1>{chartPreference.name}</h1>
        <span>{handleGroupByLabel()}</span>
        <div className="Period">
          <h1>{handlePeriodLabel()}</h1>{' '}
        </div>
        <Spinner />
      </Container>
    );
  }

  return (
    <>
      <Container>
        <h1>{chartPreference.name}</h1>
        <span>{handleGroupByLabel()}</span>
        <div className="Period">
          <h1>{handlePeriodLabel()}</h1>{' '}
          <span>{isValidating && <Spinner size={16} />}</span>
        </div>
        <div className="Icons">
          <MdFullscreen size={20} onClick={handleChartFullScreen} />
          <MdDelete
            size={18}
            onClick={() => modalRemoveChartRef.current?.open()}
          />
          <FiSettings
            size={14}
            onClick={() => modalEditChartRef.current?.open()}
          />
        </div>
        <div className="Chart">
          <Chart chartData={chartData} animation={animation} />
        </div>
      </Container>
      <Modal ref={modalEditChartRef}>
        <FormChartPreference
          onSubmit={handleSubmitEdit}
          initialData={chartPreference}
          templates={templates}
        />
      </Modal>
      <Modal ref={modalRemoveChartRef} size="sm">
        <ModalRemoveChartPreference>
          <h4>Tem certeza que deseja remover o gráfico selecionado?</h4>
          <div className="Buttons">
            <Button onClick={() => modalRemoveChartRef.current?.close()}>
              Não
            </Button>
            <Button onClick={handleRemovePreferenceChart}>Sim</Button>
          </div>
        </ModalRemoveChartPreference>
      </Modal>
      <Modal ref={modalChartRef} size="fs" removeCloseButton>
        <ModalChart>
          <h1>{chartPreference.name}</h1>
          <span>{handleGroupByLabel()}</span>
          <div className="Period">
            <h1>{handlePeriodLabel()}</h1>{' '}
            <span>{isValidating && <Spinner size={16} />}</span>
          </div>
          <div className="Icons">
            <MdFullscreenExit
              size={20}
              onClick={() => modalChartRef.current?.close()}
            />
            <FiSettings
              size={14}
              onClick={() => modalEditChartRef.current?.open()}
            />
          </div>
          <div className="Chart">
            <Chart chartData={chartData} />
          </div>
        </ModalChart>
      </Modal>
    </>
  );
};

export default memo(ChartDashboard);
