<template>
    <div ref="target" style="width: 100px; height: 100px; border: 1px #ccc solid">Hello world</div>

    <div>点击外面</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useClickOutside } from "../../packages/hooks-vue/src";

const target = ref(null);
useClickOutside((event) => console.log(event), [target]);
</script>
