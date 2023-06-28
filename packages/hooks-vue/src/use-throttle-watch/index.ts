import { watch, onBeforeUnmount } from 'vue';
import { throttle } from 'lodash-es';
import type { ThrottleSettings } from 'lodash-es';
import type {
  WatchCallback,
  WatchOptions,
  WatchSource,
  WatchStopHandle,
} from 'vue';
export interface DebounceOptions extends ThrottleSettings {
  wait?: number;
}

function useThrottleWatch<T = any, Immediate extends Readonly<boolean> = false>(
  source: T | WatchSource<T>,
  cb: WatchCallback<T>,
  options?: WatchOptions<Immediate> & DebounceOptions,
): WatchStopHandle {
  const { wait = 300, ...restOptions } = options || {};
  const throttleFn = throttle(cb, wait, {
    ...restOptions,
  });
  onBeforeUnmount(() => {
    throttleFn.cancel();
  });
  return watch(source as any, throttleFn, {
    ...options,
  });
}

export default useThrottleWatch;
