import { watch, onBeforeUnmount } from 'vue';
import { debounce } from 'lodash-es';
import type { DebounceSettings } from 'lodash-es';
import type {
  WatchCallback,
  WatchOptions,
  WatchSource,
  WatchStopHandle,
} from 'vue';
export interface DebounceOptions extends DebounceSettings {
  wait?: number;
}

function useDebounceWatch<T = any, Immediate extends Readonly<boolean> = false>(
  source: T | WatchSource<T>,
  cb: WatchCallback<T>,
  options?: WatchOptions<Immediate> & DebounceOptions,
): WatchStopHandle {
  const { wait = 300, ...restOptions } = options || {};
  const debouncedFn = debounce(cb, wait, {
    ...restOptions,
  });
  onBeforeUnmount(() => {
    debouncedFn.cancel();
  });
  return watch(source as any, debouncedFn, {
    ...options,
  });
}

export default useDebounceWatch;
