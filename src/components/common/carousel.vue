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

export default {
    data () {
        return {
            banner: [],
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
    components: {
        swiper,
        swiperSlide
    },
    mounted() {
        
        this.$http.get('banner',{

        }).then(res => {
            if(res.data.code === 0) {
                this.banner = res.data.data
            }
            // console.log(res.data.code)
            // console.log(res.data.data)
        }, e => {
            throw new Error();
            console.log('error');
        })
    }
}
</script>


<style lang='scss' scoped>
    @import 'src/style/mixin.scss';
    #banner {
        @include wh(100%,7rem);
        padding: 10px;
        background-color: $bgColor;
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
                bottom: 0.5rem;
                .swiper-pagination-bullet{
                    background: #fff;
                }
            }
            
        }
        

    }
</style>

