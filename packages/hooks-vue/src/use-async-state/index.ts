import { ref } from 'vue';
import type { Ref, UnwrapRef } from 'vue';
import { isFunction } from 'lodash-es';

type PromiseType<T, P> = Promise<T> | ((...args: P[]) => Promise<T>);

type UseAsyncStateOptions<T> = {
  manual?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
};

type UseAsyncStateReturn<T, P> = {
  data: Ref<UnwrapRef<T>>;
  loading: Ref<boolean>;
  run: (...args: P[]) => Promise<T>;
};

function useAsyncState<T, P extends any[]>(
  promise: PromiseType<T, P>,
  options?: UseAsyncStateOptions<T>,
): UseAsyncStateReturn<T, P> {
  const { onSuccess, onError, manual } = options || {};
  const state = ref();
  const loading = ref<boolean>(false);

  async function execute(...args: any[]) {
    loading.value = true;

    const _promise = isFunction(promise) ? promise(...(args as P)) : promise;

    try {
      const data = await _promise;
      state.value = data;
      loading.value = true;
      onSuccess?.(data);
    } catch (e) {
      onError?.(e);
    } finally {
      loading.value = false;
    }

    return state.value as T;
  }
  if (!manual) {
    execute();
  }
  return {
    data: state,
    run: execute,
    loading,
  };
}

export default useAsyncState;
