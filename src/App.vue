<!--
 * @Date: 2022-02-16 14:36:24
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-27 15:26:49
 * @FilePath: /vue-sample/src/App.vue
-->
<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>
<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  components: {
    HelloWorld,
  },
  mounted() {
    const asyncFunc = () =>
      new Promise((resolve) => {
        abc();
      });
    asyncFunc();
   
    
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
