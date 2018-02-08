<template>
    <div id="detail">
        <section class="sound_user">
            <span class="user_img">
                <img :src="audio.data.sound.user.avatar_50" class="profile_pic">
                <img v-if="audio.data.sound.user.is_real_famous" :src="audio.data.sound.user.famous_icon" class="vip_icon">
            </span>
            <span class="username">{{audio.data.sound.user.name}}</span>
            <div class="user_fans right">粉丝:
                <em>{{audio.data.sound.user.followed_count}}</em>
            </div>
        </section>

        <section class="sound_cover">
            <img :src="audio.data.sound.pic_500" :alt="audio.data.sound.name">
            <!-- 进度条 -->
            <div class="progress" @click.stop='jump'>
                <span style="width: 5%"></span>
                <em>{{audio.currentTime | timeFormat}} / {{audio.duration | timeFormat}}</em>
            </div>
            <div class="control">
                <div class="play_btn"></div>
                <div class="control">
                    <p class="control_name">{{audio.data.sound.name}}</p>
                    <p class="control_info">
                        <span class="author"><em>{{audio.data.sound.user.name}}</em></span>
                        <span class="channel"><em>{{audio.data.sound.channel.name}}</em></span>
                    </p>
                </div>
            </div>
        </section>
        <section class="sound_info">
            <div class="info_header">
                <div class="play_num">{{audio.data.sound.view_count}} 播放</div>
                <div class="like">{{audio.data.sound.like_count}} 喜欢</div>
                <div class="setRing">设为手机铃声</div>
            </div>
            <div class="info_lyr">
                <div class="lyr_header" v-if="audio.data.sound.song_info">
                    <p v-if='audio.data.sound.song_info.album_name'>{{audio.data.sound.song_info.album_name.type}} : {{audio.data.sound.song_info.album_name.name}}</p>
                    <p v-if='audio.data.sound.song_info.author'>{{audio.data.sound.song_info.author.type}} : {{audio.data.sound.song_info.author.name}}</p>
                    <p v-if='audio.data.sound.song_info.name'>{{audio.data.sound.song_info.name.type}} : {{audio.data.sound.song_info.name.name}}</p>
                </div>
                <div class="lyr" v-if="audio.data.sound.lyrics" v-html="audio.data.sound.lyrics">
                </div>
                <div class="noLyr" v-if="!audio.data.sound.song_info && !audio.data.sound.lyric">找不到歌词...</div>
            </div>
        </section>
        <myList :data="detailRecommend"></myList>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import Util from "src/config/util";
import myList from "src/components/common/recommendList";
import musicBar from 'src/components/common/musicBar'
export default {
    data() {
        return {
            detailRecommend: []
        };
    },
    components: {
        myList
    },
    computed: {
        ...mapState(["audio"])
    },
    filters: {
        timeFormat: Util.timeFormat
    },
    methods: {
        ...mapActions([
            "get_music_data",
            "getHot"
        ]),
        ...mapMutations([
            "SET_AUDIO_DATA",
            "SET_AUDIO_PLAY",
            "SET_AUDIO_ELE"
        ]),
        getDetailInfo() {
            this.get_music_data(this.$route.params.id).then(res => {
                if (res) {
                    // 设置AUDIO
                    this.SET_AUDIO_DATA(res)
                }
            });
        },
        getRecommend() {
            this.getHot().then(res => {
                // getArrayy 获取数组中任意不重复的8项
                this.detailRecommend = Util.getArrayItems(res.data,8)
            });
        },
        jump(e) {
            // 只适合width = 100%时候,只适合进度条宽度 = window宽度
            e = e || window.event;
            var percent = (e.pageX / window.innerWidth).toFixed(2);
            this.audio.currentTime = this.audio.ele.duration * percent
        },
        init() {
            this.getDetailInfo();
            this.getRecommend();
        }
    },
    mounted() {
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
    .control {
        @include lh(2.4rem);
        width: 100%;
        position: absolute;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        .play_btn {
            @include wh(1.6rem,1.6rem);
            margin: 0.43rem;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            background-size: cover;
            &.play {
                background: url(~src/img/play.png);
            }
            &.pause {
                background: url(~src/img/pause.png)
            }
        }
        .control_info {
            flex: 1;
            color: #fff;
            height: 1.6rem;
            vertical-align: top;
            overflow: hidden;     
            p {
                width: 100%;
                height: 1.432;
                @include ellipsis;
                font-size: 0.48rem;
                span>em {
                    color: #6ed56c;
                    font-size: 0.51rem;
                }
            }       
            
        }


    }
}
.sound_info .info_header .play_num:before,
.sound_info .info_header .link:before,
.sound_info .info_header .setRing:before {
    content: "";
    display: inline-block;
    margin-right: 0.26rem;
    background-size: cover !important;
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
            margin-right: 0.86rem;
            &:before {
                @include wh(0.43rem,0.38rem);
                background: url(~src/img/like_num.png) no-repeat;
            }
        }
        .setRing {
            float: right;
            @include lh(2.35rem);
            font-size: 0.56rem;
            color: #6ed56c;
            &:before {
                @include wh(0.86rem,0.86rem);
                background: url(~src/img/bell.png) no-repeat;
            }
        }
    }
    .info_lyr {
        white-space: pre-line;
        line-height: 1.5em;
        font-size: 0.6rem;
        padding: 0.61rem 0.64rem 1.28rem;
        text-align: left;
    }
}
</style>

