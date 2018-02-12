<template>
    <div id="musicBar">
        <div class='sound'>
            <audio id='audio' autoplay="autoplay" :src="audio_data.sound.source"></audio>
            <router-link class="cover" tag='a' :to="`/detail/${audio_data.sound.id}`">
                <img :src="audio_data.sound.pic_500">
            </router-link>
            <div class="info">
                <p class="name">{{audio_data.sound.name}}</p>
                <p class="author">{{audio_data.sound.user.name}}</p>
            </div>
            <div class="control">
                <button class="show_list borderSetting">
                    <div class="control_wrapper" @click.stop="$refs.sheet.toggleVisible()">
                        <svg class="icon_playList" style="" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="862" xmlns:xlink="http://www.w3.org/1999/xlink" width="24.046875" height="24">
                            <path d="M1.024 225.32608l532.48 0 0 40.957952-532.48 0 0-40.957952ZM1.024 409.63584l532.48 0 0 40.957952-532.48 0 0-40.957952ZM1.024 593.944576l532.48 0 0 40.957952-532.48 0 0-40.957952ZM738.305024 249.8048 1025.024 286.763008C1025.024 81.975296 861.185024 41.017344 697.345024 0l0 30.138368 0 214.387712 0 533.72928c-24.51968 0-63.519744 0-126.200832 0-120.379392 0-160.519168 63.695872-160.519168 121.872384 0 49.3568 36.938752 123.87328 163.84 123.87328 181.440512 0 163.84-145.672192 163.84-245.74464L738.305024 249.8048z" p-id="863" fill="#5e5e5e">
                            </path>
                        </svg>
                    </div>
                </button>
                <button class="play_control borderSetting">
                    <!-- 如果audio_play === true 显示play按钮，否则显示pause按钮 -->
                    <div class="control_wrapper" v-if="audio_play" @click.stop="SET_AUDIO_PLAY(!audio_play)">
                        <svg t="1518337992385" class="icon_play" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1073" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24">
                            <path d="M844.704269 475.730473L222.284513 116.380385a43.342807 43.342807 0 0 0-65.025048 37.548353v718.692951a43.335582 43.335582 0 0 0 65.025048 37.541128l622.412531-359.342864a43.357257 43.357257 0 0 0 0.007225-75.08948z" fill="#5e5e5e" p-id="1074">
                            </path>
                        </svg>
                    </div>
                    <div class="control_wrapper" v-else @click.stop="SET_AUDIO_PLAY(!audio_play)" style="padding: 5px 6px">
                        <svg t="1518339326701" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1423" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24">
                            <path d="M209.645253 863.934444l201.049992 0 0-703.866842L209.645253 160.067602 209.645253 863.934444zM611.804588 863.934444l201.113437 0 0-703.866842L611.804588 160.067602 611.804588 863.934444z" p-id="1424" fill="#5e5e5e">
                            </path>
                        </svg>
                    </div>
                </button>
                <button class="next_btn borderSetting">
                    <div class="control_wrapper" @click.stop="listRepeat">  
                        <svg t="1518338291744" class="icon_nextSong" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="660" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24">
                            <path d="M889.6 921.6V96c0-17.673-14.327-32-32-32-17.673 0-32 14.327-32 32v825.6c0 17.673 14.327 32 32 32 17.673 0 32-14.327 32-32z m-646.028-41.395l404.352-331.09c27.383-22.42 27.435-58.886 0-81.35l-404.352-331.09c-27.382-22.42-49.676-12.003-49.676 23.366V856.84c0 35.646 22.24 45.83 49.676 23.365z m40.546 49.518c-69.12 56.597-154.222 16.897-154.222-72.883v-696.8c0-89.481 85.14-129.447 154.222-72.883l404.352 331.09c58.7 48.064 58.662 132.353 0 180.386l-404.352 331.09z" fill="#5e5e5e" p-id="661">
                            </path>
                        </svg>
                    </div>
                </button>
            </div>
        </div>

        <!-- 进度条 -->
        <div class="progress_bar">
            <div class="progress_bar_inner" :style="`width:${$store.getters.audio_progress}`"></div>
        </div>
        
        <!-- 播放列表/播放模式 -->
        <my-sheet ref="sheet"></my-sheet>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
    computed: {
        ...mapState({
            // 'audio' 等同于state => state.audio
            audio: "audio",
            playMode: "playMode",
            playList: "playList",
            audio_data: state => state.audio.data,
            audio_play: state => state.audio.play
        })
    },
    watch: {
        audio_data(val) {
            // 当前audio数据改变了，等dom更新完，初始化audio
            if (val) {
                // vm.$nextTick  更新完DOM之后调用函数
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
        // 切换到下一首歌，如果没下一首歌就列表循环
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
        .control {
            color: #666;
            .borderSetting {
                border: 1px solid #5e5e5e;
                border-radius: 50%;
                background: #fff;
                color: #5e5e5e;
                position: relative;
            }
            .control_wrapper {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }
            .show_list {
                cursor: pointer;
                @include wh(34px,34px);
                margin-right: 8px;
                .control_wrapper {
                    padding: 4px 5px;
                }
            }
            .play_control {
                @include wh(38px,38px);
                margin-right: 8px;
                .control_wrapper {
                    padding: 5px 8px;
                }
            }
            .next_btn {
                @include wh(34px,34px);
                margin-right: 8px;
                .control_wrapper {
                    padding: 3px 5px;
                }
            }
        }
    }
}
</style>
