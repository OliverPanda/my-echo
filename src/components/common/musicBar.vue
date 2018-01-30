<template>
  <div id="musicBar">
      <div class="sound">
          <div id="audio"></div>
          <router-link :to="`/detail/`" class="cover">
                <img src="" alt="">
          </router-link>
          <div class="info">
              <p class="name"></p>
              <p class="author"></p>
          </div>
          <div class="controls">
              <button class="paly_list"></button>
              <button class="play_btn"></button>
              <button class="next_btn"></button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
@import "src/style/mixin.scss";
#musicBar{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    background-color: rgba(255,255,255,0.9);
    border-top: 1px solid #e8e8e8;
    .sound{
        position: relative;
        @include wh(100%, 2.1rem);
        padding: 0 0.22rem;
        display: flex;
        align-items: center;
        .cover{
            display: inline-block;
            @include wh(1.6rem, 1.6rem);
            border: 1px solid #fff;
            box-shadow: 0 0 2px rgba(0,0,0,.2);
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .info{
            flex: 1;
            overflow: hidden;
            padding: 0 0.32rem;
            font-size: 12px;
            p{
                @include ellipsis;
            }
        }
    }
}
</style>
