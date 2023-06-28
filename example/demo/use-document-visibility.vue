<template>
  <div>Hello World!</div>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { useDocumentVisibility } from "../../packages/hooks-vue/src";
const visibility = useDocumentVisibility();
watchEffect(() => {
  // 根据可见性状态执行不同的操作
  if (visibility.value === "hidden") {
    // 页面不可见
    console.log("页面不可见");
  } else {
    // 页面可见
    console.log("页面可见");
  }
});
</script>
