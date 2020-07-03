import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiFilter, FiRefreshCcw } from 'react-icons/fi';
import {
  Container,
  Header,
  Cards,
  FilaHeader,
  Filas,
  Fila,
  Card,
} from './styles';
import Badge from '../../components/Badge';
import Spinner from '../../components/Spinner';
import api from '../../services/api';
import { usePreferences } from '../../hooks/preferences';
import Modal, { IModalHandles } from '../../components/Modal';
import MinhasFilasTA from './components/MinhasFilasTA';
import { useToast } from '../../hooks/toast';

interface ITAGroupItem {
  time: string;
  count: number;
  ids: number[];
}

interface ITAGroup {
  grupoResponsavel: string;
  data: ITAGroupItem[] | [];
  total: number;
  abertos: number;
  tratamento: number;
  afetacao: number;
}

interface IResponseSigitmGrupos {
  groups: ITAGroup[];
  total: number;
  abertos: number;
  tratamento: number;
  afetacao: number;
}

const TAs: React.FC = () => {
  const [TAGroups, setTAGroups] = useState<IResponseSigitmGrupos>({
    groups: [],
    total: 0,
    abertos: 0,
    tratamento: 0,
    afetacao: 0,
  });
  const [loading, setLoading] = useState(true);

  const modalRef = useRef<IModalHandles>();

  const { preferences } = usePreferences();

  const { addToast } = useToast();

  const handleLoadGroups = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<IResponseSigitmGrupos>('/tas/group');
      setTAGroups(response.data);
    } catch (error) {
      console.log(error);
      addToast({
        type: 'error',
        title: 'Erro na Bridge',
        description: 'Falha de comunicação com a base do SIGITM',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    handleLoadGroups();
  }, [handleLoadGroups]);

  useEffect(() => {
    handleLoadGroups();
  }, [handleLoadGroups, preferences.filas_tas]);

  return (
    <>
      <Container>
        <Header>
          <h1>Visão Geral</h1>
          <div className="Icons">
            <button type="button" onClick={handleRefresh}>
              <FiRefreshCcw size={18} />
            </button>
            <button type="button" onClick={() => modalRef.current?.open()}>
              <FiFilter size={18} />
            </button>
          </div>
        </Header>
        <Cards>
          <Card>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <span>Total</span>
                <strong>{TAGroups.total}</strong>
              </>
            )}
          </Card>
          <Card>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <span>Abertos</span>
                <strong>{TAGroups.abertos}</strong>
              </>
            )}
          </Card>
          <Card>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <span>Em tratamento</span>
                <strong>{TAGroups.tratamento}</strong>
              </>
            )}
          </Card>
          <Card>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <span>Com Afetação</span>
                <strong>{TAGroups.afetacao}</strong>
              </>
            )}
          </Card>
        </Cards>
        <FilaHeader>
          <p />
          <ul>
            <li>+0h</li>
            <li>+12h</li>
            <li>+1d</li>
            <li>+3d</li>
            <li>+7d</li>
            <li>+15d</li>
            <li>+30d</li>
            <li>+60d</li>
            <li>+120d</li>
            <li>+365d</li>
          </ul>

          <span>Total</span>
        </FilaHeader>
        {!loading ? (
          <Filas>
            {TAGroups.groups.length ? (
              TAGroups.groups.map(TAG => (
                <Fila key={TAG.grupoResponsavel}>
                  <p>{TAG.grupoResponsavel}</p>
                  <ul>
                    <li>
                      <Badge value={TAG.data[9].count} />
                    </li>
                    <li>
                      <Badge value={TAG.data[8].count} />
                    </li>
                    <li>
                      <Badge value={TAG.data[7].count} />
                    </li>
                    <li>
                      <Badge value={TAG.data[6].count} />
                    </li>
                    <li>
                      <Badge value={TAG.data[5].count} />
                    </li>
                    <li>
                      <Badge value={TAG.data[4].count} />
                    </li>
                    <li>
                      <Badge value={TAG.data[3].count} />
                    </li>
                    <li>
                      <Badge value={TAG.data[2].count} />
                    </li>
                    <li>
                      <Badge value={TAG.data[1].count} />
                    </li>
                    <li>
                      <Badge value={TAG.data[0].count} />
                    </li>
                  </ul>
                  <span>
                    <Badge value={TAG.total} />
                  </span>
                </Fila>
              ))
            ) : (
              <h3>Nenhuma preferência definida ...</h3>
            )}
          </Filas>
        ) : null}
      </Container>

      <Modal ref={modalRef}>
        <MinhasFilasTA />
      </Modal>
    </>
  );
};

export default TAs;
