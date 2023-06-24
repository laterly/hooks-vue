import { ref, watch, Ref } from 'vue';
import { throttle } from 'lodash-es';
import type { ThrottleSettings } from 'lodash-es/throttle';
interface UseThrottleOptions extends ThrottleSettings {
  wait?: number;
}

const useThrottle = <T extends object>(
  initialState: T,
  options?: UseThrottleOptions,
): Ref<T | undefined> => {
  const { wait = 1000, ...restOptions } = options || {};
  const throttleState = ref<T>();

  const throttleHandler = throttle(
    newValue => {
      throttleState.value = newValue;
    },
    wait,
    {
      ...restOptions,
    },
  );

  watch(initialState, newValue => {
    throttleHandler(newValue);
  });

  return throttleState;
};

export default useThrottle;
