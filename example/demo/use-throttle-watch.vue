<template>
    <div>Hello World! {{count}}</div>
    <button @click="count++">Add</button>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  const count = ref<number>(0);
  import { useThrottleWatch } from "../../packages/hooks-vue/src";
  useThrottleWatch(
    count,
    (newVal, oldVale) => {
      console.log("newVal", newVal, oldVale);
    },
    {
      wait: 1000,
    }
  );
  </script>
  