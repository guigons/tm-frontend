import React, { useRef, useContext, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { uuid } from 'uuidv4';
import { Container, Header, Main, Footer } from './styles';
import getValidationErrors from '../../../../utils/getValidationErrors';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import Option from '../../../../components/Select/Option';
import { IStamp, StampContext } from '../..';
import Input from '../../../../components/Input';

interface IFormData {
  cod: string;
  description: string;
  type_id: string;
  category_id: string;
}

interface IFormProps {
  initialData?: IStamp;
  onSubmit(data: IStamp): void;
  onCancel?(): void;
  edit?: boolean;
}

const FormStamp: React.FC<IFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  edit,
}) => {
  const form = useRef<FormHandles>(null);
  const { stampTypes } = useContext(StampContext);

  const handleSubmit = useCallback(
    async ({ cod, description, type_id, category_id }: IFormData) => {
      try {
        form.current?.setErrors({});
        const schema = Yup.object().shape({
          description: Yup.string().required('Pergunta é obrigatório'),
          cod: Yup.string().required('Código é obrigatório'),
        });

        await schema.validate(
          { description, cod },
          {
            abortEarly: false,
          },
        );

        const newStamp: IStamp = {
          ...(initialData || {
            id: uuid(),
            description: '',
            cod: '',
            type_id: '',
            category_id: '',
          }),
          type_id,
          category_id,
          description,
          cod,
        };

        onSubmit(newStamp);
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          form.current?.setErrors(errors);
        }
      }
    },
    [initialData, onSubmit],
  );

  return (
    <Container ref={form} onSubmit={handleSubmit} initialData={initialData}>
      <Header>{edit ? <h1>Editar carimbo</h1> : <h1>Novo carimbo</h1>}</Header>
      <Main>
        <Select name="type_id" label="Nome do tipo" disabled={edit}>
          {stampTypes.map(m => (
            <Option key={m.id} label={m.name} value={m.id}>
              {`${m.name} - ${m.id}`}
            </Option>
          ))}
        </Select>
        <Select name="category_id" label="Nome da categoria" disabled={edit}>
          {stampTypes
            .find(m => m.id === initialData?.type_id)
            ?.categories.map(c => (
              <Option key={c.id} label={c.name} value={c.id}>
                {`${c.name} - ${c.id}`}
              </Option>
            ))}
        </Select>
        <Input name="description" label="Descrição" />
        <Input name="cod" label="Código" />
      </Main>
      <Footer>
        <Button
          type="submit"
          background="transparent"
          color="grey"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </Footer>
    </Container>
  );
};

export default FormStamp;
