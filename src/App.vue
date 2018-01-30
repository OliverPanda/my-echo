<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>

    <musicBar></musicBar>
  </div>
</template>

<script>
import musicBar from "src/components/common/musicBar";
export default {
    name: "App",
    components: {
      musicBar
    }
    
};
</script>

<style lang='scss'>
@import "./style/reset.scss";
</style>
