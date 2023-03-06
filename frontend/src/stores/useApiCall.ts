import { writable, derived } from 'svelte/store';
import type { RequestError } from '~/services/api';

type ApiCall<Res, Req> = (body?: Req) => Promise<Res>;
type ApiCallState = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';

type ApiCallOptions<Res> = {
  runOnMount?: boolean;
  onSuccess?: (data: Res) => void;
  onError?: (error: RequestError) => void;
};

export const useApiCall = <Res = unknown, Req = unknown>(
  call: ApiCall<Res, Req>,
  options: ApiCallOptions<Res> = { runOnMount: true }
) => {
  const state = writable<ApiCallState>('IDLE');
  const data = writable<Res | null>(null);
  const error = writable<RequestError | null>(null);

  const execute = async (body: Req) => {
    state.set('LOADING');

    try {
      const result = await call(body);
      data.set(result);
      state.set('SUCCESS');
      options.onSuccess?.(result);
    } catch (err) {
      error.set(err);
      state.set('ERROR');
      options.onError?.(err);
    }
  };

  if (options.runOnMount) {
    execute(undefined);
  }

  const flags = derived(state, ($state) => ({
    isLoading: $state === 'LOADING',
    isSuccess: $state === 'SUCCESS',
    isError: $state === 'ERROR',
    isIdle: $state === 'IDLE',
  }));

  return {
    flags,
    data,
    error,
    execute,
  };
};
