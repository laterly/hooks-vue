<template>
  <p>Count: {{ count }}</p>

  <button @click="handleClick">Increment</button>
  <p>throttledSetCount:{{ throttledSetCount }}</p>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useThrottle } from 'hooks-vue3';
const count = ref<number>(0);
const handleClick = () => {
  count.value = count.value + 1;
};
const throttledSetCount = useThrottle<number>(count, {
  wait: 1000,
});
</script>
