<template>
    <div id="musicBar">
        <div class='sound'>
            <!-- audio -->
            <audio id='audio' autoplay="autoplay" src=""></audio>

            <!-- 封面 -->
            <router-link class="cover" tag='a' :to="`/detail/`">
                <img src="">
            </router-link>

            <!-- 信息 -->
            <div class="info">
                <p class="name">歌名----{{audio_data}}</p>
                <p class="author">作者名</p>
            </div>
            <!-- 控制 -->
            <div class="control">
               控制条
            </div>
        </div>

        <!-- 进度条 -->
        <div class="progress_bar">
            <div class="progress_bar_inner" style=""></div>
        </div>
        
        <!-- 播放列表/播放模式 -->
        <!-- <my-sheet ref="sheet"></my-sheet> -->
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    computed: {
        ...mapState({
            // 'audio' 等同于state => state.audio
            audio: "audio",
            playMode: "playMode",
            playList: "playList",
            audio_data: "audio.data",
            audio_play: "audio.play"
        }),
    },
    watch: {
        audio_data(val) {
            // 当前audio数据改变了，等dom更新完，初始化audio
            if (val) {
                console.log('有audio.data')
                this.$nextTick(() => {
                    this.audio_init()
                })
            }
        },
        audio_play(val) {
            val ? this.audio.ele.play() : this.audio.ele.pause()
        }
    },
    methods: {
        ...mapMutations([
            // SET_AUDIO_DATA: 'SET_AUDIO_DATA'  或者 SET_AUDIO_DATA: this.$store.commit('SET_AUDIO_DATA)
            "SET_AUDIO_DATA",
            "SET_AUDIO_ELE",
            "SET_AUDIO_PLAY",
            "SET_AUDIO_DURATION",
            "SET_AUDIO_CURRENTTIME",
            "SET_AUDIO_PLAYMODE",
            "SET_PLAYLIST"
        ]),
        audio_init () {
            let audio_ele = this.$el.querySelector("#audio")
            this.SET_AUDIO_ELE(audio_ele)
            console.log(audio_ele)
            audio_ele.oncanPlay = () => {
                audio_ele.play();
                this.SET_AUDIO_DURATION(audio_ele.duration);
            };
            audio_ele.onTimeUpdate = () => {
                // currentTime本来就是以秒来计的，所以可以不用~~取整
                this.SET_AUDIO_CURRENTTIME(audio_ele.currentTime);
            };
            audio_ele.onplay = () => {
                this.SET_AUDIO_PLAY(true);
            };
            audio_ele.onpause = () => {
                this.SET_AUDIO_PLAY(false);
            };
            audio_ele.onended = () => {
                this.SET_AUDIO_PLAY(false);
                this.playMode_init();
            };
        },
        playMode_init() {
            switch (this.playMode) {
                case "random":
                    this.randomPlay();
                    break;
                case "singleRepeat":
                    this.singleRepeat();
                    break;
                case "listRepeat":
                    this.listRepeat();
                    break;
            }
        },
        // 随机播放
        randomPlay() {
            // 0 ~ 播放列表的长度，随机得到一个数
            // 如果随机数对应的音乐和当前播放的音乐相同的话，采取listRepeat方法的逻辑，否则播放
            let index = Math.floor(Math.random() * this.playList.length);
            if (this.playList[index].sound.id === this.audio.data.sound.id) {
                this.listRepeat();
            } else {
                this.SET_AUDIO_DATA(this.playList[index]);
            }
        },
        // 单曲循环
        singleRepeat() {
            this.audio.ele.load();
            this.audio.ele.play();
        },
        // 列表循环
        listRepeat() {
            // 获取当前音乐位置currentIndex
            // currentIndex是结尾的话，nextIndex就等于0，否则 +1
            // 只有一首音乐，播放模式是列表循环或者用户点击下一首歌的情况，重新加载并播放当前的音乐
            let currentIndex = this.playList.findIndex(
                n => n.sound.id === this.audio.data.sound.id
            );
            if (currentIndex > -1) {
                let nextIndex;
                currentIndex === this.playList.length - 1
                    ? (nextIndex = 0)
                    : (nextIndex = currentIndex + 1);
                if (
                    this.playList[nextIndex].sound.id ===
                    this.audio.data.sound.id
                ) {
                    this.audio.ele.load();
                    this.audio.ele.play();
                } else {
                    this.SET_AUDIO_DATA(this.playList[nextIndex]);
                }
            } else {
                console.warn("正常逻辑不会到这里啊");
            }
        }
    }
};
</script>

<style lang="scss">
@import "src/style/mixin.scss";
#musicBar {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    border-top: 1px solid #e8e8e8;
    .sound {
        position: relative;
        @include wh(100%, 2.1rem);
        padding: 0 0.22rem;
        display: flex;
        align-items: center;
        .cover {
            display: inline-block;
            @include wh(1.6rem, 1.6rem);
            border: 1px solid #fff;
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            img {
                width: 100%;
            }
        }
        .info {
            flex: 1;
            overflow: hidden;
            padding: 0 0.32rem;
            font-size: 12px;
            p {
                @include ellipsis;
            }
        }
    }
}
</style>
