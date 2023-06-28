<template>
  <div v-for="item in data" :key="item">
    {{ item }}
  </div>
  {{ loading ? "true" : "false" }}
  <button @click="() => {
    run();
  }">run</button>
</template>

<script lang="ts" setup>
import { useAsyncState } from "../../packages/hooks-vue/src";

const promise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('setTimeout模拟请求');
      resolve([1, 2, 3]);
    }, 300);
  });
};
const { data, loading, run } = useAsyncState(() => promise(), {
  manual: true,
});
</script>
