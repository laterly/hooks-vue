import { ref, Ref } from 'vue';

const useBoolean = (
  defaultBoolean = false,
): [
  state: Readonly<Ref<boolean>>,
  setTrue: () => void,
  setFalse: () => void,
] => {
  const state = ref<boolean>(defaultBoolean);

  const setTrue = (): void => {
    state.value = true;
  };

  const setFalse = (): void => {
    state.value = false;
  };

  return [state, setTrue, setFalse];
};

export default useBoolean;
