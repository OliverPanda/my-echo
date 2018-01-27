<template>
    <div id="detail">
        <section class="sound_user">
            <span class="user_img">
                <img :src="userInfo.avatar_50" :alt="userInfo.name" class="profile_pic">
                <img v-if="userInfo.is_real_famous" :src="userInfo.famous_icon" class="vip_icon">
            </span>
            <span class="username">{{userInfo.name}}</span>
            <div class="user_fans right">粉丝: <em>{{userInfo.followed_count}}</em></div>
        </section>

        <section class="sound_cover">
            <img :src="soundInfo.pic_500" :alt="soundInfo.name">
            <div class="progress">
                <span style="width: 5%"></span>
                <em>{{audio.currentTime | timeFormat}} / {{soundInfo.length | timeFormat}}</em>
            </div>
            <div class="control">
                
            </div>
        </section>
        <section class="sound_info">
            <div class="info_header">
                <div class="play_num">216850 播放</div>
                <div class="like">
                    5474 喜欢
                </div>
                <div class="setRing">设为手机铃声</div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Util from 'src/config/util'
export default {
    data () {
        return {
            userInfo: '',
            soundInfo: ''
        }
    },
    computed: {
        ...mapState([
            'audio'
        ])
    },
    filters: {
        timeFormat: Util.timeFormat
    },
    methods: {
        ...mapActions([
            'get_music_data'
        ]),
        getDetailInfo () {
            this.get_music_data (this.$route.params.id)
            .then(res => {
                this.soundInfo = res.sound
                this.userInfo = res.sound.user
            })
        },
        jump (e) {
            // 只适合width = 100%时候,只适合进度条宽度 = window宽度
            e = e || window.event
            var percent = (e.pageX / window.innerWidth).toFixed(2)
            this.audio.currentTime = this.soundInfo.length * percent
        },
        init () {
            this.getDetailInfo()
        }
    },
    mounted () {
        this.init()
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
      em {
          color: #00ae05;
      }
  }
}

.sound_cover {
    @include wh(100%, 16rem);
    position: relative;
    img {
        @include wh(100%, 16rem);
        object-fit: cover;
    }
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
.sound_info .info_header .play_num:before, .sound_info .info_header .link:before, .sound_info .info_header .setRing:before  {
    content: '';
    display: inline-block;
    margin-right: 0.26rem;
    background-size: cover;
}
.sound_info {
    width: 100%;
    background-color: #fff;
    bottom: 0.43rem;
    .info_header {
        @include wh(100%, 2.36rem);
        border-bottom: 1px solid #e8e8e8;
        // font-size: 0;
        padding: 0 0.69rem;
        .play_num {
            display: inline-block;
            @include lh(2.35rem);
            font-size: 0.51rem;
            color: #a9a9a9;
            margin-right: 0.86rem;
            &:before {
                @include wh(0.35rem, 0.38rem);
                background: url(~src/img/play_num.png) no-repeat;
            }
        }
        .like {
            display: inline-block;
            @include lh(2.35rem);
            font-size: 0.51rem;
            color: #a9a9a9;
            margin-right: .86rem;
            &:before {
                @include wh(0.43rem,0.38rem);
                background: url(~src/img/play_num.png) no-repeat;
            }
        }
    }
}
</style>

