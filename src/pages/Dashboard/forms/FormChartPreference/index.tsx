import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container } from './styles';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { IChartPreference } from '../../../../hooks/preferences';
import { ITemplate } from '../..';
import Select from '../../../../components/Select';
import Option from '../../../../components/Select/Option';

interface IFormProps {
  initialData?: IChartPreference;
  templates: ITemplate[];
  onSubmit(chartPreference: IChartPreference): void;
  onCancel?(): void;
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

const FormChartPreference: React.FC<IFormProps> = ({
  initialData,
  templates,
  onSubmit,
}) => {
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

  const handleSubmit = useCallback(
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
        const newChartPreference: IChartPreference = {
          _id: initialData?._id as string,
          name,
          template_id,
          horizontal,
          groupBy,
          period,
          amount,
          start: initialData?.start as Date,
          end: initialData?.end as Date,
          stacked: initialData?.stacked as boolean,
          type: initialData?.type as string,
        };
        onSubmit(newChartPreference);
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [initialData, onSubmit],
  );

  return (
    <Container ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
      <h1>{initialData?.name ? 'Editar Gráfico' : 'Novo Gráfico'}</h1>

      <Input
        name="name"
        label="Nome"
        type="text"
        placeholder="Digite um nome ..."
      />

      <Select name="template_id" label="Filtro">
        {templates &&
          templates?.map(template => (
            <Option
              key={template._id}
              value={template._id}
              label={template.name}
            >
              {template.name}
            </Option>
          ))}
      </Select>

      <Select name="groupBy" label="Agrupar Por">
        {groupBys.map(groupBy => (
          <Option key={groupBy.path} value={groupBy.path} label={groupBy.label}>
            {groupBy.label}
          </Option>
        ))}
      </Select>
      <Select name="horizontal" label="Eixo Horizontal">
        {horizontals.map(horizontal => (
          <Option
            key={horizontal.path}
            value={horizontal.path}
            label={horizontal.label}
          >
            {horizontal.label}
          </Option>
        ))}
      </Select>
      <Select name="period" label="Período">
        <Option value="last_days" label="Últimos Dias">
          Últimos Dias
        </Option>
        <Option value="last_weeks" label="Últimas Semanas">
          Últimas Semanas
        </Option>
        <Option value="last_months" label="Últimos Meses">
          Últimos Meses
        </Option>
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
    </Container>
  );
};

export default FormChartPreference;
