import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useCallback,
  useMemo,
} from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiSearch, FiPlus } from 'react-icons/fi';

import { Container } from './styles';
import { usePreferences } from '../../../../hooks/preferences';
import api from '../../../../services/api';
import Input from '../../../../components/Input';
import Chip from '../../../../components/Chip';

interface IResponseSigitmGrupos {
  sigitmGrupos: ISigitmGrupo[];
}

interface ISigitmGrupo {
  id: number;
  nome: string;
}

const MinhasFilasTA: React.FC = () => {
  const [, setLoading] = useState(false);
  const [sigitmGrupos, setSigitimGrupos] = useState<ISigitmGrupo[]>([]);
  const [filter, setFilter] = useState('');
  const { preferences, updateFilasTAsPreference } = usePreferences();

  const formRef = useRef<FormHandles>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    api.get<IResponseSigitmGrupos>('sigitm/grupos').then(response => {
      const SGgrupos = response.data.sigitmGrupos;
      setSigitimGrupos(SGgrupos);
      setLoading(false);
    });
  }, []);

  const handleAddGrupo = useCallback(
    ({ id: filaId, nome: filaName }: ISigitmGrupo) => {
      updateFilasTAsPreference([
        ...preferences.filas_tas,
        { filaId, filaName },
      ]);
    },
    [updateFilasTAsPreference, preferences.filas_tas],
  );

  const handleDeleteGrupo = useCallback(
    async (filaId: number) => {
      updateFilasTAsPreference(
        preferences.filas_tas.filter(fila => fila.filaId !== filaId),
      );
    },
    [updateFilasTAsPreference, preferences.filas_tas],
  );

  const filtered = useMemo<ISigitmGrupo[]>(() => {
    if (filter.length < 3) {
      return [];
    }
    return sigitmGrupos.filter(
      sgG =>
        sgG.nome.includes(filter) &&
        !preferences.filas_tas.some(fila => sgG.nome.includes(fila.filaName)),
    );
  }, [filter, preferences.filas_tas, sigitmGrupos]);

  return (
    <Container>
      <h1>Minhas Filas</h1>
      <Form
        ref={formRef}
        onSubmit={() => {
          console.log('submit!');
        }}
      >
        <Input
          name="name"
          icon={FiSearch}
          type="text"
          placeholder="Digite o nome da fila para buscar ..."
          onChange={e => handleInputChange(e)}
        />
      </Form>
      <div>
        {preferences.filas_tas.map(fila => (
          <Chip
            key={fila.filaId}
            text={fila.filaName}
            close={() => handleDeleteGrupo(fila.filaId)}
          />
        ))}
      </div>
      <ul className="grupos">
        {filtered.map(sgG => (
          <li key={sgG.id}>
            <span>{sgG.nome}</span>
            <button type="button" onClick={() => handleAddGrupo(sgG)}>
              <FiPlus />
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
};
export default MinhasFilasTA;
