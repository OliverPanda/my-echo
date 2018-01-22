<template>
    <div id="carousel">
        <swiper>
            <swiper-slide v-for="(item, index) in banner" :key="index">
                <router-link :to="'/detail/' + item.sound.id">
                    <img :src="item.sound.pic_640">
                </router-link>
            </swiper-slide>
            
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Banner } from 'src/services/getData'
import { mapActions } from 'vuex'
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
    },
    methods: {
        ...mapActions([
            'getBanner'
        ])
    }
}
</script>


<style scoped>

</style>

