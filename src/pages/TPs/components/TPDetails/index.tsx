import React, { useState, useEffect, useCallback } from 'react';

import { format } from 'date-fns';
import { Container } from './styles';
import api from '../../../../services/api';
import Spinner from '../../../../components/Spinner';
import Badge from '../../../../components/Badge';
import DisplayField from '../../../../components/DisplayField';

interface ITPDetailsProps {
  id: string;
}

interface IResponse {
  tp: ITPDetail;
}

interface ITPDetail {
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
}

const TPDetails: React.FC<ITPDetailsProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [TP, setTP] = useState<ITPDetail>();
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
              <DisplayField label="Status">{TP?.status.nome}</DisplayField>
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
                <li>
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
