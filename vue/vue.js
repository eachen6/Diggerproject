/*轮播图界面*/
new Vue({
	el: '#carousel',
	data: {
		carousel1: 'www.bing.com',
		carousel2: 'www.7k7k.com',
		carousel3: 'www.sougou.com',
		hotGame1: '../img/exm4.jpg',
		hotGame2: '../img/exm1.jpg',
		hotGame3: '../img/exm8.jpg'
	}
})

/*游戏列表界面*/
new Vue({
	el: '#gameList',
	data: {
		total: 2,
		navUrl1: 'www.baidu.com',
		navUrl2: 'www.bilibili.com',
		navUrl3: 'www.douyu.com',
		navUrl4: 'www.4399.com',
		pageUrl1: 'www.baidu.com',
		gameType: 'www.baidu.com',
		specifiedPage: 3
	},
	methods: {
		gameDetails: function(event) {
			console.log(event)
		},
		skip: function(event) {
			alert(this.specifiedPage)
		}
	}
})