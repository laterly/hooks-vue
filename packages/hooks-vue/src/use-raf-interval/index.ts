import { ref, onBeforeMount } from 'vue';
import type { Ref } from 'vue';
import { isNumber } from 'lodash-es';

export type UseIntervalFnReturn = {
  isRunning: Ref<boolean>;
  start: () => void; //开始定时器
  stop: () => void; //停止定时器
};

export type UseIntervalFnOptions = {
  immediate?: boolean;
  autoStart?: boolean;
};

type Timer = {
  id: number;
};

const setRafInterval = (fn: () => void, delay = 0) => {
  const timer: Timer = {
    id: 0,
  };
  let start = new Date().getTime();
  const step = () => {
    const current = new Date().getTime();

    const elapsed = current - start;

    if (elapsed >= delay) {
      fn();
      start = new Date().getTime();
    }
    timer.id = requestAnimationFrame(step);
  };
  timer.id = requestAnimationFrame(step);
  return timer;
};

const clearRafInterval = (timerId: number) => {
  if (timerId) {
    cancelAnimationFrame(timerId);
  }
};

const useRafInterval = (
  callback: () => void,
  delay = 0,
  options?: UseIntervalFnOptions,
): UseIntervalFnReturn => {
  if (!isNumber(delay) || delay < 0) {
    throw new Error('delay is not invalid');
  }

  const { immediate = false, autoStart = true } = options || {};
  const isRunning = ref<boolean>(false);
  const timerRef = ref<Timer | null>(null);
  const shouldExecuteCallback = ref(autoStart);

  const run = () => {
    stop();
    isRunning.value = true;
    if (immediate) {
      callback();
    }
    timerRef.value = setRafInterval(() => {
      if (!shouldExecuteCallback.value) {
        stop();
        return;
      }
      callback();
    }, delay);
  };

  const stop = () => {
    isRunning.value = false;
    if (timerRef.value?.id) {
      clearRafInterval(timerRef.value?.id);
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

  return {
    isRunning,
    stop,
    start: () => {
      shouldExecuteCallback.value = true;
      run();
    },
  };
};

export default useRafInterval;
