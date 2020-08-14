import React, { useRef, useEffect } from 'react';
import { FiFilter, FiRefreshCcw } from 'react-icons/fi';
import { format } from 'date-fns';
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
  const { data: TAGroups, isValidating, revalidate } = useFetch<
    IResponseSigitmGrupos
  >('/tas/group', {
    refreshInterval: 60000 * 5,
    revalidateOnFocus: true,
    errorRetryCount: 3,
    errorRetryInterval: 3000,
  });

  const modalMinhasFilas = useRef<IModalHandles>();

  const { preferences } = usePreferences();

  const { addToast } = useToast();

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
          <Card>
            {!TAGroups ? (
              <Spinner />
            ) : (
              <>
                <span>Total</span>
                <strong>{TAGroups.total}</strong>
              </>
            )}
          </Card>
          <Card>
            {!TAGroups ? (
              <Spinner />
            ) : (
              <>
                <span>Abertos</span>
                <strong>{TAGroups.abertos}</strong>
              </>
            )}
          </Card>
          <Card>
            {!TAGroups ? (
              <Spinner />
            ) : (
              <>
                <span>Em tratamento</span>
                <strong>{TAGroups.tratamento}</strong>
              </>
            )}
          </Card>
          <Card>
            {!TAGroups ? (
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
        {TAGroups ? (
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
    </>
  );
};

export default TAs;
