<template>
    <div id="hot_list">
        <ul class="hot_ul">
            <router-link tag="li" v-for="(item,index) in recommendList" :to="{path: 'detail',query: {id: item.id}}" :key="index" class="hot_li">
                <section class="pic_wrap">
                    
                </section>
                <img :src="item.sound.pic" :alt="item.sound.name">
                <hgroup>
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
          this.recommendList = res.data.data
      },
      e => {
        console.log(e);
      }
    );
  }
};
</script>

<style lang="scss">
    #hot_list{
        .hot_li{
            width: 50%;
            display: inline-block;
            padding: 0 0.5rem 0.3rem;
        }
    }

</style>
