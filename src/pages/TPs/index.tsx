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
import TPsSummary from './components/TPsSummary';

export interface ITPGroupItem {
  time: string;
  count: number;
  ids: number[];
}

export interface ITPGroup {
  grupoResponsavel: string;
  data: ITPGroupItem[] | [];
  total: number;
  aprovacao: number;
  autorizados: number;
  emExecucao: number;
  foraDoPrazo: number;
  preBaixa: number;
  cancelados: number;
  devolvidos: {
    count: number;
    ids: number[];
  };
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
  devolvidos: {
    count: number;
    ids: number[];
  };
  flexibilizados: {
    count: number;
    ids: [];
  };
  naoExecutados: number;
  fechados: {
    executados: {
      count: number;
      ids: [];
    };
    cancelados: number;
    rollback: {
      count: number;
      ids: [];
    };
    parcial: {
      count: number;
      ids: [];
    };
    naoExecutado: number;
    incidencia: {
      count: number;
      ids: [];
    };
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
    devolvidos: {
      count: 0,
      ids: [],
    },
    flexibilizados: {
      count: 0,
      ids: [],
    },
    naoExecutados: 0,
    fechados: {
      executados: {
        count: 0,
        ids: [],
      },
      cancelados: 0,
      rollback: {
        count: 0,
        ids: [],
      },
      parcial: {
        count: 0,
        ids: [],
      },
      naoExecutado: 0,
      incidencia: {
        count: 0,
        ids: [],
      },
      naoClassificado: 0,
      total: 0,
    },
  });
  const [summaryIds, setSummaryIds] = useState<number[]>();
  const [summaryTitle, setSummaryTitle] = useState<string>();
  const modalMinhasFilas = useRef<IModalHandles>();
  const modalTPsSummary = useRef<IModalHandles>();

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

  const handleOpenSummary = useCallback(
    (sumTitle: string, sumIds: number[]) => {
      setSummaryTitle(sumTitle);
      setSummaryIds(sumIds);
      modalTPsSummary.current?.open();
    },
    [],
  );

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
            <button
              type="button"
              onClick={() => modalMinhasFilas.current?.open()}
            >
              <FiFilter size={18} />
            </button>
          </div>
        </Header>
        <Cards>
          <Card
            onClick={() =>
              handleOpenSummary('Devolvidos', TPGroups.devolvidos.ids)
            }
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div>
                  <span>Devolvidas</span>
                </div>
                <div>
                  <strong>
                    {TPGroups.devolvidos.count}
                    {TPGroups.total ? (
                      <span>
                        {(
                          (TPGroups.devolvidos.count * 100) /
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
          <Card
            onClick={() =>
              handleOpenSummary('Flexibilizados', TPGroups.flexibilizados.ids)
            }
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div>
                  <span>Flexibilizadas</span>
                </div>
                <div>
                  <strong>
                    {TPGroups.flexibilizados.count}
                    {TPGroups.total ? (
                      <span>
                        {(
                          (TPGroups.flexibilizados.count * 100) /
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
          <Card
            onClick={() =>
              handleOpenSummary('Executadas', TPGroups.fechados.executados.ids)
            }
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div>
                  <span>Executadas</span>
                </div>
                <div>
                  <strong>
                    {TPGroups.fechados.executados.count}
                    {TPGroups.total ? (
                      <span>
                        {(
                          (TPGroups.fechados.executados.count * 100) /
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
          <Card
            onClick={() =>
              handleOpenSummary(
                'Fechamentos Parciais',
                TPGroups.fechados.parcial.ids,
              )
            }
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div>
                  <span>Parcial</span>
                </div>
                <div>
                  <strong>
                    {TPGroups.fechados.parcial.count}
                    {TPGroups.total ? (
                      <span>
                        {(
                          (TPGroups.fechados.parcial.count * 100) /
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
          <Card
            onClick={() =>
              handleOpenSummary(
                'Fechamentos Com Rollback',
                TPGroups.fechados.rollback.ids,
              )
            }
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div>
                  <span>Rollbacks</span>
                </div>
                <div>
                  <strong>
                    {TPGroups.fechados.rollback.count}
                    {TPGroups.total ? (
                      <span>
                        {(
                          (TPGroups.fechados.rollback.count * 100) /
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
          <Card
            onClick={() =>
              handleOpenSummary(
                'Fechamentos com Incidências',
                TPGroups.fechados.incidencia.ids,
              )
            }
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div>
                  <span>Incidências</span>
                </div>
                <div>
                  <strong>
                    {TPGroups.fechados.incidencia.count}
                    {TPGroups.total ? (
                      <span>
                        {(
                          (TPGroups.fechados.incidencia.count * 100) /
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
                      <Badge
                        value={TPG.data[0].count}
                        onClick={() =>
                          handleOpenSummary('Em Aprovação', TPG.data[0].ids)
                        }
                      />
                    </li>
                    <li>
                      <Badge
                        value={TPG.data[1].count}
                        onClick={() =>
                          handleOpenSummary('Autorizado', TPG.data[1].ids)
                        }
                      />
                    </li>
                    <li>
                      <Badge
                        value={TPG.data[2].count}
                        onClick={() =>
                          handleOpenSummary('Em Execução', TPG.data[2].ids)
                        }
                      />
                    </li>
                    <li>
                      <Badge
                        value={TPG.data[3].count}
                        onClick={() =>
                          handleOpenSummary('Fora do Prazo', TPG.data[3].ids)
                        }
                      />
                    </li>
                    <li>
                      <Badge
                        value={TPG.data[4].count}
                        onClick={() =>
                          handleOpenSummary('Pré-baixa', TPG.data[4].ids)
                        }
                      />
                    </li>
                    <li>
                      <Badge
                        value={TPG.data[5].count}
                        onClick={() =>
                          handleOpenSummary('Cancelado', TPG.data[5].ids)
                        }
                      />
                    </li>
                    <li>
                      <Badge
                        value={TPG.data[6].count}
                        onClick={() =>
                          handleOpenSummary('Fechado', TPG.data[6].ids)
                        }
                      />
                    </li>
                    <li>
                      <Badge
                        value={TPG.data[7].count}
                        onClick={() =>
                          handleOpenSummary('Não Executado', TPG.data[7].ids)
                        }
                      />
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

      <Modal ref={modalMinhasFilas}>
        <MinhasFilasTP />
      </Modal>

      <Modal ref={modalTPsSummary} size="lg">
        {summaryIds && summaryTitle ? (
          <TPsSummary summaryIds={summaryIds} summaryTitle={summaryTitle} />
        ) : null}
      </Modal>
    </>
  );
};

export default TPs;
