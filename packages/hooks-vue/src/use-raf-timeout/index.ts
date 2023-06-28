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

type Timer = {
  id: number;
};

const setRafTimeout = (fn: () => void, delay = 0) => {
  const timer: Timer = {
    id: 0,
  };
  const start = new Date().getTime();
  const step = () => {
    const current = new Date().getTime();

    const elapsed = current - start;

    if (elapsed >= delay) {
      fn();
    } else {
      timer.id = requestAnimationFrame(step);
    }
  };
  timer.id = requestAnimationFrame(step);
  return timer;
};

const clearRafTimeout = (timerId: number) => {
  cancelAnimationFrame(timerId);
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
  const timerRef = ref<Timer>({ id: 0 });
  const shouldExecuteCallback = ref(autoStart);

  const run = () => {
    stop();

    isRunning.value = true;
    if (immediate) {
      callback();
    }
    timerRef.value = setRafTimeout(() => {
      if (!shouldExecuteCallback) {
        stop();
        return;
      }
      callback();
    }, delay);

    return () => {
      if (timerRef.value?.id) {
        clearRafTimeout(timerRef.value.id);
      }
    };
  };

  const stop = () => {
    isRunning.value = false;
    if (timerRef.value) {
      clearRafTimeout(timerRef.value.id);
      timerRef.value = { id: 0 };
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
