import { ref, Ref } from 'vue';
import useRafInterval from '../use-raf-interval';
import { isNumber } from 'lodash-es';

type CurrentTime = {
  days: number;
  hours: number;
  total: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

type UseCountDownActions = {
  isRunning?: Ref<boolean>;
  start: (time?: number) => void; //手动触发倒计时
  stop: () => void; //停止触发倒计时
  current: Ref<CurrentTime>;
};

type UseCountDownOptions = {
  time: number; //剩余时间（毫秒）
  interval?: number; //变化时间间隔（毫秒）
  immediate?: boolean; //是否立即触发
  autoStart?: boolean; //是否自动开始倒计时
  onChange?: (current: CurrentTime) => void; //变化的回调函数
  onEnd?: () => void; //倒计时结束触发
};

const parseTime = (time: number) => {
  return {
    days: Math.floor(time / (1000 * 60 * 60 * 24)),
    hours: Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    total: time,
    minutes: Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((time % (1000 * 60)) / 1000),
    milliseconds: Math.floor(time % 1000),
  };
};

const useRafCountDown = ({
  time,
  interval = 1000,
  immediate = false,
  autoStart = true,
  onChange,
  onEnd,
}: UseCountDownOptions): UseCountDownActions => {
  if (!isNumber(interval) || interval < 0) {
    throw new Error('interval is not invalid');
  }
  const currentTime = ref<CurrentTime>({
    days: 0,
    hours: 0,
    total: time || 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const originTime = ref<number>(time);

  const {
    isRunning,
    start: startCountDown,
    stop,
  } = useRafInterval(
    () => {
      const newTotal = currentTime.value?.total - interval;
      console.log('newTotal', newTotal);
      if (!newTotal) {
        stop();
        onEnd?.();
      } else {
        const newTime: CurrentTime = parseTime(newTotal);
        onChange?.(newTime);
        currentTime.value = newTime;
      }
      // currentTime.value = prevTime;
    },
    interval,
    {
      immediate,
      autoStart: isNumber(time) && time >= 0 ? autoStart : false,
    },
  );

  const start = (time?: number) => {
    currentTime.value = parseTime(time || originTime.value);
    startCountDown();
  };

  return {
    isRunning,
    start,
    stop,
    current: currentTime,
  };
};

export default useRafCountDown;
