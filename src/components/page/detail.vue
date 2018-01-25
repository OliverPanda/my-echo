<template>
    <div id="detail">
        <section class="sound_user">
            <span class="user_img">
                <img src="https://al-qn-echo-image-cdn.app-echo.com/bee7817645711afdc8aef1ab231201ee14e36b7d?imageMogr2/auto-orient/quality/100%7CimageMogr2/thumbnail/!250x250r/gravity/Center/crop/250x250/dx/0/dy/0&imageMogr2/auto-orient/quality/100%7CimageMogr2/thumbnail/!50x50r/gravity/Center/crop/50x50/dx/0/dy/0" alt="" class="profile_pic">
                <img src="https://ws-qn-echo-image-cdn.app-echo.com/Foz1CX1MdKHnTiDV26btgAmDJ3Y-?imageMogr2/auto-orient/quality/100%7CimageMogr2/thumbnail/!100x100r/gravity/Center/crop/100x100/dx/0/dy/0" alt="" class="vip_icon">
            </span>
            <span class="username">ZR子绕</span>
            <div class="user_fans right">粉丝: <em>粉丝数</em></div>
        </section>

        <section class="sound_cover">
            <img src="" alt="">
            <div class="progress">
                <span style="width: 5%"></span>
                <em></em>
            </div>
            <div class="control">
                

            </div>
        </section>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data () {
        return {
            user: []
        }
    },
    methods: {

    },
    mounted () {
    }
};
</script>

<style lang="scss">
@import "src/style/mixin.scss";

.sound_user {
  position: relative;
  @include lh(2.24rem);
  background-color: #fbfbfb;
  padding: 0 0.42rem;
  span {
      display: inline-block;
      vertical-align: middle;
      line-height: 2.24rem;
  }
  .user_img {
    @include wh(1.44rem,1.44rem);
    position: relative;
    margin: 0.4rem 0;
    overflow: hidden;
    .profile_pic {
        width: 100%;
        border-radius: 50%;
    }
    .vip_icon {
        @include wh(0.64rem,0.64rem);
        position: absolute;
        bottom: 0;
        right: 0;
    }
  }
  .username {
      font-size: 0.6rem;
      @include ellipsis;
  }
  .user_fans {
      font-size: 0.51rem;

  }
}
</style>

