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
                <em>{{soundInfo.length | timeFormat}}</em>
            </div>
            <div class="control">
                
            </div>
        </section>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Util from 'src/config/util'
export default {
    data () {
        return {
            userInfo: '',
            soundInfo: ''
        }
    },
    computed: {
        ...mapGetters([

        ])
    },
    filters: {
        timeFormat: Util.timeFormat
    },
    methods: {
        ...mapActions([
            'get_music_data'
        ]),
        getUserInfo () {
            this.get_music_data (this.$route.params.id)
            .then(res => {
                // console.log(res.sound)
                // console.dir(res.sound.user)
                this.soundInfo = res.sound
                this.userInfo = res.sound.user
            })
        },
        getMusicInfo () {

        },
        init () {
            this.getUserInfo()
        }
    },
    mounted () {
        this.init()
        // console.log(Util.timeFormat(40))
        // console.log(Util.timeFormat(666))
        

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

