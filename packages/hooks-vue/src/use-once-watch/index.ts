import { watch, nextTick } from 'vue';

import type { WatchCallback, WatchOptions, WatchSource } from 'vue';

function useOnceWatch<T = any, Immediate extends Readonly<boolean> = false>(
  source: T | WatchSource<T>,
  cb: WatchCallback<T>,
  options?: WatchOptions<Immediate>,
) {
  const stop = watch(
    source as any,
    (...args) => {
      nextTick(() => stop());

      return cb(...args);
    },
    {
      ...options,
    },
  );
}

export default useOnceWatch;
