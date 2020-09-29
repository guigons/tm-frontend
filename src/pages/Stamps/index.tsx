/* eslint-disable no-param-reassign */
import React, {
  useState,
  useCallback,
  useRef,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { Container, Header, Main, StampTypes } from './styles';
import { useFetch } from '../../hooks/fetch';
import Spinner from '../../components/Spinner';
import FormNewStamp from './forms/FormNewStamp';
import Modal, { IModalHandles } from '../../components/Modal';
import FormStampCategory from './forms/FormStampCategory';
import FormStamp from './forms/FormStamp';
import StampTypesCard from './components/StampTypesCard';
import api from '../../services/api';
import FormStampType from './forms/FormStampType';

export interface IStamp {
  id: string;
  cod: string;
  description: string;
  type_id: string;
  category_id: string;
}

export interface IStampCategory {
  id: string;
  name: string;
  type_id: string;
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
  handleRemoveStampType(idStampType: string): void;
  handleEditStampType(stampType: IStampType): void;
  handleRemoveStampCategory(
    idStampType: string,
    idStamtpCategory: string,
  ): void;
  handleEditStampCategory(stampCategory: IStampCategory): void;
  handleRemoveStamp(
    idStampType: string,
    idStamtpCategory: string,
    idStamp: string,
  ): void;
  handleEditStamp(stamp: IStamp): void;
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
  const [stampSelected, setStampSelected] = useState<IStamp | undefined>();
  const { data: stampTypes, mutate } = useFetch<IStampType[]>('/stampTypes');
  const modalStampType = useRef<IModalHandles>();
  const modalStampCategory = useRef<IModalHandles>();
  const modalStamp = useRef<IModalHandles>();
  const [newStateModalStampType, setNewStateModalStampType] = useState(true);
  const [newStateModalStampCategory, setNewStateModalStampCategory] = useState(
    true,
  );
  const [newStateModalStamp, setNewStateModalStamp] = useState(true);

  const handleSubmitStampType = useCallback(
    (newStampType: IStampType) => {
      if (stampTypes) {
        if (newStateModalStampType) {
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

  const handleSubmitStampCategory = useCallback(
    (newStampCategory: IStampCategory) => {
      if (stampTypes) {
        if (newStateModalStampCategory) {
          mutate(
            stampTypes.map(st => {
              if (newStampCategory.type_id === st.id) {
                return {
                  ...st,
                  categories: [...st.categories, newStampCategory],
                };
              }
              return st;
            }),
            false,
          );
          api.post('/stampCategories', newStampCategory);
        } else {
          mutate(
            stampTypes.map(st => {
              if (newStampCategory.type_id === st.id) {
                return {
                  ...st,
                  categories: st.categories.map(c => {
                    if (c.id === newStampCategory.id) {
                      return newStampCategory;
                    }
                    return c;
                  }),
                };
              }
              return st;
            }),
            false,
          );
          api.patch(
            `/stampCategories/${newStampCategory.id}`,
            newStampCategory,
          );
        }
      }

      modalStampCategory.current?.close();
    },
    [mutate, newStateModalStampCategory, stampTypes],
  );

  const handleSubmitStamp = useCallback(
    (newStamp: IStamp) => {
      if (stampTypes) {
        mutate(
          stampTypes.map(st => {
            if (newStamp.type_id === st.id) {
              return {
                ...st,
                categories: st.categories.map(c => {
                  if (c.id === newStamp.category_id) {
                    return {
                      ...c,
                      stamps: c.stamps.map(s => {
                        if (s.id === newStamp.id) {
                          return newStamp;
                        }
                        return s;
                      }),
                    };
                  }
                  return c;
                }),
              };
            }
            return st;
          }),
          false,
        );
        api.patch(`/stamps/${newStamp.id}`, newStamp);
        modalStamp.current?.close();
      }
    },
    [mutate, stampTypes],
  );

  const handleSubmitNewStamp = useCallback(
    (newStamp: IStamp) => {
      if (stampTypes) {
        mutate(
          stampTypes.map(st => {
            if (newStamp.type_id === st.id) {
              return {
                ...st,
                categories: st.categories.map(c => {
                  if (newStamp.category_id === c.id) {
                    return {
                      ...c,
                      stamps: [...c.stamps, newStamp],
                    };
                  }
                  return c;
                }),
              };
            }
            return st;
          }),
          false,
        );
        api.post('/stamps', newStamp);
      }
    },
    [mutate, stampTypes],
  );

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

  const handleRemoveStampCategory = useCallback(
    (idStampType, idStampCategory) => {
      mutate(
        stampTypes?.map(st => {
          if (st.id === idStampType) {
            return {
              ...st,
              categories: st.categories.filter(c => c.id !== idStampCategory),
            };
          }
          return st;
        }),

        false,
      );
      api.delete(`/stampCategories/${idStampCategory}`);
    },
    [mutate, stampTypes],
  );

  const handleEditStampCategory = useCallback(
    (stampCategory: IStampCategory) => {
      setNewStateModalStampCategory(false);
      setStampCategorySelected(stampCategory);
      modalStampCategory.current?.open();
    },
    [],
  );

  const handleRemoveStamp = useCallback(
    (idStampType, idStampCategory, idStamp) => {
      mutate(
        stampTypes?.map(st => {
          if (st.id === idStampType) {
            return {
              ...st,
              categories: st.categories.map(c => {
                if (c.id === idStampCategory) {
                  return {
                    ...c,
                    stamps: c.stamps.filter(s => s.id !== idStamp),
                  };
                }
                return c;
              }),
            };
          }
          return st;
        }),

        false,
      );
      api.delete(`/stamps/${idStamp}`);
    },
    [mutate, stampTypes],
  );

  const handleEditStamp = useCallback((stamp: IStamp) => {
    setNewStateModalStamp(false);
    setStampSelected(stamp);
    modalStamp.current?.open();
  }, []);

  if (!stampTypes) {
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
    <StampContext.Provider
      value={{
        stampTypes,
        stampTypeSelected,
        setStampTypeSelected,
        stampCategorySelected,
        setStampCategorySelected,
        handleRemoveStampType,
        handleEditStampType,
        handleRemoveStampCategory,
        handleEditStampCategory,
        handleRemoveStamp,
        handleEditStamp,
      }}
    >
      <Container>
        <Header>
          <h1>Carimbos</h1>
          <a href="/stamps" target="_blank">
            Link Público
          </a>
        </Header>
        <Main>
          <div className="Stamps">
            <FormNewStamp
              onSubmit={handleSubmitNewStamp}
              onClickNewStampType={() => {
                setNewStateModalStampType(true);
                modalStampType.current?.open();
              }}
              onClickNewStampCategory={() => {
                setNewStateModalStampCategory(true);
                modalStampCategory.current?.open();
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
        <FormStampType
          onSubmit={handleSubmitStampType}
          onCancel={() => modalStampType.current?.close()}
          initialData={stampTypeSelected}
          edit={!newStateModalStampType}
        />
      </Modal>
      <Modal ref={modalStampCategory} size="md">
        <FormStampCategory
          onSubmit={handleSubmitStampCategory}
          onCancel={() => modalStampCategory.current?.close()}
          initialData={stampCategorySelected}
          edit={!newStateModalStampCategory}
        />
      </Modal>
      <Modal ref={modalStamp} size="md">
        <FormStamp
          onSubmit={handleSubmitStamp}
          onCancel={() => modalStamp.current?.close()}
          initialData={stampSelected}
          edit={!newStateModalStamp}
        />
      </Modal>
    </StampContext.Provider>
  );
};

export default Stamps;
