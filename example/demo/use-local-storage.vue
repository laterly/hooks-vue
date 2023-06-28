<template>
    <div>
        <input type="text" placeholder="分数" :value="state" @input="(e) => { set(Number(e.target.value)); }" />
        <p>更新分数： {{state}}</p>
        <button @click="() => { del(); }">
            清空分数
        </button>
        <button @click="() => { clear(); }">
            全部清空
        </button>
    </div>
</template>

<script lang="ts" setup>
import { useLocalStorage } from "hooks-vue3";

const [state, { set, del, clear }] = useLocalStorage<number>("local-key", 0);
</script>
