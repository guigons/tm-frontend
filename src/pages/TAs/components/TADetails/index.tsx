import React, { useState, useEffect, useCallback } from 'react';

import { format } from 'date-fns';
import { Container } from './styles';
import api from '../../../../services/api';
import Spinner from '../../../../components/Spinner';
import Badge from '../../../../components/Badge';
import DisplayField from '../../../../components/DisplayField';
import { ITA } from '../..';

interface ITADetailsProps {
  id: number;
}

interface IResponse {
  ta: ITA;
}

const TADetails: React.FC<ITADetailsProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [TA, setTA] = useState<ITA>();
  const handleLoadTA = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<IResponse>(`/tas/${id}`);
      const { ta } = response.data;
      setTA(ta);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    handleLoadTA();
  }, [handleLoadTA, id]);

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <header>
            <h1>{TA?.id}</h1>
            {TA && <Badge value={TA.status.nome} />}
          </header>
          <main>
            <h3>Dados</h3>
            <hr />
            <div className="Line">
              <DisplayField label="Tipo Bilhete">
                {TA?.tipoBilhete}
              </DisplayField>
              <DisplayField label="Localidade">{TA?.regiao}</DisplayField>
            </div>
            <div className="Line">
              <DisplayField label="Raiz">{TA?.raiz}</DisplayField>
              <DisplayField label="Data Criação">
                {' '}
                {TA?.dataCriacao &&
                  format(new Date(TA?.dataCriacao), 'dd/MMM/uuuu kk:mm')}
              </DisplayField>
            </div>
            <div className="Line">
              <DisplayField label="Data Criação">
                {TA?.dataCriacao &&
                  format(new Date(TA?.dataCriacao), 'dd/MMM/uuuu kk:mm')}
              </DisplayField>
              <DisplayField label="Data Encerramento">
                {TA?.dataEncerramento &&
                  format(new Date(TA?.dataEncerramento), 'dd/MMM/uuuu kk:mm')}
              </DisplayField>
            </div>
            <div className="Line">
              <DisplayField label="Grupo Criador">
                {TA?.criador.nome}
              </DisplayField>
              <DisplayField label="Criador">{TA?.criador.nome}</DisplayField>
            </div>
            <div className="Line">
              <DisplayField label="Rede">{TA?.rede.nome}</DisplayField>
              <DisplayField label="Tipo">{TA?.rede.tipo.nome}</DisplayField>
            </div>
            <div className="Line">
              <DisplayField label="Equipamentos">
                {TA?.equipamentos
                  .map(equipamento => equipamento.hostname)
                  .join(', ')}
              </DisplayField>
              <DisplayField label="Alarme">{TA?.alarmeTipo}</DisplayField>
            </div>

            <h3>Histórico</h3>
            <hr />

            <ul>
              {TA?.historicos.map(historico => (
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

export default TADetails;
