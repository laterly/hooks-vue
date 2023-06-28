
import { ref, isRef, onMounted, onBeforeMount } from 'vue';
import type { Ref } from 'vue';
import { isFunction, isElement } from 'lodash-es';
type Target<T> = T | (() => T) | Ref<T>;

interface UseLongPressOptions {
  delay?: number;
  onClick?: (event: PointerEvent) => void;
}

export const useLongPress = <T extends Element>(
  handler: (evt: PointerEvent) => void,
  target: Target<T | null>,
  options: UseLongPressOptions = {},
): void => {
  const { delay = 500, onClick } = options;
  const timeoutRef = ref<NodeJS.Timeout>();
  const savedTarget = ref<EventTarget | null>(null);

  const handlePointerDown = (event: Event) => {
    timeoutRef.value = setTimeout(() => {
      handler(event as PointerEvent);
    }, delay);
  };

  const handlePointerUp = (event: Event) => {
    if (timeoutRef.value) {
      clearTimeout(timeoutRef.value);
      if (onClick) {
        onClick?.(event as PointerEvent);
      }
    }
  };

  const clearTimer = () => {
    if (timeoutRef.value) {
      clearTimeout(timeoutRef.value);
      timeoutRef.value = undefined;
    }
  };

  const clearEvent = () => {
    if (savedTarget.value) {
      savedTarget.value?.removeEventListener('pointerdown', handlePointerDown);
      savedTarget.value?.removeEventListener('pointerup', handlePointerUp);
    }
  };

  onMounted(() => {
    let el: Element | null = null;
    if (target) {
      if (isFunction(target)) {
        el = target();
      } else if (isRef(target)) {
        el = target.value;
      } else {
        el = target;
      }
    }
    if (el && isElement(el)) {
      savedTarget.value = el;
      savedTarget.value?.addEventListener('pointerdown', handlePointerDown);
      savedTarget.value?.addEventListener('pointerup', handlePointerUp);
    }
  });
  onBeforeMount(() => {
    clearEvent();
    clearTimer();
  });
};

export default useLongPress;
