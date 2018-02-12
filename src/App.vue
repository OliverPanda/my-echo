<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <musicBar></musicBar>
    <!-- 页面加载进度条  vue-progressbar组件 -->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import musicBar from "src/components/common/musicBar"
export default {
    name: "App",
    components: {
      musicBar
    },
    methods: {
      ...mapMutations([
        'SET_APP_CACHE'
      ])
    },
    created() {
      this.SET_APP_CACHE()
      // 加载进度条 开始
      this.$Progress.start()
      this.$router.beforeEach((to, from, next) => {
          this.$Progress.start()
          next()
      })
      this.$router.afterEach((to, from) => {
          this.$Progress.finish()
      })
    },
    mounted() {
        // 加载进度条 结束
        this.$Progress.finish()
    }
    
};
</script>

<style lang='scss'>
@import "./style/reset.scss";
</style>
