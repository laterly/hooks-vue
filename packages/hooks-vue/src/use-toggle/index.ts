import { isFunction, isBoolean } from 'lodash-es';
import { ref, computed } from 'vue';
import type { ComputedRef } from 'vue';

type UseToggleState<T> = T | (() => T);

export interface UseToggleOptions<U, S> {
  true?: UseToggleState<U>;
  false?: UseToggleState<S>;
}

const useToggle = <U, S>(
  initialValue?: UseToggleState<boolean>,
  options?: UseToggleOptions<U, S>,
): [ComputedRef<U | boolean | S>, (value?: boolean) => void] => {
  const value = ref<UseToggleState<boolean>>(
    isFunction(initialValue) ? initialValue() : initialValue || false,
  );

  const { true: trueVal, false: falseVal } = options || {};

  const toggle = (newValue?: boolean) => {
    if (isBoolean(newValue)) {
      value.value = newValue;
    } else {
      value.value = !value.value;
    }
  };

  const latestTrueVal = computed(() => {
    if (isFunction(trueVal)) {
      return trueVal?.();
    }
    return trueVal;
  });

  const latestFalseVal = computed(() => {
    if (isFunction(falseVal)) {
      return falseVal?.();
    }
    return falseVal;
  });

  const latestValue = computed(() => {
    return isBoolean(value.value) && value.value
      ? latestTrueVal.value ?? true
      : latestFalseVal.value ?? false;
  });

  return [latestValue, toggle];
};
export default useToggle;
