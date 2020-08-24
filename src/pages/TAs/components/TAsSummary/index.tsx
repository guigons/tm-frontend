/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { format } from 'date-fns';

import { Container } from './styles';
import api from '../../../../services/api';
import Badge from '../../../../components/Badge';
import Modal, { IModalHandles } from '../../../../components/Modal';
import TADetails from '../TADetails';
import Spinner from '../../../../components/Spinner';
import { ITA } from '../..';

interface IProps {
  summaryTitle: string;
  summaryIds: number[];
}

const TAsSummary: React.FC<IProps> = ({
  summaryTitle: title,
  summaryIds: ids,
}) => {
  const [TAs, setTAs] = useState<ITA[]>();
  const [loading, setLoading] = useState(false);
  const [TASelected, setTASelected] = useState<ITA>();
  const modalTADetails = useRef<IModalHandles>();

  const handleLoadGroup = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.post<ITA[]>('/tas/ids', {
        ids,
      });
      setTAs(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [ids]);

  const handleOpenTADetails = useCallback(async (ta: ITA) => {
    setTASelected(ta);
    modalTADetails.current?.open();
  }, []);

  useEffect(() => {
    handleLoadGroup();
  }, [handleLoadGroup]);

  if (!TAs) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <>
      <Container>
        <header>
          <h1>{title}</h1>
          <Badge value={TAs.length} />
        </header>

        <div className="Table">
          <table>
            <thead>
              <tr>
                <th style={{ width: '5%' }}>TA</th>
                <th style={{ width: '12%' }}>DATA CRIAÇÃO</th>
                {/* <th style={{ width: '15%' }}>BILHETE</th> */}
                <th style={{ width: '20%' }}>TIPO ALARME</th>
                <th style={{ width: '20%' }}>REDE</th>
                <th style={{ width: '18%' }}>LOCALIDADE</th>
                <th style={{ width: '25%' }}>EQUIPAMENTO</th>
              </tr>
            </thead>
            <tbody>
              {TAs.map(ta => (
                <tr key={ta.id} onClick={() => handleOpenTADetails(ta)}>
                  <td>{ta.id}</td>
                  <td>{format(new Date(ta.dataCriacao), 'dd/MMM/u')}</td>
                  {/* <td>{ta.tipoBilhete}</td> */}
                  <td>{ta.alarmeTipo}</td>
                  <td>{`${ta.rede.tipo.nome} ${ta.rede.nome}`}</td>
                  <td>{ta.regiao}</td>
                  <td>
                    {ta.equipamentos
                      .map(equipamento => equipamento.hostname)
                      .join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
      <Modal ref={modalTADetails} size="md">
        {TASelected ? <TADetails id={TASelected.id} /> : null}
      </Modal>
    </>
  );
};

export default TAsSummary;
