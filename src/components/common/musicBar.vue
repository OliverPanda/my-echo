<template>
    <div id="musicBar">
        <div class="sound">
            <audio id="audio" autoplay="autoplay" :src="audio_data.sound.source"></audio>
        </div>
        <router-link :to="`/detail/${audio_data.sound.id}`" class="cover">
            <img :src="audio_data.sound.pic_500">
        </router-link>
        <div class="info">
            <p class="name">{{audio_data.sound.name}}</p>
            <p class="author">{{audio_data.sound.user.name}}</p>
        </div>
        <div class="controls">
            <button class="paly_list"></button>
            <button class="play_btn"></button>
            <button class="next_btn"></button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
    computed: {
        ...mapState({
            // 'audio' 等同于state => state.audio
            audio: "audio",
            playMode: "playMode",
            playList: "playList",
            audio_data: "audio.data",
            audio_play: "audio.play"
        })
    },
    watch: {
        audio_data(val) {
            // 当前audio数据改变了，等dom更新完，初始化audio
            if (val) {
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
        audio_init() {
            let audio_ele = this.$el.querySelector("#audio");
            this.SET_AUDIO_ELE(AUDIO);
            audio_ele.canPlay = () => {
                audio_ele.play();
                this.SET_AUDIO_DURATION(audio_ele.duration);
            };
            audio_ele.onTimeUpdate = () => {
                // currentTime本来就是以秒来计的，所以可以不用~~取整
                audio_ele.SET_AUDIO.CURRENTTIME(audio_ele.currentTime);
            };
            audio_ele.onplay = () => {
                this.SETXS_AUDIO_PLAY(true);
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
                this.set_audio_data(this.playList[index]);
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
                    this.set_audio_data(this.playList[nextIndex]);
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
