/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState, useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdContentCopy } from 'react-icons/md';
import copy from 'copy-to-clipboard';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import { useFetch } from '../../hooks/fetch';
import { IStamp, IStampCategory, IStampType } from '../Stamps';

import { Container, Header } from './styles';
import InputOnly from '../../components/InputOnly';
import { useToast } from '../../hooks/toast';

interface IOrderBy {
  fieldName: string;
  ascendant: boolean;
}

type StampExport = IStamp & {
  type: IStampType;
  category: IStampCategory;
};

const StampsList: React.FC = () => {
  const { data: stampTypes, mutate } = useFetch<IStampType[]>('/stampTypes');
  const [inputFilter, setInputFilter] = useState('');
  const [stampsToDisplay, setStampsToDisplay] = useState<StampExport[]>([]);
  const [clipboard, setClipboard] = useState('');
  const { addToast } = useToast();

  const stamps = useMemo(() => {
    return stampTypes?.reduce(
      (accT, t) =>
        (accT = accT.concat(
          t.categories.reduce(
            (accC, c) =>
              (accC = accC.concat(
                c.stamps.map(s => ({
                  ...s,
                  type: t,
                  category: c,
                })),
              )),
            [] as StampExport[],
          ),
        )),
      [] as StampExport[],
    );
  }, [stampTypes]);

  const stampsFiltered = useMemo(() => {
    if (!inputFilter) return stamps;
    return stamps?.filter(
      s =>
        s.type.name.toLowerCase().includes(inputFilter.toLowerCase()) ||
        s.category.name.toLowerCase().includes(inputFilter.toLowerCase()) ||
        s.cod.toLowerCase().includes(inputFilter.toLowerCase()) ||
        s.description.toLowerCase().includes(inputFilter.toLowerCase()),
    );
  }, [stamps, inputFilter]);

  const handleCopy = useCallback(
    (textToCopy: string) => {
      copy(textToCopy);
      addToast({
        type: 'success',
        title: 'Copiado para área de transferencia',
      });
    },
    [addToast],
  );

  if (!stampTypes) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>Carimbos</h1>
        <InputOnly
          name="search"
          icon={FiSearch}
          onChange={e => setInputFilter(e.target.value)}
        />
      </Header>

      <Table>
        <thead>
          <tr className="Header">
            <th style={{ width: '15%' }}>
              <span>TIPO</span>
            </th>
            <th style={{ width: '15%' }}>
              <span>CATEGORIA</span>
            </th>
            <th style={{ width: '10%' }}>
              <span>CÓDIGO</span>
            </th>
            <th style={{ width: '50%' }}>
              <span>DESCRIÇÃO</span>
            </th>
            <th style={{ width: '10%', color: 'transparent' }}>
              <span>.</span>
            </th>
          </tr>
        </thead>
        {!stamps && (
          <tbody>
            <tr>
              <td colSpan={4}>Carregando ...</td>
            </tr>
          </tbody>
        )}
        {stamps && !stamps.length && (
          <tbody>
            <tr>
              <td colSpan={4}>Nenhum carimbo cadastrado</td>
            </tr>
          </tbody>
        )}
        <tbody>
          {stampsFiltered?.map(stamp => (
            <tr key={stamp.id}>
              <td>{stamp.type.name}</td>
              <td>{stamp.category.name}</td>
              <td>{stamp.cod}</td>
              <td>{stamp.description}</td>
              <td>
                <MdContentCopy
                  onClick={() =>
                    handleCopy(`${stamp.cod} ${stamp.description}`)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default StampsList;
