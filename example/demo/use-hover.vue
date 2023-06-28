<template>
  <div ref="hoverRef">{{ isHover ? "Hovered!" : "Hover over me!" }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const hoverRef = ref(null);

import { useHover } from "../../packages/hooks-vue/src";
const isHover = useHover(hoverRef, {
  delayEnter: 100,
  delayLeave: 100,
  onEnter() {
    console.log("ener");
  },
  onLeave() {
    console.log("leave");
  },
});

</script>
