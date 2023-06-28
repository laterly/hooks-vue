import { ref, onMounted, onBeforeUnmount, isRef } from 'vue';
import type { Ref } from 'vue';
import { isFunction, isElement } from 'lodash-es';

interface Size {
  width: number;
  height: number;
}

type Target<T> = T | (() => T) | Ref<T>;

const useElementSize = (target: Target<Element | null>): Ref<Size> => {
  const size = ref<Size>({
    width: 0,
    height: 0,
  });

  let observer: ResizeObserver;

  onMounted(() => {
    if (!target) {
      throw new Error('Target is invalid');
    }

    let el: Element | null = null;
    if (isFunction(target)) {
      el = target();
    } else if (isRef(target)) {
      el = target.value;
    } else {
      el = target;
    }
    if (!el || !isElement(el)) {
      return;
    }

    observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      size.value = {
        width,
        height,
      };
    });

    observer.observe(el);
  });
  
  onBeforeUnmount(() => {
    observer.disconnect();
  });

  return size;
};

export default useElementSize;
