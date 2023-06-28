// import { useState, useEffect, useRef, useCallback } from 'react';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
type VisibilityState = 'visible' | 'hidden' | 'prerender' | undefined;

const useDocumentVisibility = (): Ref<VisibilityState> => {
  const visibility = ref<VisibilityState>(undefined);

  const handleVisibilityChange = () => {
    visibility.value = document?.visibilityState;
  };
  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  });

  return visibility;
};

export default useDocumentVisibility;
