/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { format } from 'date-fns';

import { Container } from './styles';
import api from '../../../../services/api';
import Badge from '../../../../components/Badge';
import Modal, { IModalHandles } from '../../../../components/Modal';
import TPDetails from '../TPDetails';
import Spinner from '../../../../components/Spinner';
import { ITP } from '../..';
import ExpansionPainel from '../../../../components/ExpansionPainel';

interface IProps {
  summaryTitle: string;
  summaryIds: number[];
}

interface IResponse {
  [key: string]: {
    [key: string]: ITP[];
  };
}

const TPsSummary: React.FC<IProps> = ({
  summaryTitle: title,
  summaryIds: ids,
}) => {
  const [group, setGroup] = useState<IResponse>();
  const [loading, setLoading] = useState(false);
  const [TPSelected, setTPSelected] = useState<ITP>();
  const modalTPDetails = useRef<IModalHandles>();

  const handleLoadGroup = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.post<IResponse>('/tps/ids', {
        ids,
      });
      setGroup(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [ids]);

  const handleOpenTPDetails = useCallback(async (tp: ITP) => {
    setTPSelected(tp);
    modalTPDetails.current?.open();
  }, []);

  const sumOfProjects = useMemo(() => {
    if (!group) return 0;
    return Object.entries(group).reduce(
      (acc, [, valuesP]) => (acc += Object.keys(valuesP).length),
      0,
    );
  }, [group]);

  useEffect(() => {
    handleLoadGroup();
  }, [handleLoadGroup]);

  if (!group) {
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
          <Badge value={sumOfProjects} />
        </header>

        <h4>Projetos</h4>

        {Object.entries(group).map(([project, valueP]) => (
          <ExpansionPainel
            key={project}
            title={project}
            titleColor="white"
            preTitle={`${Object.keys(valueP).length}`}
          >
            {Object.entries(valueP).map(([date, TPs]) => (
              <ExpansionPainel key={date} title={date} titleColor="white" clean>
                <div className="Table">
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: '5%' }}>TP</th>
                        <th style={{ width: '12%' }}>DATA PREVISTA</th>
                        <th style={{ width: '30%' }}>PROJETO</th>
                        <th style={{ width: '20%' }}>EQUIPAMENTO</th>
                        <th style={{ width: '16%' }}>LOCALIDADE</th>
                        {title === 'Em Aprovação' ? (
                          <th style={{ width: '17%' }}>STATUS</th>
                        ) : (
                          <th style={{ width: '17%' }}>CARIMBO BAIXA</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {TPs.map(tp => (
                        <tr key={tp.id} onClick={() => handleOpenTPDetails(tp)}>
                          <td>{tp.id}</td>
                          <td>
                            {format(
                              new Date(tp.dataInicioPrevisto),
                              'dd/MMM/u',
                            )}
                          </td>
                          <td>{tp.projeto}</td>
                          <td>
                            {tp.equipamentos
                              .map(equipamento => equipamento.hostname)
                              .join(', ')}
                          </td>
                          <td>{tp.localidade}</td>
                          {title === 'Em Aprovação' ? (
                            <td>{tp.status.nome}</td>
                          ) : (
                            <td>{tp.baixa?.carimbo?.categoria}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ExpansionPainel>
            ))}
          </ExpansionPainel>
        ))}
      </Container>
      <Modal ref={modalTPDetails} size="md">
        {TPSelected ? <TPDetails id={TPSelected.id} /> : null}
      </Modal>
    </>
  );
};

export default TPsSummary;
