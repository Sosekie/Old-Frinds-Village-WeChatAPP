<template>
	<view>
		<view class="menu">
			<uni-row>
				<uni-col span="8">
					<view class="container">
						<text :class="value==0?'sel-text':'def-text'">发布</text>
						<view class="line" v-show="value==0"></view>
					</view>
				</uni-col>
				<uni-col span="8">
					<view class="container">
						<text :class="value==1?'sel-text':'def-text'">收藏</text>
						<view class="line" v-show="value==1"></view>
					</view>
				</uni-col>			
				<uni-col span="8">
					<view class="container">
						<text :class="value==1?'sel-text':'def-text'">最近</text>
						<view class="line" v-show="value==1"></view>
					</view>
				</uni-col>			
			</uni-row>
			
		</view>
		<view class="grid">
			<view class="item" v-for="item in list">
				<view class="img">
					<image class="img" :src="item.url" mode="aspectFill"></image>
					<image class="like-icon" src="../../static/image/like-white.png"></image>
					<text class="like-num">{{item.like}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'grid',
		data(){
			return{
				value: 0,
				
				list: [{
						url: '/static/image/aaa.png',
						like: 12
				    	},
				{
						url: '/static/image/scenery.jpeg',
						like: 12
				    	},
				{
						url: '/static/image/aaa.png',
						like: 12
				    	},							
				{
						url: '/static/image/aaa.png',
						like: 12
				    	},		
				{
						url: '/static/image/aaa.png',
						like: 12
				    	},				
				{
						url: '/static/image/aaa.png',
						like: 12
				    	},				]
			}
		}
	}
</script>

<style lang="scss">
	.menu{	
		margin-top: 35rpx;
	}
	.def-text{
		color: #616161;
		font-size: 27rpx;
	}
	.sel-text{
		color: #000000;
		 font-size: 27rpx;
	}
	.line{
		margin-top: 5rpx;
		width: 150rpx;
		height: 4rpx;
		background-color: #4a4a4a;
		border-radius: 24rpx;	
	}
	.container{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.grid {
				margin-top: 10rpx;
	            background-color: pink;
	            /*主要是添加了下面两句，设置content为弹性盒子且盒子换行*/
	            display: flex;
	            flex-wrap: wrap;
	        }
	
	.img {
	    width: 246rpx;
		height: 300rpx;
	    background-color: darkorange;
	    text-align: center;
		border: solid #fff 1rpx;
	}   
	.like-icon{
		width: 30rpx;
		height: 30rpx;
		z-index: 10;
		position: relative;
		bottom: 17%;
		right: 33%;
	}
	.like-num{
		color: #fff;
		font-size: 26rpx;
		z-index: 10;
		position: relative;
		bottom: 18.5%;
		right: 32%;
	}

	
</style>