
import { ref, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
import { isFunction, isUndefined } from 'lodash-es';

export type UseTitleOptions = {
  template?: string | ((title: string) => string); //将默认的标题模板 %s 应用于指定的标题字符串
  isPrevOnUnmount?: boolean; //是否在组件卸载重置上一个的标题
};

const useTitle = (newTitle?: string, options?: UseTitleOptions): Ref<string> => {
  const { template, isPrevOnUnmount = false } = options || {};
  const title = ref<string>(document.title);
  const prevTitle = ref<string>('');

  if (!isUndefined(newTitle) && newTitle !== prevTitle.value) {
    prevTitle.value = newTitle;

    const templateString = isFunction(template)
      ? template(newTitle)
      : template ?? '%s';

    const newTitleReplace = templateString?.replace('%s', newTitle || '') || '';
    document.title = newTitleReplace || '';
    title.value = newTitleReplace;
  }
  onBeforeUnmount(() => {
    if (isPrevOnUnmount) {
      title.value = prevTitle.value;
    }
  });

  return title;
};

export default useTitle;
