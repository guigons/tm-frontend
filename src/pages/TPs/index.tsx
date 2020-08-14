import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FiFilter, FiRefreshCcw } from 'react-icons/fi';
import { IoMdArrowDropdown, IoMdTime } from 'react-icons/io';
import { format } from 'date-fns';
import { Form } from '@unform/web';
import {
  Container,
  Header,
  Cards,
  FilaHeader,
  Filas,
  Fila,
  Card,
  OptionsContainer,
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
  const [summaryIds, setSummaryIds] = useState<number[]>();
  const [summaryTitle, setSummaryTitle] = useState<string>();
  const [period, setPeriod] = useState('1');
  const modalMinhasFilas = useRef<IModalHandles>();
  const modalTPsSummary = useRef<IModalHandles>();

  const { data: TPGroups, error, isValidating, revalidate } = useFetch<
    IResponseSigitmGrupos
  >(`/tps/group?daysBefore=${period}`, {
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
                >
                  <Option value="1" label="Último dia">
                    Último dia
                  </Option>
                  <Option value="7" label="Últimos 7 dias">
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
          <Card
            onClick={() =>
              handleOpenSummary(
                'Devolvidos',
                TPGroups ? TPGroups.devolvidos.ids : [],
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
                    {TPGroups.devolvidos?.count}
                    {TPGroups.total ? (
                      <span>
                        {TPGroups.total === 0
                          ? 0
                          : (
                              (TPGroups.devolvidos?.count * 100) /
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
              handleOpenSummary(
                'Flexibilizados',
                TPGroups ? TPGroups.flexibilizados.ids : [],
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
                    {TPGroups.flexibilizados?.count}
                    <span>
                      {TPGroups.total === 0
                        ? 0
                        : (
                            (TPGroups.flexibilizados?.count * 100) /
                            TPGroups.total
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
                'Executadas',
                TPGroups ? TPGroups.fechados.executados.ids : [],
              )
            }
          >
            {!TPGroups ? (
              <Spinner />
            ) : (
              <>
                <div>
                  <span>Executadas</span>
                </div>
                <div>
                  <strong>
                    {TPGroups.fechados?.executados.count}
                    <span>
                      {TPGroups.fechados.total === 0
                        ? 0
                        : (
                            (TPGroups.fechados?.executados.count * 100) /
                            TPGroups.fechados.total
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
                'Fechamentos Parciais',
                TPGroups ? TPGroups.fechados.parcial.ids : [],
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
                    {TPGroups.fechados?.parcial.count}
                    <span>
                      {TPGroups.fechados.total === 0
                        ? 0
                        : (
                            (TPGroups.fechados?.parcial.count * 100) /
                            TPGroups.fechados.total
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
                'Fechamentos Com Rollback',
                TPGroups ? TPGroups.fechados.rollback.ids : [],
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
                    {TPGroups.fechados?.rollback.count}
                    <span>
                      {TPGroups.fechados.total === 0
                        ? 0
                        : (
                            (TPGroups.fechados?.rollback.count * 100) /
                            TPGroups.fechados.total
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
                'Fechamentos com Incidências',
                TPGroups ? TPGroups.fechados.incidencia.ids : [],
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
                    {TPGroups.fechados?.incidencia.count}
                    <span>
                      {TPGroups.fechados.total === 0
                        ? 0
                        : (
                            (TPGroups.fechados?.incidencia.count * 100) /
                            TPGroups.fechados.total
                          ).toFixed(0)}
                      %
                    </span>
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
        {TPGroups ? (
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
