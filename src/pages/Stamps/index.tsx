import React, {
  useState,
  useCallback,
  useRef,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { uuid } from 'uuidv4';
import { Container, Header, Main, StampTypes } from './styles';
import { useFetch } from '../../hooks/fetch';
import Spinner from '../../components/Spinner';
import FormNewStamp from './forms/FormNewStamp';
import Modal, { IModalHandles } from '../../components/Modal';
import FormTypeStamp from './forms/FormTypeStamp';
import FormTypeCategoryStamp from './forms/FormTypeCategoryStamp';
import FormStamp from './forms/FormStamp';
import StampTypesCard from './components/StampTypesCard';
import api from '../../services/api';

export interface IStamp {
  id: string;
  cod: string;
  description: string;
  type_id?: string;
  category_id?: string;
}

export interface IStampCategory {
  id: string;
  name: string;
  type_id?: string;
  stamps: IStamp[];
}

export interface IStampType {
  id: string;
  name: string;
  categories: IStampCategory[];
}

interface IStampContextData {
  stampTypes: IStampType[];
  stampTypeSelected: IStampType | undefined;
  setStampTypeSelected: Dispatch<SetStateAction<IStampType | undefined>>;
  stampCategorySelected: IStampCategory | undefined;
  setStampCategorySelected: Dispatch<
    SetStateAction<IStampCategory | undefined>
  >;
  handleRemoveStampType(id: string): void;
  handleEditStampType(stampType: IStampType): void;
}

export const StampContext = createContext<IStampContextData>(
  {} as IStampContextData,
);

const Stamps: React.FC = () => {
  const [stampTypeSelected, setStampTypeSelected] = useState<
    IStampType | undefined
  >();
  const [stampCategorySelected, setStampCategorySelected] = useState<
    IStampCategory | undefined
  >();
  const { data: stampTypes, mutate } = useFetch<IStampType[]>('/stampTypes');
  const modalStampType = useRef<IModalHandles>();
  const modalStampTypeCategory = useRef<IModalHandles>();
  const modalStamp = useRef<IModalHandles>();
  const [newStateModalStampType, setNewStateModalStampType] = useState(true);
  const [
    newStateModalStampTypeCategory,
    setNewStateModalStampTypeCategory,
  ] = useState(true);
  const [newStateModalStamp, setNewStateModalStamp] = useState(true);

  const handleSubmitNewStamp = useCallback(newStamp => {
    console.log(newStamp);
  }, []);

  const handleSubmitStampType = useCallback(
    (newStampType: IStampType) => {
      if (stampTypes) {
        if (newStateModalStampType) {
          Object.assign(newStampType, { id: uuid(), categories: [] });
          mutate([...stampTypes, newStampType], false);
          api.post('/stampTypes', newStampType);
        } else {
          mutate(
            stampTypes.map(st => {
              if (st.id.toString() === stampTypeSelected?.id.toString()) {
                return {
                  ...st,
                  name: newStampType.name,
                };
              }
              return st;
            }),
            false,
          );
          api.patch(`/stampTypes/${newStampType.id}`, newStampType);
        }
      }

      modalStampType.current?.close();
    },
    [mutate, newStateModalStampType, stampTypeSelected, stampTypes],
  );

  const handleSubmitStampTypeCategory = useCallback(newStampTypeCategory => {
    console.log(newStampTypeCategory);
  }, []);

  const handleSubmitStamp = useCallback(newStamp => {
    console.log(newStamp);
  }, []);

  const handleRemoveStampType = useCallback(
    id => {
      mutate(
        stampTypes?.filter(st => st.id.toString() !== id.toString()),
        false,
      );
      api.delete(`/stampTypes/${id}`);
    },
    [mutate, stampTypes],
  );

  const handleEditStampType = useCallback((stampType: IStampType) => {
    setNewStateModalStampType(false);
    setStampTypeSelected(stampType);
    modalStampType.current?.open();
  }, []);

  if (!stampTypes) {
    return (
      <Container>
        <Header />
        <Main>
          <Spinner />
        </Main>
      </Container>
    );
  }

  return (
    <StampContext.Provider
      value={{
        stampTypes,
        stampTypeSelected,
        setStampTypeSelected,
        stampCategorySelected,
        setStampCategorySelected,
        handleRemoveStampType,
        handleEditStampType,
      }}
    >
      <Container>
        <Header>
          <h1>Carimbos</h1>
        </Header>
        <Main>
          <div className="Stamps">
            <FormNewStamp
              onSubmit={handleSubmitNewStamp}
              onClickNewStampType={() => {
                setNewStateModalStampType(true);
                modalStampType.current?.open();
              }}
              onClickNewStampTypeCategory={() => {
                setNewStateModalStampTypeCategory(true);
                modalStampTypeCategory.current?.open();
              }}
            />
          </div>
          <StampTypes>
            {stampTypes?.map(stampType => (
              <StampTypesCard key={stampType.id} stampType={stampType} />
            ))}
          </StampTypes>
        </Main>
      </Container>
      <Modal ref={modalStampType} size="md">
        <FormTypeStamp
          onSubmit={handleSubmitStampType}
          onCancel={() => modalStampType.current?.close()}
          initialData={newStateModalStampType ? undefined : stampTypeSelected}
          edit={!newStateModalStampType}
        />
      </Modal>
      <Modal ref={modalStampTypeCategory} size="md">
        <FormTypeCategoryStamp
          onSubmit={handleSubmitStampTypeCategory}
          onCancel={() => modalStampTypeCategory.current?.close()}
          // initialData={
          //   newStateModalStampTypeCategory
          //     ? { name: '', newTypeStampId: stampTypeSelected?.id || '' }
          //     : {
          //         ...stampCategorySelected,
          //         newTypeStampId: stampTypeSelected?.id,
          //       }
          // }
          edit={!newStateModalStampTypeCategory}
        />
      </Modal>
      <Modal ref={modalStamp} size="md">
        <FormStamp
          onSubmit={handleSubmitStamp}
          onCancel={() => modalStamp.current?.close()}
          // initialData={{
          //   ...templateQuestionSelected,
          //   newModuleId: templateModuleSelected.id,
          //   newCategoryId: templateCategorySelected.id,
          // }}
          edit={!newStateModalStamp}
        />
      </Modal>
    </StampContext.Provider>
  );
};

export default Stamps;
