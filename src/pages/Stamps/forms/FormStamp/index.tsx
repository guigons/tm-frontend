import React, { useRef, useContext, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Header, Main, Footer } from './styles';
import getValidationErrors from '../../../../utils/getValidationErrors';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import Option from '../../../../components/Select/Option';
import TextArea from '../../../../components/TextArea';
import { StampContext } from '../..';

interface IStampFormData {
  cod: string;
  description: string;
  newStampTypeId: string;
  newStampTypeCategoryId: string;
}

interface IFormProps {
  initialData?: IStampFormData;
  onSubmit(data: IStampFormData): void;
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
    async ({
      cod,
      description,
      newStampTypeId,
      newStampTypeCategoryId,
    }: IStampFormData) => {
      try {
        form.current?.setErrors({});
        const schema = Yup.object().shape({
          description: Yup.string().required('Pergunta é obrigatório'),
        });

        await schema.validate(
          { description },
          {
            abortEarly: false,
          },
        );

        onSubmit({ cod, description, newStampTypeId, newStampTypeCategoryId });
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

  console.log('ID', initialData);

  return (
    <Container ref={form} onSubmit={handleSubmit} initialData={initialData}>
      <Header>{edit ? <h1>Editar carimbo</h1> : <h1>Novo carimbo</h1>}</Header>
      <Main>
        <Select name="newStampTypeId" label="Nome do tipo" disabled={edit}>
          {stampTypes.map(m => (
            <Option key={m.id} label={m.name} value={m.id}>
              {`${m.name} - ${m.id}`}
            </Option>
          ))}
        </Select>
        <Select
          name="newStampTypeCategoryId"
          label="Nome da categoria"
          disabled={edit}
        >
          {stampTypes
            .find(m => m.id === initialData?.newStampTypeId)
            ?.categories.map(c => (
              <Option key={c.id} label={c.name} value={c.id}>
                {`${c.name} - ${c.id}`}
              </Option>
            ))}
        </Select>
        <TextArea name="description" label="Pergunta" rows={3} />
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
