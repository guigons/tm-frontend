import React, { useEffect, useState, useCallback, useRef } from 'react';
import { format } from 'date-fns';

import { Container } from './styles';
import api from '../../../../services/api';
import Badge from '../../../../components/Badge';
import Modal, { IModalHandles } from '../../../../components/Modal';
import TPDetails from '../TPDetails';
import Spinner from '../../../../components/Spinner';

interface IProps {
  summaryTitle: string;
  summaryIds: number[];
}

interface ITPSummary {
  id: string;
  dataInicioPrevisto: Date;
  criador: {
    id: number;
    nome: string;
    status: number;
  };
  localidade: string;
  projeto: string;
}

const TPsSummary: React.FC<IProps> = ({
  summaryTitle: title,
  summaryIds: ids,
}) => {
  const [TPs, setTPs] = useState<ITPSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [TPSelected, setTPSelected] = useState<ITPSummary>();
  const modalTPDetails = useRef<IModalHandles>();

  const handleLoadTPs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.post<ITPSummary[]>('/tps/ids', {
        ids,
      });
      setTPs(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [ids]);

  const handleOpenTPDetails = useCallback(async (tp: ITPSummary) => {
    setTPSelected(tp);
    modalTPDetails.current?.open();
  }, []);

  useEffect(() => {
    handleLoadTPs();
  }, [handleLoadTPs]);

  return (
    <>
      <Container>
        <header>
          <h1>{title}</h1>
          <Badge value={ids.length} />
        </header>
        <div className="Table">
          {loading ? (
            <Spinner />
          ) : (
            <table>
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>TP</th>
                  <th style={{ width: '15%' }}>DATA PREVISTA</th>
                  <th style={{ width: '25%' }}>CRIADOR</th>
                  <th style={{ width: '30%' }}>PROJETO</th>
                  <th style={{ width: '25%' }}>LOCALIDADE</th>
                </tr>
              </thead>
              <tbody>
                {TPs.map(tp => (
                  <tr key={tp.id} onClick={() => handleOpenTPDetails(tp)}>
                    <td>{tp.id}</td>
                    <td>
                      {format(new Date(tp.dataInicioPrevisto), 'dd/MMM/u')}
                    </td>
                    <td>{tp.criador.nome}</td>
                    <td>{tp.projeto}</td>
                    <td>{tp.localidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Container>
      <Modal ref={modalTPDetails} size="md">
        {TPSelected ? <TPDetails id={TPSelected.id} /> : null}
      </Modal>
    </>
  );
};

export default TPsSummary;
