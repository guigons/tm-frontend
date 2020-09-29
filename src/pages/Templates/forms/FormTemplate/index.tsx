import React, { useRef, useCallback, useState } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { ObjectId } from 'mongodb';
import { Container, Filters, Table, Header, Main, Footer } from './styles';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { ITemplate, ITemplatesFilterCondition } from '../..';
import FormCondition from '../FormCondition';
import ExpansionPainel from '../../../../components/ExpansionPainel';
import Modal, { IModalHandles } from '../../../../components/Modal';

interface IFormProps {
  initialData?: ITemplate;
  onSubmit(template: ITemplate): void;
  onCancel?(): void;
}

interface IFormData {
  name: string;
  global: boolean;
  target: string;
}

interface IOption {
  label: string;
  path: string;
}

const FormTemplate: React.FC<IFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const formRef = useRef<FormHandles>(null);
  const modalCondition = useRef<IModalHandles>();

  const [filters, setFilters] = useState(initialData?.filters);
  const [conditionSelected, setConditionSelected] = useState<
    ITemplatesFilterCondition
  >();
  const [conditionModalEditState, setConditionModalEditState] = useState(false);

  const targetsOptions: IOption[] = [
    { label: 'TAs', path: 'tas' },
    { label: 'TPs', path: 'tps' },
  ];

  const handleSubmitTemplate = useCallback(
    async (data: IFormData) => {
      const { name, global } = data;
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
        });
        await schema.validate(
          { name },
          {
            abortEarly: false,
          },
        );
        const newTemplate: ITemplate = {
          _id: initialData?._id as string,
          name,
          global: true,
          target: 'TPs',
          filters: filters || [],
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
    [filters, initialData, onSubmit],
  );

  const handleSubmitCondition = useCallback(
    (newCondition: ITemplatesFilterCondition) => {
      if (conditionModalEditState) {
        setFilters(
          filters?.map(f => {
            if (f._id === newCondition.filterId) {
              return {
                ...f,
                conditions: f.conditions.map(c => {
                  if (c._id === newCondition._id) {
                    return newCondition;
                  }
                  return c;
                }),
              };
            }
            return f;
          }),
        );
      } else {
        setFilters(
          filters?.map(f => {
            if (f._id === newCondition.filterId) {
              return {
                ...f,
                conditions: [...f.conditions, newCondition],
              };
            }
            return f;
          }),
        );
      }
      modalCondition.current?.close();
    },
    [conditionModalEditState, filters],
  );

  const handleRemoveFilter = useCallback(
    (id: string) => {
      setFilters(filters?.filter(f => f._id !== id));
    },
    [filters],
  );

  const handleAddFilter = useCallback(() => {
    if (filters) {
      setFilters([
        ...filters,
        { _id: new ObjectId().toHexString(), conditions: [] },
      ]);
    }
  }, [filters]);

  const handleEditCondition = useCallback(
    (filterId: string, conditionId: string) => {
      setConditionModalEditState(true);
      const condition = filters
        ?.find(f => f._id === filterId)
        ?.conditions.find(c => c._id === conditionId);

      if (condition) setConditionSelected({ ...condition, filterId });
      modalCondition.current?.open();
    },
    [filters],
  );

  const handleRemoveCondition = useCallback(
    (filterId: string, conditionId: string) => {
      setFilters(
        filters?.map(f => {
          if (f._id === filterId) {
            return {
              ...f,
              conditions: f.conditions.filter(c => c._id !== conditionId),
            };
          }
          return f;
        }),
      );
    },
    [filters],
  );

  const handleNewCondition = useCallback((filterId: string) => {
    setConditionModalEditState(false);
    setConditionSelected({
      _id: new ObjectId().toHexString(),
      filterId,
      key: '',
      operador: 'equals',
      value: '',
    });
    modalCondition.current?.open();
  }, []);

  return (
    <>
      <Container
        ref={formRef}
        onSubmit={handleSubmitTemplate}
        initialData={initialData}
      >
        <Header>
          <h1>{initialData?.name ? 'Editar Template' : 'Novo Template'}</h1>

          <Input
            name="name"
            label="Nome"
            type="text"
            placeholder="Digite um nome ..."
          />
        </Header>

        <Main>
          <Filters>
            <h1>Filtros</h1>
            <button type="button" onClick={handleAddFilter}>
              Adicionar Filtro
            </button>
          </Filters>

          {filters?.map((filter, filterIndex) => (
            <ExpansionPainel
              key={filter._id}
              title={filterIndex < filters.length - 1 ? 'AND' : ''}
              preTitle={`Filtro ${filterIndex + 1}`}
              titleColor="#19b2ff"
              clean
              barComponent={() => (
                <>
                  <MdDelete
                    size={18}
                    onClick={() => handleRemoveFilter(filter._id)}
                  />
                </>
              )}
            >
              <Table>
                <thead>
                  <tr>
                    <th style={{ width: '10%', color: 'transparent' }}>.</th>
                    <th style={{ width: '15%' }}>Campo</th>
                    <th style={{ width: '25%' }}>Operador</th>
                    <th style={{ width: '30%' }}>Valor</th>
                    <th
                      style={{
                        width: '20%',
                        textAlign: 'right',
                        paddingRight: '10px',
                      }}
                    >
                      <MdAdd
                        size={18}
                        onClick={() => handleNewCondition(filter._id)}
                        color="#19b2ff"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filter.conditions.map(condition => (
                    <tr key={condition._id}>
                      <td style={{ color: '#19b2ff' }}>OR</td>
                      <td>{condition.key}</td>
                      <td>{condition.operador}</td>
                      <td>{condition.value}</td>
                      <td
                        style={{
                          textAlign: 'right',
                          paddingRight: '10px',
                        }}
                      >
                        <MdEdit
                          size={18}
                          onClick={() =>
                            handleEditCondition(filter._id, condition._id)
                          }
                        />
                        <MdDelete
                          size={18}
                          onClick={() =>
                            handleRemoveCondition(filter._id, condition._id)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ExpansionPainel>
          ))}
        </Main>

        {/* <FormCondition onSubmit={() => {}} /> */}
        <Footer>
          <Button type="submit">Salvar</Button>
        </Footer>
      </Container>
      <Modal ref={modalCondition} size="sm">
        <FormCondition
          onSubmit={handleSubmitCondition}
          edit={conditionModalEditState}
          initialData={
            conditionSelected || {
              _id: new ObjectId().toHexString(),
              key: '',
              operador: 'equals',
              value: '',
            }
          }
        />
      </Modal>
    </>
  );
};

export default FormTemplate;
