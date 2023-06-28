<template>
  <div>
    <div v-if="isRunningCountDown">
      <button>{{currentCounrDown.seconds}} s</button>
      <button
        @click="
          {
            stopCountDown;
          }
        "
      >
        停止倒计时
      </button>
      <button
        @click="
          () => {
            startCountDown(6 * 1000);
          }
        "
      >
        重新开始倒计时
      </button>
    </div>

    <button
      v-else
      @click="
        () => {
          startCountDown();
        }
      "
    >
      手动触发开始倒计时6秒
    </button>
  </div>
</template>

<script setup lang="ts">

import { useCountDown } from "../../packages/hooks-vue/src";
const {
  isRunning: isRunningCountDown,
  current: currentCounrDown,
  start: startCountDown,
  stop: stopCountDown,
} = useCountDown({
  //倒计时6秒
  time: 6 * 1000,
  //变化时间间隔（毫秒）
  interval: 1000,
  //默认true,设置为false，需要手动触发调用start
  autoStart: false,
  //倒计时改变时触发的回调函数
  onChange: (current) => {
    console.log("当前时间current", current);
  },
  //倒计时结束时触发的回调函数
  onEnd: () => {
    console.log("结束倒计时");
  },
});
</script>
