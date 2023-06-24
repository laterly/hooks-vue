<template>
  <div>
    <label>Value:</label>
    <input
      type="text"
      :value="value"
      placeholder="请输入"
      @input="
        (e) => {
          changeValue(e);
        }
      "
    />
    <div>debouncedValue{{ debouncedValue }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, Ref } from "vue";
import { useDebounce } from "hooks-vue3";
const value = ref("1");
const debouncedValue = useDebounce<Ref<string>>(value, {
  wait: 500,
});
const changeValue = (e: any) => {
  value.value = e.target.value;
};

watch(debouncedValue, () => {
  console.log("debouncedValue", debouncedValue);
});
</script>
