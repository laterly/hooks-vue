<template>
  <div>longPressed{{ longPressed ? "true" : "false" }}</div>
  <div>Click count {{ clickCount }}</div>
  <button ref="buttonRef">Click or Long Press Me</button>
  <button
    @click="
      () => {
        longPressed = false;
      }
    "
  >
    Rest
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLongPress } from "../../packages/hooks-vue/src";
const longPressed = ref<boolean>(false);
const buttonRef = ref(null);
const clickCount = ref(0);
useLongPress(
  () => {
    longPressed.value = true;
  },
  buttonRef,
  {
    delay: 1000,
    onClick() {
      clickCount.value++;
    },
  }
);
</script>
