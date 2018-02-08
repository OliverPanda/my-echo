<template>
	<div class="home">
		<div class="header_img">
			<img src="~src/img/header_img.jpg" alt="">
		</div>
		<carousel></carousel>
		<section class="recommend">
			<h3 class="recommend_title">每日推荐</h3>
			<myList :data="recommendList"></myList>
		</section>
	</div>
</template>

<script type="script/ecmascript-6">
import carousel from 'src/components/common/carousel'
import myList from 'src/components/common/recommendList'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
	components: {
		carousel,
		myList
	},
	data() {
		return {
			recommendList: [],
			page: 1,
			lock: false,
			loading: 'loading'
		}
	},
	// computed: {
	// 	...mapState([
	// 		'audio'
	// 	])
	// },
	methods: {
		...mapActions([
			'getHot'
		]),
		get_recommend () {
			this.getHot().then(res => {
				this.recommendList = res.data
			}, err => {
				console.log('get_recommend',err)
			})
		},
		init () {
			this.get_recommend()
		}
	},
	mounted () {
		this.init()
	}
}
</script>

<style lang="scss">
	@import 'src/style/mixin.scss';
	.header_img img {
		width: 100%;
	}
	.recommend{
		width: 100%;
		position: relative;
		.recommend_title{
			@include wh(6rem,1.3rem);
			@include font(0.6rem,1.3rem);
			color: #639e5e;
			background-color: #d6ffd6;
			text-align: center;
			margin: 1rem auto;
			border-radius: 0.65rem;
		}
	}
</style>
