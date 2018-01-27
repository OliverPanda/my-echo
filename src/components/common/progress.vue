<template>
  <section class="sound_cover">
    <img :src="soundInfo.pic_500" :alt="soundInfo.name">
    <div class="progress">
        <span style="width: 5%;"></span>
        <em>{{audio.currentTime | timeFormat}} / {{soundInfo.length | timeFormat}}</em>
    </div>
    <div class="control">
            
    </div>
  </section>
        
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Util from 'src/config/util'
export default {
  data () {
      return {
        soundInfo: []
      }
  },
  computed: {
    ...mapState([
      'audio'
    ])
  },
  props: ['soundId'],
  filters: {
    timeFormat: Util.timeFormat 
  },
  methods: {
    ...mapActions([
      "get_music_data"
    ]),
    getSoundInfo () {
      this.get_music_data(this.soundId).then(res => {
        this.soundInfo = res.sound
      });
    },
    init () {
      this.getSoundInfo();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
@import "src/style/mixin.scss";

.sound_cover {
  .progress {
    @include wh(100%, 0.64rem);
    @include font(0.51rem, 0.64rem);
    position: absolute;
    bottom: 2.4rem;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    span {
      background-color: rgba(110, 213, 108, 0.6);
      @include leftTop;
      height: 100%;
    }
    em {
      z-index: 1;
    }
  }
}
</style>
