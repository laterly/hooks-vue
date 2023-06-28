import { ref, unref } from 'vue';
import type { Ref, UnwrapRef } from 'vue';
import { storage } from './storage';

function getInitState<T>(key: string, value: T) {
  const sessionStorageValue = storage.session.get<T>(key) || null;
  if (sessionStorageValue) {
    return sessionStorageValue;
  }
  storage.session.set<T>(key, value);
  return value;
}

function useSessionStorage<T>(
  key: string,
  value: T,
): [
  Ref<UnwrapRef<T>>,
  {
    set: (value: UnwrapRef<T>) => void;
    del: () => void;
    clear: () => void;
  },
] {
  const state = ref<T>(getInitState<T>(key, value));

  const set = (value: UnwrapRef<T>) => {
    state.value = unref(value);
    storage.session.set<UnwrapRef<T>>(key, value);
  };
  const del = () => {
    state.value = undefined as UnwrapRef<T>;
    storage.session.del(key);
  };

  const clear = () => {
    state.value = undefined as UnwrapRef<T>;
    storage.session.clear();
  };

  return [
    state,
    {
      set,
      del,
      clear,
    },
  ];
}
export default useSessionStorage;
