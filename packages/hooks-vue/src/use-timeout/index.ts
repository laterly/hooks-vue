import { ref, onBeforeMount, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
import { isNumber } from 'lodash-es';

export type UseTimeoutFnReturn = {
  isRunning: Ref<boolean>; //是否已经触发了
  stop: () => void; //取消定时器
  start: () => void; //重新执行定时器
};
export type UseTimeoutFnOptions = {
  immediate?: boolean;
  autoStart?: boolean;
};

const useTimeout = (
  callback: () => void,
  delay = 0,
  options?: UseTimeoutFnOptions,
): UseTimeoutFnReturn => {
  if (!isNumber(delay) || delay < 0) {
    throw new Error('delay is not invalid');
  }
  const { immediate = false, autoStart = true } = options || {};
  const isRunning = ref<boolean>(false);
  const timerRef = ref<number | null>(null);
  const shouldExecuteCallback = ref(autoStart);

  const run = () => {
    stop();

    isRunning.value = true;
    if (immediate) {
      callback();
    }
    timerRef.value = window.setTimeout(() => {
      if (!shouldExecuteCallback) {
        stop();
        return;
      }
      callback();
    }, delay);
  };

  const stop = () => {
    isRunning.value = false;
    if (timerRef.value) {
      window.clearTimeout(timerRef.value);
      timerRef.value = null;
    }
  };

  onBeforeMount(() => {
    if (shouldExecuteCallback.value) {
      run();
    } else {
      stop();
    }
  });

  onBeforeUnmount(() => {
    stop();
  });

  return {
    isRunning,
    stop,
    start: () => {
      shouldExecuteCallback.value = true;
      run();
    },
  };
};

export default useTimeout;
