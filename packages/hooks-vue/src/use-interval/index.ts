// import { useEffect, useRef, useState, useCallback } from 'react';
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

const useInterval = (
  callback: () => void,
  delay = 0,
  options?: UseIntervalFnOptions,
): UseIntervalFnReturn => {
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
    timerRef.value = window.setInterval(() => {
      if (!shouldExecuteCallback.value) {
        stop();
        return;
      }
      callback();
    }, delay);
  };

  const stop = () => {
    isRunning.value = false;
    if (timerRef.value) {
      window.clearInterval(timerRef.value);
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

export default useInterval;
