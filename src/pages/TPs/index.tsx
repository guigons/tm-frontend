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
import api from '../../services/api';
import { usePreferences } from '../../hooks/preferences';
import Modal, { IModalHandles } from '../../components/Modal';
import MinhasFilasTP from './components/MinhasFilasTP';
import Spinner from '../../components/Spinner';
import { useToast } from '../../hooks/toast';

interface ITPGroupItem {
  time: string;
  count: number;
  ids: number[];
}

interface ITPGroup {
  grupoResponsavel: string;
  data: ITPGroupItem[] | [];
  total: number;
  aprovacao: number;
  autorizados: number;
  emExecucao: number;
  foraDoPrazo: number;
  preBaixa: number;
  cancelados: number;
  devolvidos: number;
  flexibilizados: number;
  naoExecutados: number;
  fechados: {
    executados: number;
    cancelados: number;
    rollback: number;
    parcial: number;
    naoExecutado: number;
    incidencia: number;
    total: number;
  };
}

interface IResponseSigitmGrupos {
  groups: ITPGroup[];
  total: number;
  aprovacao: number;
  autorizados: number;
  emExecucao: number;
  foraDoPrazo: number;
  preBaixa: number;
  cancelados: number;
  devolvidos: number;
  flexibilizados: number;
  naoExecutados: number;
  fechados: {
    executados: number;
    cancelados: number;
    rollback: number;
    parcial: number;
    naoExecutado: number;
    incidencia: number;
    naoClassificado: number;
    total: number;
  };
}

const TPs: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [TPGroups, setTPGroups] = useState<IResponseSigitmGrupos>({
    groups: [],
    total: 0,
    aprovacao: 0,
    autorizados: 0,
    emExecucao: 0,
    foraDoPrazo: 0,
    preBaixa: 0,
    cancelados: 0,
    devolvidos: 0,
    flexibilizados: 0,
    naoExecutados: 0,
    fechados: {
      executados: 0,
      cancelados: 0,
      rollback: 0,
      parcial: 0,
      naoExecutado: 0,
      incidencia: 0,
      naoClassificado: 0,
      total: 0,
    },
  });

  const modalRef = useRef<IModalHandles>();

  const { preferences } = usePreferences();

  const { addToast } = useToast();

  const handleLoadGroups = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<IResponseSigitmGrupos>('/tps/group');
      setTPGroups(response.data);
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
  }, [addToast]);

  const handleRefresh = useCallback(async () => {
    handleLoadGroups();
  }, [handleLoadGroups]);

  useEffect(() => {
    handleLoadGroups();
  }, [handleLoadGroups, preferences.filas_tps]);

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
                <div>
                  <span>Devolvidas</span>
                </div>
                <div>
                  <strong>
                    {TPGroups.devolvidos}
                    {TPGroups.total ? (
                      <span>
                        {((TPGroups.devolvidos * 100) / TPGroups.total).toFixed(
                          0,
                        )}
                        %
                      </span>
                    ) : null}
                  </strong>
                </div>
              </>
            )}
          </Card>
          <Card>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div>
                  <span>Flexibilizadas</span>
                </div>
                <div>
                  <strong>
                    {TPGroups.flexibilizados}
                    {TPGroups.total ? (
                      <span>
                        {(
                          (TPGroups.flexibilizados * 100) /
                          TPGroups.total
                        ).toFixed(0)}
                        %
                      </span>
                    ) : null}
                  </strong>
                </div>
              </>
            )}
          </Card>
          <Card>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div>
                  <span>Executadas</span>
                </div>
                <div>
                  <strong>
                    {TPGroups.fechados.executados}
                    {TPGroups.total ? (
                      <span>
                        {(
                          (TPGroups.fechados.executados * 100) /
                          TPGroups.fechados.total
                        ).toFixed(0)}
                        %
                      </span>
                    ) : null}
                  </strong>
                </div>
              </>
            )}
          </Card>
          <Card>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div>
                  <span>Parcial</span>
                </div>
                <div>
                  <strong>
                    {TPGroups.fechados.parcial}
                    {TPGroups.total ? (
                      <span>
                        {(
                          (TPGroups.fechados.parcial * 100) /
                          TPGroups.fechados.total
                        ).toFixed(0)}
                        %
                      </span>
                    ) : null}
                  </strong>
                </div>
              </>
            )}
          </Card>
          <Card>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div>
                  <span>Rollbacks</span>
                </div>
                <div>
                  <strong>
                    {TPGroups.fechados.rollback}
                    {TPGroups.total ? (
                      <span>
                        {(
                          (TPGroups.fechados.rollback * 100) /
                          TPGroups.fechados.total
                        ).toFixed(0)}
                        %
                      </span>
                    ) : null}
                  </strong>
                </div>
              </>
            )}
          </Card>
          <Card>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div>
                  <span>Incidências</span>
                </div>
                <div>
                  <strong>
                    {TPGroups.fechados.incidencia}
                    {TPGroups.total ? (
                      <span>
                        {(
                          (TPGroups.fechados.incidencia * 100) /
                          TPGroups.fechados.total
                        ).toFixed(0)}
                        %
                      </span>
                    ) : null}
                  </strong>
                </div>
              </>
            )}
          </Card>
        </Cards>
        <FilaHeader>
          <p />
          <ul>
            <li>Em Aprovação</li>
            <li>Autorizado</li>
            <li>Em Execução</li>
            <li>Fora do Prazo</li>
            <li>Pré-baixa</li>
            <li>Cancelado</li>
            <li>Fechado</li>
            <li>Não Executado</li>
          </ul>
          <span>Total</span>
        </FilaHeader>
        {!loading ? (
          <Filas>
            {TPGroups.groups.length ? (
              TPGroups.groups.map(TPG => (
                <Fila key={TPG.grupoResponsavel}>
                  <p>{TPG.grupoResponsavel}</p>
                  <ul>
                    <li>
                      <Badge value={TPG.data[0].count} />
                    </li>
                    <li>
                      <Badge value={TPG.data[1].count} />
                    </li>
                    <li>
                      <Badge value={TPG.data[2].count} />
                    </li>
                    <li>
                      <Badge value={TPG.data[3].count} />
                    </li>
                    <li>
                      <Badge value={TPG.data[4].count} />
                    </li>
                    <li>
                      <Badge value={TPG.data[5].count} />
                    </li>
                    <li>
                      <Badge value={TPG.data[6].count} />
                    </li>
                    <li>
                      <Badge value={TPG.data[7].count} />
                    </li>
                  </ul>
                  <span>
                    <Badge value={TPG.total} />
                  </span>
                </Fila>
              ))
            ) : (
              <h3>Nenhma preferência definida...</h3>
            )}
          </Filas>
        ) : null}
      </Container>

      <Modal ref={modalRef}>
        <MinhasFilasTP />
      </Modal>
    </>
  );
};

export default TPs;
