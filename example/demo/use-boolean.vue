<template>
  <div>
    <button @click="setOpenModal">Open Modal</button>
    <div v-if="isOpenModal">
      <input type="text" :value="text" @change="handleChange" />
      <button @click="handleSubmit">Submit</button>
      <button @click="setCloseModal">Close Modal</button>
    </div>
    <div v-else>Submit：{{text}}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useBoolean } from 'hooks-vue3';
const text = ref("");
const [isOpenModal, setOpenModal, setCloseModal] = useBoolean();

const handleChange = (event: any) => {
  text.value = event.target.value;
};

const handleSubmit = () => {
  setCloseModal();
};
</script>
