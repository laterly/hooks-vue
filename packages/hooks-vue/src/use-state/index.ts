import { ref, Ref, UnwrapRef, unref } from 'vue';

type SetStateAction<S> = S | ((prevState: UnwrapRef<S>) => S);

export default function useState<S>(
  initialState?: S,
): [Ref<S>, (state: SetStateAction<S>) => void] {
  const state = ref(initialState) as Ref<S>;

  const setState = (action: SetStateAction<S>): void => {
    if (typeof action === 'function') {
      state.value = (action as (prevState: UnwrapRef<S>) => S)(unref(state as Ref));
    } else {
      state.value = action;
    }
  };

  return [state, setState];
}
