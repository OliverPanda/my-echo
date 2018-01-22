<template>
    <div id="carousel">
        <swiper>
            <swiper-slide v-for="(item, index) in banner" :key="index">
                <router-link :to="'/detail/' + item.sound.id">
                    <img :src="item.sound.pic_640" :alt="item.sound.name">
                </router-link>
            </swiper-slide>
            
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getBanner } from 'src/services/getData'
export default {
    data () {
        return {
            banner: []
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    created () {
        getBanner().then(res => {
            this.banner = res;
        })
        
    }
}
</script>


<style scoped>

</style>

