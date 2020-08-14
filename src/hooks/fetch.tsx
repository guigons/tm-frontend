/* eslint-disable no-shadow */
import useSWR, { ConfigInterface } from 'swr';
import api from '../services/api';

export function useFetch<Data = any, Error = any>(
  url: string,
  config?: ConfigInterface<Data | undefined, Error>,
): {
  data: Data | undefined;
  error: any;
  isValidating: boolean;
  mutate(
    data?: Data | Promise<Data>,
    shouldRevalidate?: boolean,
  ): Promise<Data | undefined>;
  revalidate(): Promise<boolean>;
} {
  const { data, error, isValidating, mutate, revalidate } = useSWR<
    Data | undefined,
    Error
  >(
    url,
    async url => {
      try {
        const response = await api.get<Data>(url);
        return response.data;
      } catch (error) {
        console.log(`ERRO try run fetch: ${url}`, error);
        return undefined;
      }
    },
    {
      ...config,
    },
  );

  return { data, error, isValidating, mutate, revalidate };
}
