<template>
  <div>Hello World! {{ count }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTimeout } from "../../packages/hooks-vue/src";
const count = ref<number>(0);
useTimeout(() => {
  count.value++;
}, 3000);
</script>
