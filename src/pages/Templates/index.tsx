import React, { useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { MdAdd, MdArrowBack, MdDelete, MdEdit } from 'react-icons/md';
import { cache, mutate as mutateGlobal } from 'swr';
import { ObjectId } from 'mongodb';
import { Container, Header, Main, Table, ModalRemoveTemplate } from './styles';
import { useFetch } from '../../hooks/fetch';
import Spinner from '../../components/Spinner';
import Modal, { IModalHandles } from '../../components/Modal';
import FormTemplate from './forms/FormTemplate';
import Button from '../../components/Button';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

export interface ITemplatesFilterCondition {
  _id: string;
  filterId?: string;
  key: string;
  operador: string;
  value: string;
}

export interface ITemplatesFilter {
  _id: string;
  conditions: ITemplatesFilterCondition[];
}

export interface ITemplate {
  _id: string;
  name: string;
  global: boolean;
  target: string;
  filters: ITemplatesFilter[];
}

const Templates: React.FC = () => {
  const modalMeusTemplatesRef = useRef<IModalHandles>();
  const modalRemoveTemplate = useRef<IModalHandles>();
  const { data: templates, mutate } = useFetch<ITemplate[]>('/templates');
  const history = useHistory();
  const [templateSelected, setTemplateSelected] = useState<ITemplate>();
  const [stateModalNewTemplate, setStateModalNewTemplate] = useState(false);
  const { addToast } = useToast();

  const handleSubmitTemplate = useCallback(
    (newTemplate: ITemplate) => {
      if (stateModalNewTemplate) {
        const save = async (): Promise<void> => {
          const oldTemplates = cache.get('/templates');
          api.post<ITemplate>(`/templates/`, newTemplate).catch(error => {
            const { message } = error.response.data;
            const description = 'Ocorreu um erro ao salvar o template.';

            mutateGlobal('/templates', oldTemplates, false);
            addToast({
              type: 'error',
              title: 'Erro ao salvar',
              description,
            });
          });
          mutateGlobal(
            '/templates',
            async (oldCacheTemplates: ITemplate[]) => {
              return [...oldCacheTemplates, newTemplate];
            },
            false,
          );
        };
        save();
      } else {
        const save = async (): Promise<void> => {
          const oldTemplates = cache.get('/templates');
          api.patch(`/templates/${newTemplate._id}`, newTemplate).catch(err => {
            const { message } = err.response.data;
            const description = 'Ocorreu um erro ao salvar o template.';

            mutateGlobal('/templates', oldTemplates, false);
            addToast({
              type: 'error',
              title: 'Erro ao salvar',
              description,
            });
          });

          mutateGlobal(
            '/templates',
            async (oldCacheTemplates: ITemplate[]) => {
              return oldCacheTemplates.map(t =>
                t._id === newTemplate._id ? newTemplate : t,
              );
            },
            false,
          );
        };
        save();
      }
      modalMeusTemplatesRef.current?.close();
    },
    [addToast, stateModalNewTemplate],
  );

  const handleNewTemplate = useCallback(() => {
    setStateModalNewTemplate(true);
    setTemplateSelected({
      _id: new ObjectId().toHexString(),
      name: '',
      global: true,
      target: 'TPs',
      filters: [],
    });
    modalMeusTemplatesRef.current?.open();
  }, []);

  const handleEditTemplate = useCallback(
    (idTemplate: string) => {
      setStateModalNewTemplate(false);
      const template = templates?.find(t => t._id === idTemplate);
      setTemplateSelected(template);
      modalMeusTemplatesRef.current?.open();
    },
    [templates],
  );

  const handleOpenModalRemoveTemplate = useCallback(
    (idTemplate: string) => {
      const template = templates?.find(t => t._id === idTemplate);
      setTemplateSelected(template);
      modalRemoveTemplate.current?.open();
    },
    [templates],
  );

  const handleRemoveTemplate = useCallback(
    (idTemplate: string | undefined) => {
      const oldTemplates = cache.get('/templates');
      api.delete<ITemplate[]>(`/templates/${idTemplate}`).catch(() => {
        mutate(oldTemplates);
        addToast({
          type: 'error',
          title: 'Erro de remoção',
          description: 'Falha para remover template.',
        });
      });
      const updatedTemplates = templates?.filter(t => t._id !== idTemplate);
      mutate(updatedTemplates, false);
      modalRemoveTemplate.current?.close();
    },
    [addToast, mutate, templates],
  );

  if (!templates) {
    return (
      <Container>
        <Header />
        <Main>
          <div className="SpinnerContent">
            <Spinner />
          </div>
        </Main>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Header>
          <MdArrowBack onClick={() => history.goBack()} size={22} />
          <h1>Templates</h1>
        </Header>
        <Main>
          <Table>
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Nome</th>
                <th style={{ width: '40%' }}>Target</th>
                <th
                  style={{
                    width: '20%',
                    textAlign: 'right',
                    paddingRight: '10px',
                  }}
                >
                  <MdAdd
                    size={18}
                    onClick={handleNewTemplate}
                    color="#19b2ff"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {templates.map(template => (
                <tr key={template._id}>
                  <td>{template.name}</td>
                  <td>{template.target}</td>
                  <td
                    style={{
                      textAlign: 'right',
                      paddingRight: '10px',
                    }}
                  >
                    <MdEdit
                      size={18}
                      onClick={() => handleEditTemplate(template._id)}
                    />
                    <MdDelete
                      size={18}
                      onClick={() =>
                        handleOpenModalRemoveTemplate(template._id)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Main>
      </Container>
      <Modal ref={modalMeusTemplatesRef}>
        <FormTemplate
          onSubmit={handleSubmitTemplate}
          onCancel={() => modalMeusTemplatesRef.current?.close()}
          initialData={templateSelected}
        />
      </Modal>
      <Modal ref={modalRemoveTemplate} size="sm" removeCloseButton>
        <ModalRemoveTemplate>
          <h4>Tem certeza que deseja remover o template selecionado?</h4>
          <h3>
            Todos os gráficos que utilizam esse template deixarão de existir
          </h3>
          <div className="Buttons">
            <Button onClick={() => modalRemoveTemplate.current?.close()}>
              Não
            </Button>
            <Button onClick={() => handleRemoveTemplate(templateSelected?._id)}>
              Sim
            </Button>
          </div>
        </ModalRemoveTemplate>
      </Modal>
    </>
  );
};

export default Templates;
