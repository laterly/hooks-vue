<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Count2: {{ count2 }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script lang="ts" setup>
import { useState } from "hooks-vue3";

const [count, setCount] = useState<number>(0);
const [count2, setCount2] = useState<number>(10);

const increment = () => {
  setCount((prevCount) => prevCount + 1);
  setCount2((preCount) => preCount + 1);
};
</script>
