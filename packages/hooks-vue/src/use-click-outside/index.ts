import { isRef, onBeforeMount, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
import { isFunction, isElement } from 'lodash-es';

type Target<T> = T | (() => T) | Ref<T>;

const useClickOutside = <T extends keyof DocumentEventMap>(
  onClickAway: (event: DocumentEventMap[T]) => void,
  target: Target<Element | null> | Target<Element | null>[],
  eventName: T | T[] = 'mousedown' as T,
) => {
  const targets = Array.isArray(target) ? target : [target];

  const handler = (event: DocumentEventMap[T]) => {
    const isInsideTarget = targets?.some(t => {
      let el: Element | null = null;
      if (t) {
        if (isFunction(t)) {
          el = t();
        } else if (isRef(t)) {
          el = t.value;
          console.log('elel',el);
        } else {
          el = t;
        }
      }
      return el && isElement(el) && el.contains(event.target as Node);
    });
    if (!isInsideTarget) {
      onClickAway(event);
    }
  };

  const getEventNames = () => {
    const events = Array.isArray(eventName) ? eventName : [eventName];
    return events as T[];
  };
  onBeforeMount(() => {
    const eventNames = getEventNames();
    eventNames.forEach(evt => {
      document.addEventListener(evt, handler as EventListener, false);
    });
  });

  onBeforeUnmount(() => {
    const eventNames = getEventNames();
    eventNames.forEach(evt => {
      document.removeEventListener(evt, handler as EventListener, false);
    });
  });
};

export default useClickOutside;
