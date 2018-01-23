<template>
    <div id="hot_list">
        <ul class="hot_ul">
            <router-link tag="li" v-for="(item,index) in recommendList" :to="{path: 'detail',query: {id: item.id}}" :key="index" class="hot_li">
                <section class="pic_wrap">
                    <img :src="item.sound.pic_500" :alt="item.sound.name">
                    <span class="fire" v-if="item.sound.is_hot" :class="hotClass(item.sound.is_hot)"></span>
                </section>

                <hgroup class="caption">
                    <h4>{{item.sound.name}}</h4>
                    <p><span>{{item.sound.channel.name}}</span>频道</p>
                </hgroup>
            </router-link>
        </ul>
    </div>
</template>


<script>
export default {
    data() {
        return {
            recommendList: []
        };
    },
    created() {
        this.$http.get("recommend").then(
            res => {
                this.recommendList = res.data.data;
            },
            e => {
                console.log(e);
            }
        );
    },
    methods: {
        hotClass(hot) {
            switch (hot) {
                case 1:
                    return "fire-red";
                case 3:
                    return "fire-yellow";
                case 4:
                    return "fire-blue";
            }
        }
    }
};
</script>

<style lang="scss">
@import 'src/style/mixin.scss';
#hot_list {
    .hot_li {
        width: 50%;
        display: inline-block;
        padding: 0 10px 6px;
        .pic_wrap {
            width: 100%;
            position: relative;
            
            img {
                width: 100%;
            }
        }
        .caption {
            h4 {
                @include ellipsis;
                font-size: 0.37rem;
                width: 100%;
                color: #666;
                padding-top: 5px;
            }
            p {
                font-size: 0.32rem;
                color: #999;
                span {
                    width: 80%;
                    display: inline-block;
                    @include ellipsis;
                    vertical-align: middle;
                    color: #7dd97f;
                }
            }

        }

    }
}
</style>
