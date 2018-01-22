<template>
	<div class="home">
		<div class="header_img">
			<img src="~src/img/header_img.jpg" alt="">
		</div>
		<div id="banner">
			<carousel></carousel>
		</div>
	</div>
</template>

<script type="script/ecmascript-6">
	import carousel from 'src/components/common/carousel'
	export default {
		components: {
			carousel
		}
	}
</script>

<style lang="scss">
	.header_img img {
		width: 100%;
	}

</style>
