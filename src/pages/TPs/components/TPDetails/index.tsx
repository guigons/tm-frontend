import React, { useState, useEffect, useCallback } from 'react';

import { format } from 'date-fns';
import { Container } from './styles';
import api from '../../../../services/api';
import Spinner from '../../../../components/Spinner';
import Badge from '../../../../components/Badge';
import DisplayField from '../../../../components/DisplayField';
import { ITP } from '../..';

interface ITPDetailsProps {
  id: number;
}

interface IResponse {
  tp: ITP;
}

const TPDetails: React.FC<ITPDetailsProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [TP, setTP] = useState<ITP>();
  const handleLoadTP = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<IResponse>(`/tps/${id}`);
      const { tp } = response.data;
      setTP(tp);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    handleLoadTP();
  }, [handleLoadTP, id]);

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <header>
            <h1>{TP?.id}</h1>
            {TP && <Badge value={TP.status.nome} />}
          </header>
          <main>
            <h3>Dados</h3>
            <hr />
            <div className="Line">
              <DisplayField label="Projeto">{TP?.projeto}</DisplayField>
              <DisplayField label="Localidade">{TP?.localidade}</DisplayField>
            </div>
            <div className="Line">
              <DisplayField label="Raiz">{TP?.raiz}</DisplayField>
              <DisplayField label="Data Criação">
                {' '}
                {TP?.dataCriacao &&
                  format(new Date(TP?.dataCriacao), 'dd/MMM/uuuu kk:mm')}
              </DisplayField>
            </div>
            <div className="Line">
              <DisplayField label="Início Previsto">
                {TP?.dataInicioPrevisto &&
                  format(new Date(TP?.dataInicioPrevisto), 'dd/MMM/uuuu kk:mm')}
              </DisplayField>
              <DisplayField label="Termino Previsto">
                {TP?.dataFimPrevisto &&
                  format(new Date(TP?.dataFimPrevisto), 'dd/MMM/uuuu kk:mm')}
              </DisplayField>
            </div>
            <div className="Line">
              <DisplayField label="Grupo Criador">
                {TP?.criadorGrupo.nome}
              </DisplayField>
              <DisplayField label="Criador">{TP?.criador.nome}</DisplayField>
            </div>
            <div className="Line">
              <DisplayField label="Rede">{TP?.rede.nome}</DisplayField>
              <DisplayField label="Tipo">{TP?.rede.tipo.nome}</DisplayField>
            </div>
            <div className="Line">
              <DisplayField label="Equipamentos">
                {TP?.equipamentos
                  .map(equipamento => equipamento.hostname)
                  .join(', ')}
              </DisplayField>
              <DisplayField label="Impacto">{TP?.impacto.nome}</DisplayField>
            </div>

            <h3>Baixa</h3>
            <hr />

            {TP?.baixa && (
              <div className="Line3">
                <DisplayField label="Data">
                  {TP?.baixa?.data &&
                    format(new Date(TP?.baixa?.data), 'dd/MMM/uuuu kk:mm')}
                </DisplayField>
                <DisplayField label="Categoria">
                  {TP?.baixa?.carimbo?.categoria}
                </DisplayField>
                <DisplayField label="Descrição">
                  {TP?.baixa?.carimbo?.descrição}
                </DisplayField>
              </div>
            )}

            <h3>Carimbos</h3>
            <hr />

            <ul>
              {TP?.carimbos.map(carimbo => (
                <li key={carimbo.codigo}>
                  <div className="Line3">
                    <DisplayField label="Data">
                      {carimbo?.data &&
                        format(new Date(carimbo?.data), 'dd/MMM/uuuu kk:mm')}
                    </DisplayField>
                    <DisplayField label="Categoria">
                      {carimbo?.categoria}
                    </DisplayField>
                    <DisplayField label="Descrição">
                      {carimbo?.descrição}
                    </DisplayField>
                  </div>
                </li>
              ))}
            </ul>

            <h3>Histórico</h3>
            <hr />

            <ul>
              {TP?.historicos.map(historico => (
                <li key={historico.id}>
                  <div className="Line3">
                    <DisplayField label="Data">
                      {historico?.data &&
                        format(new Date(historico?.data), 'dd/MMM/uuuu kk:mm')}
                    </DisplayField>
                    <DisplayField label="Usuário">
                      {historico?.usuario.nome}
                    </DisplayField>
                    <DisplayField label="Texto">
                      {historico?.texto}
                    </DisplayField>
                  </div>
                </li>
              ))}
            </ul>
          </main>
        </>
      )}
    </Container>
  );
};

export default TPDetails;
