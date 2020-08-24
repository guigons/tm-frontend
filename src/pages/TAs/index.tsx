import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiFilter, FiRefreshCcw } from 'react-icons/fi';
import { format } from 'date-fns';
import stc from 'string-to-color';
import {
  Container,
  Header,
  Cards,
  FilaHeader,
  Filas,
  Fila,
  Card,
} from './styles';
import Chip from '../../components/Chip';
import Badge from '../../components/Badge';
import Spinner from '../../components/Spinner';
import { usePreferences } from '../../hooks/preferences';
import Modal, { IModalHandles } from '../../components/Modal';
import MinhasFilasTA from './components/MinhasFilasTA';
import { useToast } from '../../hooks/toast';
import { useFetch } from '../../hooks/fetch';
import TAsSummary from './components/TAsSummary';

export interface ITA {
  id: number;
  raiz: number;
  severidade: number;
  regiao: string;
  dataCriacao: Date;
  dataEncerramento: Date;
  tipoBilhete: string;
  alarmeTipo: string;
  alarme: string;
  tipoFalha: string;
  idStatus: number;
  idTipoRede: number;
  responsavel: {
    id: number;
    nome: string;
    status: number;
  };
  fila: {
    id: number;
    nome: string;
    status: number;
  };
  criador: {
    id: number;
    nome: string;
    status: number;
  };
  grupoCriador: {
    id: number;
    nome: string;
    status: number;
  };
  status: {
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

  historicos: {
    id: number;
    ta_id: number;
    data: Date;
    texto: string;
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
  }[];

  equipamentos: {
    id: string;
    hostname: string;
    fabricante: string;
    modelo: string;
  }[];
}

interface ICounter {
  numberOfTAsIP: number;
  idsIP: number[];
  numberOfTAsMetro: number;
  idsMetro: number[];
}

interface ITACounter {
  t0h: ICounter;
  t12h: ICounter;
  t1d: ICounter;
  t3d: ICounter;
  t7d: ICounter;
  t15d: ICounter;
  t30d: ICounter;
  t60d: ICounter;
  t120d: ICounter;
  t365d: ICounter;
  total: ICounter;
  abertos: ICounter;
  emTratamento: ICounter;
  comAfetacao: ICounter;
}

interface ITAGroup {
  grupoResponsavel: string;
  counters: ITACounter;
}

interface IResponseSigitmGrupos {
  groups: ITAGroup[];
  counters: ITACounter;
}

const TAs: React.FC = () => {
  const [summaryIds, setSummaryIds] = useState<number[]>();
  const [summaryTitle, setSummaryTitle] = useState<string>();

  const { data: TAGroups, error, isValidating, revalidate } = useFetch<
    IResponseSigitmGrupos
  >('/tas/group', {
    refreshInterval: 60000 * 5,
    revalidateOnFocus: true,
    errorRetryCount: 3,
    errorRetryInterval: 3000,
  });

  const modalMinhasFilas = useRef<IModalHandles>();
  const modalTAsSummary = useRef<IModalHandles>();

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
      modalTAsSummary.current?.open();
    },
    [],
  );

  useEffect(() => {
    revalidate();
  }, [preferences.filas_tas, revalidate]);

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
                'Total',
                TAGroups
                  ? [
                      ...TAGroups.counters.total.idsIP,
                      ...TAGroups.counters.total.idsMetro,
                    ]
                  : [],
              )
            }
          >
            {!TAGroups ? (
              <Spinner />
            ) : (
              <>
                <span>Total</span>
                <strong>
                  {TAGroups.counters.total.numberOfTAsIP +
                    TAGroups.counters.total.numberOfTAsMetro}
                </strong>
              </>
            )}
          </Card>
          <Card
            onClick={() =>
              handleOpenSummary(
                'Abertos',
                TAGroups
                  ? [
                      ...TAGroups.counters.abertos.idsIP,
                      ...TAGroups.counters.abertos.idsMetro,
                    ]
                  : [],
              )
            }
          >
            {!TAGroups ? (
              <Spinner />
            ) : (
              <>
                <span>Abertos</span>
                <strong>
                  {TAGroups.counters.abertos.numberOfTAsIP +
                    TAGroups.counters.abertos.numberOfTAsMetro}
                </strong>
              </>
            )}
          </Card>
          <Card
            onClick={() =>
              handleOpenSummary(
                'Em Tratamento',
                TAGroups
                  ? [
                      ...TAGroups.counters.emTratamento.idsIP,
                      ...TAGroups.counters.emTratamento.idsMetro,
                    ]
                  : [],
              )
            }
          >
            {!TAGroups ? (
              <Spinner />
            ) : (
              <>
                <span>Em Tratamento</span>
                <strong>
                  {TAGroups.counters.emTratamento.numberOfTAsIP +
                    TAGroups.counters.emTratamento.numberOfTAsMetro}
                </strong>
              </>
            )}
          </Card>
          <Card
            onClick={() =>
              handleOpenSummary(
                'Com Afetação',
                TAGroups
                  ? [
                      ...TAGroups.counters.comAfetacao.idsIP,
                      ...TAGroups.counters.comAfetacao.idsMetro,
                    ]
                  : [],
              )
            }
          >
            {!TAGroups ? (
              <Spinner />
            ) : (
              <>
                <span>Com Afetação</span>
                <strong>
                  {TAGroups.counters.comAfetacao.numberOfTAsIP +
                    TAGroups.counters.comAfetacao.numberOfTAsMetro}
                </strong>
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
        {TAGroups ? (
          <Filas>
            {TAGroups.groups.length ? (
              TAGroups.groups.map(TAG => (
                <>
                  <Fila
                    key={TAG.grupoResponsavel}
                    color={`${stc(TAG.grupoResponsavel)}ff`}
                  >
                    <p>
                      {TAG.grupoResponsavel}
                      <span>IP</span>
                    </p>
                    <ul>
                      <li>
                        <Badge
                          value={TAG.counters.t0h.numberOfTAsIP}
                          onClick={() =>
                            handleOpenSummary('+0h', TAG.counters.t0h.idsIP)
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t12h.numberOfTAsIP}
                          onClick={() =>
                            handleOpenSummary('+12h', TAG.counters.t12h.idsIP)
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t1d.numberOfTAsIP}
                          onClick={() =>
                            handleOpenSummary('+1d', TAG.counters.t1d.idsIP)
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t3d.numberOfTAsIP}
                          onClick={() =>
                            handleOpenSummary('+3d', TAG.counters.t3d.idsIP)
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t7d.numberOfTAsIP}
                          onClick={() =>
                            handleOpenSummary('+7d', TAG.counters.t7d.idsIP)
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t15d.numberOfTAsIP}
                          onClick={() =>
                            handleOpenSummary('+15d', TAG.counters.t15d.idsIP)
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t30d.numberOfTAsIP}
                          onClick={() =>
                            handleOpenSummary('+30d', TAG.counters.t30d.idsIP)
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t60d.numberOfTAsIP}
                          onClick={() =>
                            handleOpenSummary('+60d', TAG.counters.t60d.idsIP)
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t120d.numberOfTAsIP}
                          onClick={() =>
                            handleOpenSummary('+120d', TAG.counters.t120d.idsIP)
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t365d.numberOfTAsIP}
                          onClick={() =>
                            handleOpenSummary('+365d', TAG.counters.t365d.idsIP)
                          }
                        />
                      </li>
                    </ul>
                    <span>
                      <Badge
                        value={TAG.counters.total.numberOfTAsIP}
                        onClick={() =>
                          handleOpenSummary('Total', TAG.counters.total.idsIP)
                        }
                      />
                    </span>
                  </Fila>
                  <Fila color={stc(TAG.grupoResponsavel)}>
                    <p>
                      {TAG.grupoResponsavel} <span>Metro</span>
                    </p>
                    <ul>
                      <li>
                        <Badge
                          value={TAG.counters.t0h.numberOfTAsMetro}
                          onClick={() =>
                            handleOpenSummary('+0h', TAG.counters.t0h.idsMetro)
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t12h.numberOfTAsMetro}
                          onClick={() =>
                            handleOpenSummary(
                              '+12h',
                              TAG.counters.t12h.idsMetro,
                            )
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t1d.numberOfTAsMetro}
                          onClick={() =>
                            handleOpenSummary('+1d', TAG.counters.t1d.idsMetro)
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t3d.numberOfTAsMetro}
                          onClick={() =>
                            handleOpenSummary('+3d', TAG.counters.t3d.idsMetro)
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t7d.numberOfTAsMetro}
                          onClick={() =>
                            handleOpenSummary('+7d', TAG.counters.t7d.idsMetro)
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t15d.numberOfTAsMetro}
                          onClick={() =>
                            handleOpenSummary(
                              '+15d',
                              TAG.counters.t15d.idsMetro,
                            )
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t30d.numberOfTAsMetro}
                          onClick={() =>
                            handleOpenSummary(
                              '+30d',
                              TAG.counters.t30d.idsMetro,
                            )
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t60d.numberOfTAsMetro}
                          onClick={() =>
                            handleOpenSummary(
                              '+60d',
                              TAG.counters.t60d.idsMetro,
                            )
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t120d.numberOfTAsMetro}
                          onClick={() =>
                            handleOpenSummary(
                              '+120d',
                              TAG.counters.t120d.idsMetro,
                            )
                          }
                        />
                      </li>
                      <li>
                        <Badge
                          value={TAG.counters.t365d.numberOfTAsMetro}
                          onClick={() =>
                            handleOpenSummary(
                              '+365d',
                              TAG.counters.t365d.idsMetro,
                            )
                          }
                        />
                      </li>
                    </ul>
                    <span>
                      <Badge value={TAG.counters.total.numberOfTAsMetro} />
                    </span>
                  </Fila>
                </>
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
        <MinhasFilasTA />
      </Modal>

      <Modal ref={modalTAsSummary} size="lg">
        {summaryIds && summaryTitle ? (
          <TAsSummary summaryIds={summaryIds} summaryTitle={summaryTitle} />
        ) : null}
      </Modal>
    </>
  );
};

export default TAs;
