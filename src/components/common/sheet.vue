<template>
    <div class="sheet">
        <!-- 播放列表 -->
        <mu-bottom-sheet sheetClass='playListSheet' :open="playList_visible" @close="playList_visible = false" overlayColor='#fff' :overlayOpacity="0">
            <div class="playList-header">
                播放列表<span>（{{playList.length}}首）</span>
                <!-- 播放模式按钮 -->
                <mu-icon-button class="playMode_btn" :icon="playMode_icon" @click.stop="playMode_visible = true" />
            </div>
            <!-- 列表 -->
            <mu-list class='list'>
                <mu-list-item class="list-item" v-for="(item, index) in playList" :key="index" :class="{'playing': audio.data.sound.id === item.sound.id}" @click.stop="SET_AUDIO_DATA(item)">
                    <!-- 播放小图标 -->
                    <mu-icon class="playing_icon" slot="left" v-show="audio.data.sound.id === item.sound.id"  value="play_circle_filled" /> {{item.sound.name}}
                    <!-- 删除列表按钮 -->
                    <mu-icon class="close_btn" slot="right" value="close" @click.stop="deleteItem(item)" />
                </mu-list-item>
                <!-- 没有数据 -->
                <mu-list-item class="list-item list-item-nothing" v-if="playList.length === 0">什么都没有了T T~ </mu-list-item>
            </mu-list>
        </mu-bottom-sheet>

        <!-- 播放模式 -->
        <mu-bottom-sheet sheetClass='playModeSheet' :open="playMode_visible" @close="playMode_visible = false">
            <mu-list class="list" :value="playMode" @change="playModeChange">
                <mu-list-item class="list-item" v-for="(item, index) in playMode_item" :key="index" :title="item.title" :value="item.val">
                    <mu-icon slot="right" :value="item.icon" />
                </mu-list-item>
            </mu-list>
        </mu-bottom-sheet>

    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            playMode_item: [
                { title: '默认', val: 'default', icon: 'more_vert' },
                { title: '随机播放', val: 'random', icon: 'all_inclusive' },
                { title: '单曲循环', val: 'singleRepeat', icon: 'repeat_one' },
                { title: '列表循环', val: 'listRepeat', icon: 'repeat' }
            ],
            playList_visible: false,
            playMode_visible: false
        }
    },
    computed: {
        ...mapState([
            'audio',
            'playMode',
            'playList'
        ]),
        // 播放模式icon
        playMode_icon() {
            switch (this.playMode) {
                case 'random': return 'all_inclusive'
                case 'listRepeat': return 'repeat'
                case 'singleRepeat': return 'repeat_one'
                default: return 'more_vert'
            }
        }
    },
    watch: {
        $route(val) {
            // 路由跳转，关闭sheet模态框
            this.playList_visible = false
            this.playMode_visible = false
        }
    },
    methods: {
        ...mapMutations([
            'SET_AUDIO_DATA',
            'SET_AUDIO_PLAYMODE',
            'SET_AUDIO_PLAYLIST'
        ]),
        // 切换显示
        toggleVisible() {
            this.playList_visible = !this.playList_visible
        },
        // 播放模式change
        playModeChange(val) {
            this.SET_AUDIO_PLAYMODE(val)
            this.playMode_visible = false
        },
        // 删除选项
        deleteItem(item) {
            let index = this.playList.findIndex(n => n.sound.id === item.sound.id)
            this.playList.splice(index, 1)
            this.SET_AUDIO_PLAYLIST(this.playList)
        }
    }
}
</script>
<style lang='scss'>
@import "src/style/mixin.scss";
.playListSheet{
    max-height: 8.03rem;
    bottom: 2.05rem;
    border-top: 1px solid #eee;
    .playList-header{
        position: relative;
        @include lh(1.6rem);
        font-size: 14px;
        color: #6ed56c;
        text-align: center;
        margin-top: 0.32rem;
        span{
            font-size: 12px;
        }
        .playMode_btn{
            position: absolute;
            right: 5px;
            top: 0;
            @include wh(1.6rem, 1.6rem);
            padding: 0;
            .mu-icon{
                font-size: 20px;
            }
        }
    }
    .list{
        position: relative;
        max-height: 6.41rem;
        overflow-x: hidden;
        .list-item{
            position: relative;
            &:before{
                content: "";
                position: absolute;
                width: 5px;
                height: 5px;
                left: 0.77rem;
                top: 20px;
                border-radius: 50%;
                background-color: #e8e8e8;
            }
            &.playing .mu-item{
                color: #333;
            }
            &:last-child .mu-item{
                border: none;
            }
            .mu-item{
                font-size: 14px;
                color: #999;
                padding: 0.51rem 1.92rem 0.51rem 1.6rem;
                border-bottom: 1px solid #f4f4f4;
                min-height: 0;
                .mu-item-content{
                    @include ellipsis;
                }
                .mu-item-left{
                    left: 0.77rem;
                    margin-left: -5px;
                }
                .mu-item-right{
                    right: 5px;
                }
            }
            .playing_icon{
                color: #6ed56c;
                font-size: 18px;
            }
            .close_btn{
                font-size: 16px;
                color: #bababa;
                border:1px solid #bababa;
                border-radius: 100%;            
            }
        }
        .list-item-nothing{
            text-align: center;
            font-size: 14px;
            color: #9B9B9B;
            &:before{
                width:0;
                height: 0;
            }
        }
    }
}
.playModeSheet{
    z-index: 999;
    .list{
        .list-item{
            .mu-item-title{
                font-size: 14px;
            }
            .mu-item.selected{
                .mu-item-right{
                    color: #6ed56c;
                }
                .mu-item-title{
                    color: #6ed56c;
                }
            }
        }
    }
}
</style>