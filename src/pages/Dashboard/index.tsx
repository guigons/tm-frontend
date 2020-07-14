import React, { useRef, useState, useCallback, useEffect } from 'react';
import { FiSettings, FiPlus } from 'react-icons/fi';
import { MdDelete, MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { subDays, format } from 'date-fns';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import {
  Container,
  Header,
  Main,
  ListChartPreferences,
  ChartPreference,
  NewChartPreference,
  ModalNewChartPreference,
  ModalEditChartPreference,
  ModalRemoveChartPreference,
  ModalChart,
} from './styles';
import Modal, { IModalHandles } from '../../components/Modal';
import Chart from '../../components/Chart';
import { usePreferences, IChartPreference } from '../../hooks/preferences';
import api from '../../services/api';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import getValidationErrors from '../../utils/getValidationErrors';

export interface ITemplatesFilterCondition {
  key: string;
  value: string;
}

export interface ITemplatesFilter {
  conditions: ITemplatesFilterCondition[];
}

interface ITemplate {
  _id: string;
  name: string;
  global: boolean;
  target: string;
  filters: ITemplatesFilter[];
  grouping: string[];
}

interface IFormData {
  name: string;
  template_id: string;
  horizontal: string;
  groupBy: string;
  period: string;
  amount: number;
}

interface IOption {
  label: string;
  path: string;
}

interface IAddChartPreference {
  name: string;
  template_id: string;
  horizontal: string;
  groupBy?: string;
  period: string;
  amount?: number;
}

const Dashboard: React.FC = () => {
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [selectedChart, setSelectedChart] = useState<IChartPreference>();
  const modalMeusTemplatesRef = useRef<IModalHandles>();
  const modalNewChartRef = useRef<IModalHandles>();
  const modalEditChartRef = useRef<IModalHandles>();
  const modalRemoveChartRef = useRef<IModalHandles>();
  const modalChartRef = useRef<IModalHandles>();

  const { preferences, updateChartsPreference } = usePreferences();
  const formRef = useRef<FormHandles>(null);

  const groupBys: IOption[] = [
    { label: 'Não Agrupar', path: 'nao_agrupar' },
    { label: 'Projeto', path: 'projeto' },
    { label: 'Status', path: 'status.nome' },
    { label: 'Localidade', path: 'localidade' },
    { label: 'Carimbos Tipo', path: 'carimbos.tipo' },
    { label: 'Carimbos Categoria', path: 'carimbos.categoria' },
    { label: 'Carimbos Descrição', path: 'carimbos.descrição' },
    { label: 'Carimbo Baixa Tipo', path: 'baixa.carimbo.tipo' },
    { label: 'Carimbo Baixa Categoria', path: 'baixa.carimbo.categoria' },
    { label: 'Carimbo Baixa Descrição', path: 'baixa.carimbo.descrição' },
  ];

  const horizontals: IOption[] = [
    { label: 'Data', path: 'date' },
    { label: 'Agrupamento', path: 'grouping' },
  ];

  useEffect(() => {
    async function loadTemplates(): Promise<void> {
      const response = await api.get<ITemplate[]>('/templates');
      setTemplates(response.data);
    }
    loadTemplates();
  }, []);

  const handleAddPreferenceChart = useCallback(
    ({
      template_id,
      name,
      horizontal,
      groupBy,
      period,
      amount,
    }: IAddChartPreference) => {
      const now = new Date();

      updateChartsPreference([
        ...preferences.charts,
        {
          _id: '',
          template_id,
          name,
          type: 'bar',
          start: subDays(now, 30),
          end: now,
          period,
          amount,
          horizontal,
          stacked: true,
          groupBy,
        },
      ]);
    },
    [preferences.charts, updateChartsPreference],
  );

  const handleRemovePreferenceChart = useCallback(() => {
    updateChartsPreference(
      preferences.charts.filter(c => c._id !== selectedChart?._id),
    );
    modalRemoveChartRef.current?.close();
  }, [preferences.charts, selectedChart, updateChartsPreference]);

  const handleEditChart = useCallback((chartPreference: IChartPreference) => {
    setSelectedChart(chartPreference);
    modalEditChartRef.current?.open();
  }, []);

  const handleRemoveChart = useCallback((chartPreference: IChartPreference) => {
    setSelectedChart(chartPreference);
    modalRemoveChartRef.current?.open();
  }, []);

  const handleGroupByLabel = useCallback((groupBy: string | undefined) => {
    if (!groupBy || groupBy === 'nao_agrupar') return '';
    if (groupBy.includes('.')) {
      return `Por ${groupBy.split('.').join(' ')}`;
    }
    return `Por ${groupBy}`;
  }, []);

  const handlePeriodLabel = useCallback((chartPreference: IChartPreference) => {
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
  }, []);

  const handleSubmitAdd = useCallback(
    async (data: IFormData) => {
      const { name, template_id, horizontal, groupBy, period, amount } = data;
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        handleAddPreferenceChart({
          name,
          template_id,
          horizontal,
          groupBy,
          period,
          amount,
        });
        modalNewChartRef.current?.close();
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleAddPreferenceChart],
  );

  const handleSubmitEdit = useCallback(
    async (data: IFormData) => {
      const { name, template_id, horizontal, groupBy, period, amount } = data;
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const newSelectedChart: IChartPreference = {
          _id: selectedChart?._id as string,
          name,
          template_id,
          horizontal,
          groupBy,
          period,
          amount,
          start: selectedChart?.start as Date,
          end: selectedChart?.end as Date,
          stacked: selectedChart?.stacked as boolean,
          type: selectedChart?.type as string,
        };

        const newChartPreferences = preferences.charts.map(pc => {
          if (selectedChart && pc._id === selectedChart._id) {
            return newSelectedChart;
          }
          return pc;
        });

        updateChartsPreference(newChartPreferences);
        setSelectedChart(newSelectedChart);

        modalEditChartRef.current?.close();
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [preferences.charts, selectedChart, updateChartsPreference],
  );

  const handleChartFullScreen = useCallback(chartPreference => {
    setSelectedChart(chartPreference);
    modalChartRef.current?.open();
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
              <ChartPreference key={chartPreference._id}>
                <h1>{chartPreference.name}</h1>
                <span>{handleGroupByLabel(chartPreference.groupBy)}</span>

                <div className="Period">
                  {handlePeriodLabel(chartPreference)}
                </div>

                <div className="Icons">
                  <MdFullscreen
                    size={20}
                    onClick={() => handleChartFullScreen(chartPreference)}
                  />
                  <MdDelete
                    size={18}
                    onClick={() => handleRemoveChart(chartPreference)}
                  />
                  <FiSettings
                    size={14}
                    onClick={() => handleEditChart(chartPreference)}
                  />
                </div>

                <Chart
                  chartPreference={chartPreference}
                  height={200}
                  width={550}
                />
              </ChartPreference>
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
        <ModalNewChartPreference>
          <h1>Novo Gráfico</h1>
          <Form
            ref={formRef}
            onSubmit={handleSubmitAdd}
            initialData={{ amount: 7 }}
          >
            <Input
              name="name"
              label="Nome"
              type="text"
              placeholder="Digite um nome ..."
            />
            <Select name="template_id" label="Filtro">
              {templates.map(template => (
                <option key={template._id} value={template._id}>
                  {template.name}
                </option>
              ))}
            </Select>
            <Select name="groupBy" label="Agrupar Por">
              {groupBys.map(groupBy => (
                <option key={groupBy.path} value={groupBy.path}>
                  {groupBy.label}
                </option>
              ))}
            </Select>
            <Select name="horizontal" label="Eixo Y (Horizontal)">
              {horizontals.map(horizontal => (
                <option key={horizontal.path} value={horizontal.path}>
                  {horizontal.label}
                </option>
              ))}
            </Select>
            <Select name="period" label="Período">
              <option value="last_days">Últimos Dias</option>
              <option value="last_weeks">Últimas Semanas</option>
              <option value="last_months">Últimos Meses</option>
              {/* <option value="specific">Específico</option> */}
            </Select>
            <Input
              name="amount"
              label="Qtde"
              type="number"
              placeholder="Digite uma quantidade ..."
              min={1}
            />
            {/* <Input
              name="start"
              label="Inicio"
              type="date"
              placeholder="Data Início ..."
            />
            <Input
              name="end"
              label="Término"
              type="date"
              placeholder="Data Término ..."
            /> */}
            <Button type="submit">Salvar</Button>
          </Form>
        </ModalNewChartPreference>
      </Modal>
      <Modal ref={modalEditChartRef}>
        <ModalEditChartPreference>
          <h1>Editar Gráfico</h1>
          <Form
            ref={formRef}
            onSubmit={handleSubmitEdit}
            initialData={selectedChart}
          >
            <Input
              name="name"
              label="Nome"
              type="text"
              placeholder="Digite um nome ..."
            />
            <Select name="template_id" label="Filtro">
              {templates.map(template => (
                <option key={template._id} value={template._id}>
                  {template.name}
                </option>
              ))}
            </Select>
            <Select name="groupBy" label="Agrupar Por">
              {groupBys.map(groupBy => (
                <option key={groupBy.path} value={groupBy.path}>
                  {groupBy.label}
                </option>
              ))}
            </Select>
            <Select name="horizontal" label="Eixo Y (Horizontal)">
              {horizontals.map(horizontal => (
                <option key={horizontal.path} value={horizontal.path}>
                  {horizontal.label}
                </option>
              ))}
            </Select>
            <Select name="period" label="Período">
              <option value="last_days">Últimos Dias</option>
              <option value="last_weeks">Últimas Semanas</option>
              <option value="last_months">Últimos Meses</option>
              {/* <option value="specific">Específico</option> */}
            </Select>
            <Input
              name="amount"
              label="Qtde"
              type="number"
              placeholder="Digite uma quantidade ..."
              min={1}
            />
            {/* <Input
              name="start"
              label="Inicio"
              type="date"
              placeholder="Data Início ..."
            />
            <Input
              name="end"
              label="Término"
              type="date"
              placeholder="Data Término ..."
            /> */}
            <Button type="submit">Salvar</Button>
          </Form>
        </ModalEditChartPreference>
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
        {selectedChart ? (
          <ModalChart>
            <h1>{selectedChart.name}</h1>
            <span>{handleGroupByLabel(selectedChart.groupBy)}</span>
            <div className="Icons">
              <MdFullscreenExit
                size={20}
                onClick={() => modalChartRef.current?.close()}
              />
              <FiSettings
                size={14}
                onClick={() => handleEditChart(selectedChart)}
              />
            </div>
            <Chart
              chartPreference={selectedChart}
              height={400}
              width={1200}
              maxGroupColumns={20}
            />
          </ModalChart>
        ) : null}
      </Modal>
    </>
  );
};

export default Dashboard;
