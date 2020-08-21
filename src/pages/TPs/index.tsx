import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FiFilter, FiRefreshCcw } from 'react-icons/fi';
import { format } from 'date-fns';
import { Form } from '@unform/web';
import {
  Container,
  Header,
  FilaHeader,
  Filas,
  Fila,
  Cards,
  Card,
  BeforeActivity,
  AfterActivity,
} from './styles';
import Badge from '../../components/Badge';
import Chip from '../../components/Chip';
import { usePreferences } from '../../hooks/preferences';
import Modal, { IModalHandles } from '../../components/Modal';
import MinhasFilasTP from './components/MinhasFilasTP';
import Spinner from '../../components/Spinner';
import { useToast } from '../../hooks/toast';
import TPsSummary from './components/TPsSummary';
import { useFetch } from '../../hooks/fetch';
import Select from '../../components/Select';
import Option from '../../components/Select/Option';
import Bracket from '../../components/Bracket';

export interface ITP {
  id: number;
  raiz: number;
  localidade: string;
  areaNome: string;
  gerencia: string;
  escritorio: string;
  projeto: string;
  descricao: string;
  executorResponsavel: string;
  executorTelefone: string;
  executorAreaEmpresa: string;
  dataCriacao: string;
  dataInicioPrevisto: string;
  dataFimPrevisto: string;
  dataInicioPrevistoAfetacao: string;
  dataFimPrevistoAfetacao: string;
  dataInicioExecutada: string;
  dataFimExecutada: string;
  dataInicioExecutadaAfetacao: string;
  dataFimExecutadaAfetacao: string;
  dataRollback: string;
  dataEncerramento: string;
  ocorrencia: string;
  conclusao: string;
  justificativa: string;
  status: {
    id: number;
    nome: string;
  };
  impacto: {
    id: number;
    nome: string;
  };
  atividade: {
    id: number;
    nome: string;
  };
  rede: {
    id: number;
    nome: string;
    tipo: {
      id: number;
      nome: string;
    };
  };
  tipoPlanta: {
    id: number;
    nome: string;
  };
  tipoTrabalho: {
    id: number;
    nome: string;
  };
  empresa: {
    id: number;
    nome: string;
  };
  tipoAfetacao: {
    id: number;
    nome: string;
  };
  motivo: {
    id: number;
    nome: string;
  };
  criador: {
    id: number;
    nome: string;
    status: number;
  };
  criadorGrupo: {
    id: number;
    nome: string;
    status: number;
  };
  responsavel: null;
  fila: {
    id: number;
    nome: string;
    status: number;
  };
  encerrador: {
    id: number;
    nome: string;
    status: number;
  };
  encerradorGrupo: {
    id: number;
    nome: string;
    status: number;
  };
  dadosIP: null;
  baixa: {
    id: number;
    tp_id: number;
    data: string;
    descricao: string;
    incidencia: string;
    rollback: string;
    prazo: string;
    impacto: string;
    carimbo: {
      codigo: string;
      data: string;
      tipo: string;
      categoria: string;
      descrição: string;
    };
  };
  ciente: {
    id: number;
    tp_id: number;
    data: string;
    usuario: {
      id: number;
      nome: string;
      status: number;
    };
    grupo: {
      id: number;
      nome: string;
      status: number;
    };
  };
  historicos: [
    {
      id: number;
      ta_id: number;
      data: string;
      texto: string;
      usuario_id: number;
      grupo_id: number;
      usuario: {
        id: number;
        nome: string;
        status: number;
      };
      grupo: {
        id: number;
        nome: string;
        status: number;
      };
    },
  ];
  carimbos: [
    {
      codigo: string;
      data: string;
      tipo: string;
      categoria: string;
      descrição: string;
    },
  ];
  equipamentos: {
    id: string;
    hostname: string;
    fabricante: string;
    modelo: string;
  }[];
}

interface ICounter {
  numberOfProjects: number;
  ids: number[];
}

interface ITPCounter {
  total: ICounter;
  pendentePermissao: ICounter;
  pendenteOM: ICounter;
  aprovacao: ICounter;
  autorizados: ICounter;
  emExecucao: ICounter;
  foraDoPrazo: ICounter;
  preBaixa: ICounter;
  cancelados: ICounter;
  fechados: ICounter;
  naoExecutados: ICounter;
  devolvidos: ICounter;
  flexibilizados: ICounter;
  posJanela: {
    total: ICounter;
    executados: ICounter;
    cancelados: ICounter;
    rollback: ICounter;
    parcial: ICounter;
    naoExecutado: ICounter;
    incidencia: ICounter;
    naoClassificado: ICounter;
  };
}

interface ITPGroup {
  grupoResponsavel: string;
  counters: ITPCounter;
}

interface IResponseSigitmGrupos {
  groups: ITPGroup[];
  counters: ITPCounter;
}

const TPs: React.FC = () => {
  const [summaryIds, setSummaryIds] = useState<number[]>();
  const [summaryTitle, setSummaryTitle] = useState<string>();
  const [period, setPeriod] = useState('0');
  const modalMinhasFilas = useRef<IModalHandles>();
  const modalTPsSummary = useRef<IModalHandles>();

  const { data: TPGroups, error, isValidating, revalidate } = useFetch<
    IResponseSigitmGrupos
  >(`/tps/group?daysBefore=${period}&daysAfter=1`, {
    refreshInterval: 60000 * 5,
    revalidateOnFocus: true,
    errorRetryCount: 0,
    errorRetryInterval: 3000,
  });

  const { preferences } = usePreferences();

  const { addToast } = useToast();

  if (error) {
    console.log(error);
    addToast({
      type: 'error',
      title: 'Erro na Bridge',
      description: 'Falha de comunicação com a base do SIGITM',
    });
  }

  const handleOpenSummary = useCallback(
    (sumTitle: string, sumIds: number[]) => {
      setSummaryTitle(sumTitle);
      setSummaryIds(sumIds);
      modalTPsSummary.current?.open();
    },
    [],
  );

  interface IFormData {
    campo1: string;
    campo2: string;
  }

  useEffect(() => {
    revalidate();
  }, [preferences.filas_tps, revalidate]);

  return (
    <>
      <Container>
        <Header>
          <div className="BarLeft">
            <h1>Visão Geral</h1>
          </div>
          <div className="BarRight">
            {isValidating ? (
              <Chip text="Atualizando ..." withoutClose />
            ) : (
              <Chip
                text={`Atualizado em ${format(new Date(), 'dd/MMM HH:mm')}`}
                withoutClose
              />
            )}
            {/* <Chip text="Últimos 7 dias" withoutClose /> */}
            <div className="Period">
              {/* <h1>Últimos 7 dias</h1>
              <SuspensePainel icon={IoMdArrowDropdown}>
                <OptionsContainer> */}
              {/* <button type="button" onClick={() => {}}>
                    <IoMdTime size={18} />
                    <h1>Últimos 7 dias</h1>
                  </button> */}
              <Form onSubmit={() => {}} initialData={{ period }}>
                <Select
                  name="period"
                  className="SelectPeriod"
                  value={period}
                  onChange={value => setPeriod(value)}
                  clean
                >
                  <Option value="0" label="Hoje">
                    Hoje
                  </Option>
                  <Option value="6" label="Últimos 7 dias">
                    Últimos 7 dias
                  </Option>
                </Select>
              </Form>

              {/* </OptionsContainer>
              </SuspensePainel> */}
            </div>

            <button type="button" onClick={revalidate}>
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
          <BeforeActivity>
            <Bracket title="Ciclo de Vida" />
            <div className="Cards">
              <Card
                onClick={() =>
                  handleOpenSummary(
                    'Devolvidos',
                    TPGroups ? TPGroups.counters.devolvidos.ids : [],
                  )
                }
              >
                {!TPGroups ? (
                  <Spinner />
                ) : (
                  <>
                    <div>
                      <span>Devolvidas</span>
                    </div>
                    <div>
                      <strong>
                        {TPGroups.counters.devolvidos?.numberOfProjects}
                        {TPGroups.counters.total ? (
                          <span>
                            {TPGroups.counters.total.numberOfProjects === 0
                              ? 0
                              : (
                                  (TPGroups.counters.devolvidos
                                    ?.numberOfProjects *
                                    100) /
                                  TPGroups.counters.total.numberOfProjects
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
                    'Flexibilizados',
                    TPGroups ? TPGroups.counters.flexibilizados.ids : [],
                  )
                }
              >
                {!TPGroups ? (
                  <Spinner />
                ) : (
                  <>
                    <div>
                      <span>Flexibilizadas</span>
                    </div>
                    <div>
                      <strong>
                        {TPGroups.counters.flexibilizados?.numberOfProjects}
                        <span>
                          {TPGroups.counters.total.numberOfProjects === 0
                            ? 0
                            : (
                                (TPGroups.counters.flexibilizados
                                  ?.numberOfProjects *
                                  100) /
                                TPGroups.counters.total.numberOfProjects
                              ).toFixed(0)}
                          %
                        </span>
                      </strong>
                    </div>
                  </>
                )}
              </Card>
            </div>
          </BeforeActivity>
          <AfterActivity>
            <Bracket title="Baixas" />
            <div className="Cards">
              <Card
                onClick={() =>
                  handleOpenSummary(
                    'Executadas',
                    TPGroups ? TPGroups.counters.posJanela?.executados.ids : [],
                  )
                }
              >
                {!TPGroups ? (
                  <Spinner />
                ) : (
                  <>
                    <div>
                      <span>Sucesso</span>
                    </div>
                    <div>
                      <strong>
                        {
                          TPGroups.counters.posJanela?.executados
                            .numberOfProjects
                        }
                        <span>
                          {TPGroups.counters.posJanela.total
                            .numberOfProjects === 0
                            ? 0
                            : (
                                (TPGroups.counters.posJanela?.executados
                                  .numberOfProjects *
                                  100) /
                                TPGroups.counters.posJanela.total
                                  .numberOfProjects
                              ).toFixed(0)}
                          %
                        </span>
                      </strong>
                    </div>
                  </>
                )}
              </Card>
              <Card
                onClick={() =>
                  handleOpenSummary(
                    'Baixas Parciais',
                    TPGroups ? TPGroups.counters.posJanela.parcial.ids : [],
                  )
                }
              >
                {!TPGroups ? (
                  <Spinner />
                ) : (
                  <>
                    <div>
                      <span>Parcial</span>
                    </div>
                    <div>
                      <strong>
                        {TPGroups.counters.posJanela?.parcial.numberOfProjects}
                        <span>
                          {TPGroups.counters.posJanela.total
                            .numberOfProjects === 0
                            ? 0
                            : (
                                (TPGroups.counters.posJanela?.parcial
                                  .numberOfProjects *
                                  100) /
                                TPGroups.counters.posJanela.total
                                  .numberOfProjects
                              ).toFixed(0)}
                          %
                        </span>
                      </strong>
                    </div>
                  </>
                )}
              </Card>
              <Card
                onClick={() =>
                  handleOpenSummary(
                    'Baixas Com Rollback',
                    TPGroups ? TPGroups.counters.posJanela.rollback.ids : [],
                  )
                }
              >
                {!TPGroups ? (
                  <Spinner />
                ) : (
                  <>
                    <div>
                      <span>Rollbacks</span>
                    </div>
                    <div>
                      <strong>
                        {TPGroups.counters.posJanela?.rollback.numberOfProjects}
                        <span>
                          {TPGroups.counters.posJanela.total
                            .numberOfProjects === 0
                            ? 0
                            : (
                                (TPGroups.counters.posJanela?.rollback
                                  .numberOfProjects *
                                  100) /
                                TPGroups.counters.posJanela.total
                                  .numberOfProjects
                              ).toFixed(0)}
                          %
                        </span>
                      </strong>
                    </div>
                  </>
                )}
              </Card>
              <Card
                onClick={() =>
                  handleOpenSummary(
                    'Baixas com Cancelamento',
                    TPGroups ? TPGroups.counters.posJanela.cancelados.ids : [],
                  )
                }
              >
                {!TPGroups ? (
                  <Spinner />
                ) : (
                  <>
                    <div>
                      <span>Cancelados</span>
                    </div>
                    <div>
                      <strong>
                        {
                          TPGroups.counters.posJanela.cancelados
                            .numberOfProjects
                        }
                        <span>
                          {TPGroups.counters.posJanela.total
                            .numberOfProjects === 0
                            ? 0
                            : (
                                (TPGroups.counters.posJanela.cancelados
                                  .numberOfProjects *
                                  100) /
                                TPGroups.counters.posJanela.total
                                  .numberOfProjects
                              ).toFixed(0)}
                          %
                        </span>
                      </strong>
                    </div>
                  </>
                )}
              </Card>
              <Card
                onClick={() =>
                  handleOpenSummary(
                    'Baixas com Incidências',
                    TPGroups ? TPGroups.counters.posJanela.incidencia.ids : [],
                  )
                }
              >
                {!TPGroups ? (
                  <Spinner />
                ) : (
                  <>
                    <div>
                      <span>Incidências</span>
                    </div>
                    <div>
                      <strong>
                        {
                          TPGroups.counters.posJanela.incidencia
                            .numberOfProjects
                        }
                        <span>
                          {TPGroups.counters.posJanela.total
                            .numberOfProjects === 0
                            ? 0
                            : (
                                (TPGroups.counters.posJanela.incidencia
                                  .numberOfProjects *
                                  100) /
                                TPGroups.counters.posJanela.total
                                  .numberOfProjects
                              ).toFixed(0)}
                          %
                        </span>
                      </strong>
                    </div>
                  </>
                )}
              </Card>
            </div>
          </AfterActivity>
        </Cards>

        <FilaHeader>
          <p />
          <ul>
            <li>Criado</li>
            <li>O&M</li>
            <li>GMUD</li>
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
        {TPGroups ? (
          <Filas>
            {TPGroups.groups.length ? (
              TPGroups.groups.map(TPG => (
                <Fila key={TPG.grupoResponsavel}>
                  <p>{TPG.grupoResponsavel}</p>
                  <ul>
                    <li>
                      <Badge
                        value={TPG.counters.pendentePermissao.numberOfProjects}
                        onClick={() =>
                          handleOpenSummary(
                            'Pendente Permissão',
                            TPG.counters.pendentePermissao.ids,
                          )
                        }
                      />
                    </li>
                    <li>
                      <Badge
                        value={TPG.counters.pendenteOM.numberOfProjects}
                        onClick={() =>
                          handleOpenSummary(
                            'Pendente O&M',
                            TPG.counters.pendenteOM.ids,
                          )
                        }
                      />
                    </li>
                    <li>
                      <Badge
                        value={TPG.counters.aprovacao.numberOfProjects}
                        onClick={() =>
                          handleOpenSummary(
                            'Pendente GMUD',
                            TPG.counters.aprovacao.ids,
                          )
                        }
                      />
                    </li>
                    <li>
                      <Badge
                        value={TPG.counters.autorizados.numberOfProjects}
                        onClick={() =>
                          handleOpenSummary(
                            'Autorizado',
                            TPG.counters.autorizados.ids,
                          )
                        }
                      />
                    </li>
                    <li>
                      <Badge
                        value={TPG.counters.emExecucao.numberOfProjects}
                        onClick={() =>
                          handleOpenSummary(
                            'Em Execução',
                            TPG.counters.emExecucao.ids,
                          )
                        }
                      />
                    </li>
                    <li>
                      <Badge
                        value={TPG.counters.foraDoPrazo.numberOfProjects}
                        onClick={() =>
                          handleOpenSummary(
                            'Fora do Prazo',
                            TPG.counters.foraDoPrazo.ids,
                          )
                        }
                      />
                    </li>
                    <li>
                      <Badge
                        value={TPG.counters.preBaixa.numberOfProjects}
                        onClick={() =>
                          handleOpenSummary(
                            'Pré-baixa',
                            TPG.counters.preBaixa.ids,
                          )
                        }
                      />
                    </li>
                    <li>
                      <Badge
                        value={TPG.counters.cancelados.numberOfProjects}
                        onClick={() =>
                          handleOpenSummary(
                            'Cancelado',
                            TPG.counters.cancelados.ids,
                          )
                        }
                      />
                    </li>
                    <li>
                      <Badge
                        value={TPG.counters.fechados.numberOfProjects}
                        onClick={() =>
                          handleOpenSummary(
                            'Fechado',
                            TPG.counters.fechados.ids,
                          )
                        }
                      />
                    </li>
                    <li>
                      <Badge
                        value={TPG.counters.naoExecutados.numberOfProjects}
                        onClick={() =>
                          handleOpenSummary(
                            'Não Executado',
                            TPG.counters.naoExecutados.ids,
                          )
                        }
                      />
                    </li>
                  </ul>
                  <span>
                    <Badge
                      value={TPG.counters.total.numberOfProjects}
                      onClick={() =>
                        handleOpenSummary('Total', TPG.counters.total.ids)
                      }
                    />
                  </span>
                </Fila>
              ))
            ) : (
              <h3>
                * Nenhma preferência definida.
                <p>
                  Clique{' '}
                  <button
                    type="button"
                    onClick={() => modalMinhasFilas.current?.open()}
                  >
                    aqui
                  </button>{' '}
                  para selecionar suas filas.
                </p>
              </h3>
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
