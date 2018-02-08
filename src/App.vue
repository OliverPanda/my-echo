<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <musicBar></musicBar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import musicBar from "src/components/common/musicBar";
export default {
    name: "App",
    components: {
      musicBar
    },
    computed: {
        ...mapState([
            'audio'
        ])
    },
    methods : {
      ...mapState([
        'SET_APP_CACHE'
      ])
    },
    created() {
      this.SET_APP_CACHE()
    }
    
};
</script>

<style lang='scss'>
@import "./style/reset.scss";
</style>
