import React, { useRef, useCallback, useContext } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { uuid } from 'uuidv4';
import { MdAdd } from 'react-icons/md';
import { Container } from './styles';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { IChartPreference } from '../../../../hooks/preferences';
import { IStamp, IStampType, StampContext } from '../..';
import Select from '../../../../components/Select';
import Option from '../../../../components/Select/Option';

interface IFormProps {
  initialData?: IStamp;
  onSubmit(data: IStamp): void;
  onClickNewStampType(): void;
  onClickNewStampCategory(): void;
  onCancel?(): void;
}

interface IFormNewData {
  type_id: string;
  category_id: string;
  cod: string;
  description: string;
}

const FormNewStamp: React.FC<IFormProps> = ({
  initialData,
  onClickNewStampType,
  onClickNewStampCategory,
  onSubmit,
}) => {
  const formRef = useRef<FormHandles>(null);
  const {
    stampTypes,
    stampTypeSelected,
    setStampTypeSelected,
    stampCategorySelected,
    setStampCategorySelected,
  } = useContext(StampContext);

  const handleSubmit = useCallback(
    async (data: IFormNewData) => {
      const { type_id, category_id, cod, description } = data;
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          type_id: Yup.string().required('Tipo é obrigatório'),
          category_id: Yup.string().required('Categoria é obrigatório'),
          cod: Yup.string().required('Código é obrigatório'),
          description: Yup.string().required('Descrição é obrigatório'),
        });
        await schema.validate(
          { type_id, category_id, cod, description },
          {
            abortEarly: false,
          },
        );
        const newStamp: IStamp = {
          id: initialData?.id || uuid(),
          type_id,
          category_id,
          cod,
          description,
        };
        onSubmit(newStamp);
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
      <div className="Line1">
        <Select
          name="type_id"
          label="Tipo"
          onChange={(value: string) => {
            setStampTypeSelected(stampTypes.find(st => st.id === value));
          }}
          value={stampTypeSelected?.id}
        >
          {stampTypes.map(stampType => (
            <Option
              key={stampType.id}
              label={stampType.name}
              value={stampType.id}
            >
              {stampType.name}
            </Option>
          ))}
        </Select>
        <Select
          name="category_id"
          label="Categoria"
          value={stampCategorySelected?.id}
        >
          {stampTypes
            .find(st => st.id === stampTypeSelected?.id)
            ?.categories.map(category => (
              <Option
                key={category.id}
                label={category.name}
                value={category.id}
              >
                {category.name}
              </Option>
            ))}
        </Select>
      </div>
      <div className="Line2">
        <div className="New">
          <button type="button" onClick={onClickNewStampType}>
            + Novo tipo
          </button>
        </div>
        <div className="New">
          <button type="button" onClick={onClickNewStampCategory}>
            + Nova categoria
          </button>
        </div>
      </div>
      <div className="Line3">
        <Input label="Descrição" name="description" />
      </div>
      <div className="Line4">
        <Input label="Código" name="cod" />
        <Button type="submit" icon={MdAdd} background="#19b2ff">
          Adicionar
        </Button>
      </div>
    </Container>
  );
};

export default FormNewStamp;
