import { ref, isRef, onMounted, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
import { isFunction, isElement, isEqual } from 'lodash-es';

type Target<T> = T | (() => T) | Ref<T> | Window | Document;

type Options = {
  target?: Target<Element | null>;
  capture?: boolean;
  passive?: boolean;
};

const useEventListener = (
  type: string,
  listener: EventListener,
  options?: Options,
): (() => void) => {
  const savedListener = ref<EventListener>();
  const savedOptions = ref<Options>();
  const savedTarget = ref<EventTarget | null>(null);

  const eventListener = (event: Event) => {
    return savedListener.value?.(event);
  };

  onMounted(() => {
    if (!savedTarget.value) {
      let el;
      if (options?.target) {
        if (isFunction(options?.target)) {
          el = options?.target();
        } else if (isRef(options.target)) {
          el = options?.target.value;
        } else {
          el = options?.target;
        }
      }
      if (el && isElement(el)) {
        savedTarget.value = el;
      } else {
        savedTarget.value = window;
      }
    }
    if (
      !isEqual(savedListener.value, listener) ||
      !isEqual(savedOptions.value, options)
    ) {
      const { capture = false, passive = false } = options || {};

      savedTarget.value?.addEventListener(type, eventListener, {
        capture,
        passive,
      });

      savedListener.value = listener;
      savedOptions.value = options;
    }
  });
  onBeforeUnmount(() => {
    savedTarget.value?.removeEventListener(type, eventListener);
  });

  const cleanup = () => {
    savedTarget.value?.removeEventListener(type, eventListener);
  };
  return cleanup;
};

export default useEventListener;
