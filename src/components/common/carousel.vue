<template>
    <div id="banner">
        <swiper class='swiper' :options="swiperOption">
            <swiper-slide v-for="(item, index) in banner" :key="index">
                <router-link :to="'/detail/' + item.sound.id">
                    <img :src="item.sound.pic_640" :alt="item.sound.name">
                </router-link>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { mapActions, mapState } from 'vuex'

export default {
    data () {
        return {
            swiperOption: {
                noNextOption: true,
                pagination: {
                    el: '.swiper-pagination'
                },
                paginationClickable: true,
                autoplay: 3000,
                autoplayDisableOnInteraction: false
            }
        }
    },
    computed: {
        ...mapState([
            'banner'
        ])
    },
    components: {
        swiper,
        swiperSlide
    },
    methods: {
        ...mapActions([
            'getBanner'
        ]),
        get_banner_data () {
            this.getBanner().then(res => {
                // console.log(res.data)
                this.$store.state.banner = res.data
            }, err => {
                console.log('banner', err)
            })
        },
        init () {
            this.get_banner_data()
        }
    },
    mounted () {
        this.init()
    }
}
</script>


<style lang='scss' scoped>
    @import 'src/style/mixin.scss';
    #banner {
        @include wh(100%,7rem);
        padding: 10px;
        background-color: #e8e8e8;
        .swiper{
            @include wh(100%,100%);
            .swiper-slide{
                img{
                    width: 100%;
                }
            }
            .swiper-pagination{
                width: 100%;
                left: 0;
                bottom: 0.25rem;
                .swiper-pagination-bullet{
                    background: #fff;
                }
            }
        }
    }
</style>

