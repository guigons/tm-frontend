import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container } from './styles';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import Option from '../../../../components/Select/Option';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { ITemplatesFilterCondition } from '../..';
import { ITP } from '../../../TPs';

interface IFormProps {
  initialData: ITemplatesFilterCondition;
  onSubmit(condition: ITemplatesFilterCondition): void;
  onCancel?(): void;
  edit?: boolean;
}

interface IFormData {
  key: string;
  operador: string;
  value: string;
}

interface IOption {
  label: string;
  value: string;
}

const FormCondition: React.FC<IFormProps> = ({
  initialData,
  onSubmit,
  edit,
}) => {
  const formRef = useRef<FormHandles>(null);

  const operatorOptions: IOption[] = [
    { label: 'Igual á', value: 'equals' },
    { label: 'Expressão Regular', value: 'regex' },
  ];

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      const { key, operador, value } = data;
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          key: Yup.string().required('Campo é obrigatório'),
          operador: Yup.string().required('Operador é obrigatório'),
          value: Yup.string().required('Valor é obrigatório'),
        });
        await schema.validate(
          { key, operador, value },
          {
            abortEarly: false,
          },
        );
        const newTemplate: ITemplatesFilterCondition = {
          _id: initialData._id,
          filterId: initialData.filterId,
          key,
          operador,
          value,
        };
        onSubmit(newTemplate);
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [initialData._id, initialData.filterId, onSubmit],
  );

  return (
    <Container ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
      <h1>{edit ? 'Editar Condição' : 'Novo Condição'}</h1>

      <Input name="key" label="Campo" type="text" minWidthLabel="70px" />
      <Select name="operador" label="Operador" minWidthLabel="70px">
        {operatorOptions.map(operator => (
          <Option
            key={operator.value}
            label={operator.label}
            value={operator.value}
          >
            {operator.label}
          </Option>
        ))}
      </Select>
      <Input name="value" label="Valor" type="text" minWidthLabel="70px" />
      <Button type="submit">Salvar</Button>
    </Container>
  );
};

export default FormCondition;
