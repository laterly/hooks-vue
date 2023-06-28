<template>
  <div>Hello World! {{ count }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRafTimeout } from "../../packages/hooks-vue/src";
const count = ref<number>(0);
useRafTimeout(() => {
  count.value++;
}, 3000);
</script>
