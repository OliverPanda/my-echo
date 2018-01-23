<template>
	<div class="home">
		<div class="header_img">
			<img src="~src/img/header_img.jpg" alt="">
		</div>
		<carousel></carousel>
		<section class="recommend">
			<h3 class="recommend_title">每日推荐</h3>
			<recommendList></recommendList>
		</section>
	</div>
</template>

<script type="script/ecmascript-6">
	import carousel from 'src/components/common/carousel'
	import recommendList from 'src/components/common/recommendList'
	export default {
		components: {
			carousel,
			recommendList
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
