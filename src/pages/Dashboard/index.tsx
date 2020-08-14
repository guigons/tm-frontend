import React, { useRef, useCallback, useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import { subDays } from 'date-fns';
import {
  Container,
  Header,
  Main,
  ListChartPreferences,
  NewChartPreference,
} from './styles';
import Modal, { IModalHandles } from '../../components/Modal';
import ChartDashboard from './components/ChartDashboard';
import { usePreferences, IChartPreference } from '../../hooks/preferences';
import FormChartPreference from './forms/FormChartPreference';
import api from '../../services/api';

export interface ITemplatesFilterCondition {
  key: string;
  value: string;
}

export interface ITemplatesFilter {
  conditions: ITemplatesFilterCondition[];
}

export interface ITemplate {
  _id: string;
  name: string;
  global: boolean;
  target: string;
  filters: ITemplatesFilter[];
  grouping: string[];
}

const Dashboard: React.FC = () => {
  const modalMeusTemplatesRef = useRef<IModalHandles>();
  const modalNewChartRef = useRef<IModalHandles>();
  const { preferences, updateChartsPreference } = usePreferences();
  const [templates, setTemplates] = useState<ITemplate[]>([]);

  const handleSubmitAdd = useCallback(
    async (newChartPreference: IChartPreference) => {
      const now = new Date();
      updateChartsPreference([
        ...preferences.charts,
        {
          _id: '',
          template_id: newChartPreference.template_id,
          name: newChartPreference.name,
          type: 'bar',
          start: subDays(now, 30),
          end: now,
          period: newChartPreference.period,
          amount: newChartPreference.amount,
          horizontal: newChartPreference.horizontal,
          stacked: true,
          groupBy: newChartPreference.groupBy,
        },
      ]);
      modalNewChartRef.current?.close();
    },
    [preferences.charts, updateChartsPreference],
  );

  useEffect(() => {
    async function loadTemplates(): Promise<void> {
      const response = await api.get<ITemplate[]>('/templates');
      setTemplates(response.data);
    }
    loadTemplates();
  }, []);

  return (
    <>
      <Container>
        <Header>
          <h1>Meus Gráficos</h1>
          <button
            type="button"
            onClick={() => modalMeusTemplatesRef.current?.open()}
          >
            {/* <FiSettings size={18} /> */}
          </button>
        </Header>
        <Main>
          <ListChartPreferences>
            {preferences.charts.map(chartPreference => (
              <ChartDashboard
                key={chartPreference._id}
                chartPreference={chartPreference}
                templates={templates}
                height={100}
                width={550}
              />
            ))}
            <NewChartPreference
              onClick={() => modalNewChartRef.current?.open()}
            >
              <FiPlus size={72} />
            </NewChartPreference>
          </ListChartPreferences>
        </Main>
      </Container>
      <Modal ref={modalMeusTemplatesRef}>Meus Templates</Modal>
      <Modal ref={modalNewChartRef}>
        <FormChartPreference
          onSubmit={handleSubmitAdd}
          templates={templates}
          initialData={{
            _id: '',
            name: '',
            groupBy: 'nao_agrupar',
            amount: 7,
            horizontal: 'date',
            period: 'last_days',
            template_id: 'TPs',
            start: new Date(),
            end: new Date(),
            type: '',
            stacked: false,
          }}
        />
      </Modal>
    </>
  );
};

export default Dashboard;
