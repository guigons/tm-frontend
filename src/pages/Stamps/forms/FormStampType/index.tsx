import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { uuid } from 'uuidv4';
import { Container, Header, Main, Footer } from './styles';
import getValidationErrors from '../../../../utils/getValidationErrors';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { IStampType } from '../..';

interface IFormData {
  name: string;
}

interface IFormProps {
  initialData?: IStampType;
  onSubmit(data: IStampType): void;
  onCancel?(): void;
  edit?: boolean;
}

const FormStampType: React.FC<IFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  edit,
}) => {
  const form = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async ({ name }: IFormData) => {
      try {
        form.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
        });

        await schema.validate(
          { name },
          {
            abortEarly: false,
          },
        );

        const newStampType: IStampType = {
          ...(initialData || { id: uuid(), name: '', categories: [] }),
          name,
        };

        onSubmit(newStampType);
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
      <Header>{edit ? <h1>Editar Tipo</h1> : <h1>Novo tipo</h1>}</Header>
      <Main>
        <Input name="name" type="text" label="Nome do tipo" />
      </Main>
      <Footer>
        <Button
          type="submit"
          background="#312e38"
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

export default FormStampType;
