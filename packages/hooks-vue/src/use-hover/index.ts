// import { useState, useEffect, useRef } from 'react';
import { ref, onMounted, isRef } from 'vue';
import type { Ref } from 'vue';
import { isFunction, isElement } from 'lodash-es';

type UseHoverOptions = {
  delayEnter?: number;
  delayLeave?: number;
  onLeave?: () => void;
  onEnter?: () => void;
};

type Target<T> = T | (() => T) | Ref<T>;

const useHover = (
  target: Target<Element | null>,
  options?: UseHoverOptions,
): Ref<boolean> => {
  const { delayEnter, delayLeave, onEnter, onLeave } = options || {};

  const isHover = ref<boolean>(false);
  const delayEnterRef = ref<number>();
  const delayLeaveRef = ref<number>();

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
    const handleMouseEnter = () => {
      if (delayLeaveRef.value) {
        clearTimeout(delayLeaveRef.value);
      }

      if (delayEnter) {
        delayEnterRef.value = window.setTimeout(() => {
          isHover.value = true;
          onEnter?.();
        }, delayEnter);
      } else {
        isHover.value = true;
        onEnter?.();
      }
    };

    const handleMouseLeave = () => {
      if (delayEnterRef.value) {
        clearTimeout(delayEnterRef.value);
      }
      if (delayLeave) {
        delayLeaveRef.value = window.setTimeout(() => {
          isHover.value = false;
          onLeave?.();
        }, delayLeave);
      } else {
        isHover.value = false;
        onLeave?.();
      }
    };

    el?.addEventListener('mouseenter', handleMouseEnter);
    el?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el?.removeEventListener('mouseenter', handleMouseEnter);
      el?.removeEventListener('mouseleave', handleMouseLeave);
      if (delayEnterRef.value) {
        clearTimeout(delayEnterRef.value);
      }
      if (delayLeaveRef.value) {
        clearTimeout(delayLeaveRef.value);
      }
    };
  });

  return isHover;
};

export default useHover;
