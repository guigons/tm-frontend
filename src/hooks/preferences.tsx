import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import { ObjectID } from 'mongodb';
import api from '../services/api';
import { useFetch } from './fetch';

export interface IFilaTAPreference {
  filaId: number;
  filaName: string;
}

export interface IFilaTPPreference {
  filaId: number;
  filaName: string;
}

export interface IChartPreference {
  _id: string;
  template_id: string;
  name: string;
  start: Date;
  end: Date;
  period: string;
  amount?: number;
  horizontal: string;
  stacked: boolean;
  type: string;
  groupBy?: string;
}

interface IPreferencesState {
  _id?: string;
  user_id?: string;
  filas_tas: IFilaTAPreference[];
  filas_tps: IFilaTAPreference[];
  charts: IChartPreference[];
}

interface IPreferencesContextData {
  preferences: IPreferencesState;
  updateFilasTAsPreference(
    newFilasTAsPreference: IFilaTAPreference[],
  ): Promise<void>;
  updateFilasTPsPreference(
    newFilasTPsPreference: IFilaTPPreference[],
  ): Promise<void>;
  updateChartsPreference(
    newChartsPreference: IChartPreference[],
  ): Promise<void>;
}

const PreferencesContext = createContext<IPreferencesContextData>(
  {} as IPreferencesContextData,
);

export const PreferencesProvider: React.FC = ({ children }) => {
  const [preferences, setPreferences] = useState<IPreferencesState>({
    filas_tas: [],
    filas_tps: [],
    charts: [],
  });

  useEffect(() => {
    async function loadPreferences(): Promise<void> {
      try {
        const response = await api.get<IPreferencesState>('userPreferences');
        const preferencesLoaded = response.data;
        delete preferencesLoaded._id;
        delete preferencesLoaded.user_id;
        setPreferences(preferencesLoaded);
      } catch (error) {
        // throw new Error('Erro ao carregar preferencias');
        console.log('Error, try load preferences', error);
      }
    }
    loadPreferences();
  }, []);

  const updateFilasTAsPreference = useCallback(
    async (newFilasTAsPreference: IFilaTAPreference[]) => {
      const newPreferences = {
        ...preferences,
        filas_tas: newFilasTAsPreference,
      };

      try {
        await api.patch('userPreferences', newPreferences);
        setPreferences(newPreferences);
      } catch (error) {
        throw new Error('Erro ao atualizar preferencias');
      }
    },
    [preferences],
  );

  const updateFilasTPsPreference = useCallback(
    async (newFilasTPsPreference: IFilaTPPreference[]) => {
      const newPreferences = {
        ...preferences,
        filas_tps: newFilasTPsPreference,
      };

      try {
        await api.patch('userPreferences', newPreferences);
        setPreferences(newPreferences);
      } catch (error) {
        throw new Error('Erro ao atualizar preferencias');
      }
    },
    [preferences],
  );

  const updateChartsPreference = useCallback(
    async (newChartsPreference: IChartPreference[]) => {
      const charts = newChartsPreference.map(ncp =>
        Object.assign(ncp, {
          _id: ncp._id ? ncp._id : new ObjectID().toHexString(),
        }),
      );

      const newPreferences = {
        ...preferences,
        charts,
      };

      try {
        await api.patch('userPreferences', newPreferences);
        setPreferences(newPreferences);
      } catch (error) {
        throw new Error('Erro ao atualizar preferencias');
      }
    },
    [preferences],
  );

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updateFilasTAsPreference,
        updateFilasTPsPreference,
        updateChartsPreference,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export function usePreferences(): IPreferencesContextData {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error(
      'usePreferences must be used within an PreferencesProvider',
    );
  }

  return context;
}
