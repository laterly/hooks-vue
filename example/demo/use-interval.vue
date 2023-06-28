<template>
  <div>Hello World! {{ count }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useInterval } from "../../packages/hooks-vue/src";
const count = ref<number>(0);
useInterval(() => {
  count.value++;
}, 3000);
</script>
