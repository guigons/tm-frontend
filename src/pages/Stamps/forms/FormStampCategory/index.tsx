import React, { useRef, useCallback, useContext } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { uuid } from 'uuidv4';
import { Container, Header, Main, Footer } from './styles';
import getValidationErrors from '../../../../utils/getValidationErrors';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import Option from '../../../../components/Select/Option';
import { IStampCategory, StampContext } from '../..';

interface IFormData {
  name: string;
  type_id: string;
}

interface IFormProps {
  initialData?: IStampCategory;
  onSubmit(data: IStampCategory): void;
  onCancel?(): void;
  edit?: boolean;
}

const FormStampCategory: React.FC<IFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  edit,
}) => {
  const form = useRef<FormHandles>(null);
  const { stampTypes } = useContext(StampContext);

  const handleSubmit = useCallback(
    async ({ name, type_id }: IFormData) => {
      try {
        form.current?.setErrors({});
        const schema = Yup.object().shape({
          type_id: Yup.string().required('Tipo é obrigatório'),
          name: Yup.string().required('Nome é obrigatório'),
        });

        await schema.validate(
          { name, type_id },
          {
            abortEarly: false,
          },
        );

        const newStampCategory: IStampCategory = {
          ...(initialData || { id: uuid(), name: '', stamps: [] }),
          type_id,
          name,
        };

        onSubmit(newStampCategory);
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
      <Header>
        {edit ? <h1>Editar categoria</h1> : <h1>Nova categoria</h1>}
      </Header>
      <Main>
        <Select name="type_id" label="Nome do tipo" disabled={edit}>
          {stampTypes.map(m => (
            <Option key={m.id} label={m.name} value={m.id}>
              {m.name}
            </Option>
          ))}
        </Select>
        <Input name="name" type="text" label="Nome da categoria" />
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

export default FormStampCategory;
