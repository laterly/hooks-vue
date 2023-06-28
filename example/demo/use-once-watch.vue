<template>
  <div>Hello World! {{ count }}</div>
  <button @click="count++">Add</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useOnceWatch } from "../../packages/hooks-vue/src";
const count = ref<number>(0);
useOnceWatch(count, () => {
  console.log("只进来一次，然后自动停止监听");
});
</script>
