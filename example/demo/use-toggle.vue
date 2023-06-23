<template>
  <div>
    <h3>Example1</h3>
    <div>
      <p>Value: {{ value ? "On" : "Off" }}</p>
      <button @click="toggle()">Toggle</button>
    </div>
    <h3>Example2</h3>
    <div>
      <p>Value2: {{ value2 }}</p>
      <button @click="toggle2()">Toggle</button>
    </div>
    <h3>Example3</h3>
    <div>
      <p>Value3: {{ value3 }}</p>
      <button @click="toggle3(false)">No</button>
      <button @click="toggle3(true)">Yes</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToggle } from "hooks-vue3";
const [value, toggle] = useToggle(false);

const [value2, toggle2] = useToggle(true, {
  true: "Yes",
  false: "No",
});
const [value3, toggle3] = useToggle(true, {
  true: "Yes",
  false: "No",
});
</script>
