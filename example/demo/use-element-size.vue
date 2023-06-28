<template>
   <div ref="target">
      Size: {{size.width}} x {{size.height}}
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useElementSize } from "../../packages/hooks-vue/src";

const target = ref(null);
const size = useElementSize(target);
</script>
