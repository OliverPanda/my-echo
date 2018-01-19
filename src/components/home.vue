<template>
	<div class="home">
		<div class="header_img">
			<img src="~@/img/header_img.jpg" alt="">
		</div>
		<div id="banner">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide"></div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import '@/plugins/swiper.min.css';
	import '@/plugins/swiper.js'
	export default {

	}
</script>

<style lang="scss">
	.header_img img {
		width: 100%;
	}
	
</style>