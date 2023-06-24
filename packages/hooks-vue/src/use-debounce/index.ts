import { debounce } from 'lodash-es';
import { ref, onBeforeUnmount, watch, Ref } from 'vue';
import type { DebounceSettings } from 'lodash-es/debounce';

interface Options extends DebounceSettings {
  wait?: number;
}

function useDebounce<T extends object>(
  initialState: T,
  options?: Options,
): Ref<T|undefined> {
  const { wait = 1000, ...restOptions } = options || {};

  const debouncedState = ref<T>();

  const debounceHandler = debounce(
    (newValue: T) => {
      debouncedState.value = newValue;
    },
    wait,
    {
      ...restOptions,
    },
  );
  watch(
    initialState,
    newValue => {
      debounceHandler(newValue);
    },
    { immediate: false },
  );

  onBeforeUnmount(() => {
    debounceHandler.cancel();
  });

  return debouncedState;
}

export default useDebounce;
