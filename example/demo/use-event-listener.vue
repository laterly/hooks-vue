<template>
  <div>
    <p>You clicked the button {{ count }} times</p>
    <button ref="buttonRef">Click me</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEventListener } from "../../packages/hooks-vue/src";
const count = ref(0);
const buttonRef = ref(null);

function handleClick() {
  count.value++;
}

// Add event listener using our hook
useEventListener("click", handleClick, {
  target: buttonRef,
});

</script>
