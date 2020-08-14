import React, { useRef, useCallback, useContext } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Header, Main, Footer } from './styles';
import getValidationErrors from '../../../../utils/getValidationErrors';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import Option from '../../../../components/Select/Option';
import { StampContext } from '../..';

interface ICategoryFormData {
  name: string;
  newTypeStampId: string;
}

interface IFormProps {
  initialData?: ICategoryFormData;
  onSubmit(data: ICategoryFormData): void;
  onCancel?(): void;
  edit?: boolean;
}

const FormTypeCategoryStamp: React.FC<IFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  edit,
}) => {
  const form = useRef<FormHandles>(null);
  const { stampTypes } = useContext(StampContext);

  const handleSubmit = useCallback(
    async ({ name, newTypeStampId }: ICategoryFormData) => {
      try {
        form.current?.setErrors({});
        const schema = Yup.object().shape({
          newTypeStampId: Yup.string().required('Tipo é obrigatório'),
          name: Yup.string().required('Nome é obrigatório'),
        });

        await schema.validate(
          { name, newTypeStampId },
          {
            abortEarly: false,
          },
        );

        onSubmit({ name, newTypeStampId });
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          form.current?.setErrors(errors);
        }
      }
    },
    [onSubmit],
  );

  return (
    <Container ref={form} onSubmit={handleSubmit} initialData={initialData}>
      <Header>
        {edit ? <h1>Editar categoria</h1> : <h1>Nova categoria</h1>}
      </Header>
      <Main>
        <Select name="newTypeStampId" label="Nome do tipo" disabled={edit}>
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

export default FormTypeCategoryStamp;
