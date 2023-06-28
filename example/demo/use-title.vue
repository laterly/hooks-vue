<template>
   <div>Hello World! {{title}}</div>
</template>

<script setup lang="ts">

import { useTitle } from "../../packages/hooks-vue/src";

// 使用默认标题模板，直接将 "Vue App" 设置为页面标题
const title = useTitle("Vue App");

// 使用自定义标题模板，将 "Page Title" 添加到页面标题中
useTitle("Page Title", { template: "My Site | %s", isPrevOnUnmount: true });
</script>
