import $ from "jquery";
import AOS from 'aos';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import 'swiper/dist/css/swiper.css'
import './assets/css/reset.css';
import './assets/css/animation.css';
import './assets/css/cssfromps.css';
import './assets/css/css.css';


var jQuery = require("jquery-easing");
// import {CountUp} from 'countup.js';
import CountUp from "countup"
import {fenxiang} from "./lib/fenxiang"
// import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
let index = 0
let vid = 0
var mySwiper = ''
let play_now = true
let playused = true
let rem = document.documentElement.clientWidth / 750 * 100
var video = document.getElementById('video')


$(() => {
	mySwiper = new Swiper('.swiperpage', {
		initialSlide: 0,
		direction   : 'vertical',
		on          : {
			slideChangeTransitionEnd: function (swiper) {
				var s = mySwiper.activeIndex
				console.log(s);
				if (s == 10) {
					$('.arrow').hide()
					mySwiper.allowSlidePrev = false
				} else {
					$('.arrow').fadeIn()
				}

			}
		},

	});
	/*AOS.init({
		disable: 'false',
		duration: 1200,
	});*/
	// var vConsole = new VConsole();
	// console.log(vConsole);
	fenxiang("“浙”里荣耀 致敬功勋", "一起致敬功勋", "“浙”里荣耀 致敬功勋", '', "http://o.cztvcloud.com/181/5792898/images/fenxiang.jpg")
	init()
	setTimeout(() => {
		$('.loading').hide()
		mySwiper.update()
		$('.index').show()
	}, 1500)
	document.addEventListener("WeixinJSBridgeReady", function () {
		document.getElementById("musics").load();
		document.getElementById("musics").play();
	}, false);
	document.getElementById("musics").play();
	$(".music_play").click(function () {
		if (play_now) {
			$(".music_play").removeClass("music_pause");
			$(".music_play").addClass("music_pause");
			play_now = false;
			playused = false;
			$(".bgMusic")[0].pause();
			$(".music").attr("src", "https://o.cztvcloud.com/181/5792898/images/music-off.png")
		} else {
			$(".music_play").removeClass("music_pause");
			play_now = true;
			playused = false;
			$(".bgMusic")[0].play();
			$(".music").attr("src", "https://o.cztvcloud.com/181/5792898/images/music-on.png")
		}
	});


	$('.zhang').click(function () {
		$('.everaser').hide()
		$(this).addClass('active')
	})
	$('.zhang').bind('touchmove', function () {
		$(this).addClass('active')
	})
	$('.sharebtn').click(() => {
		$('.sharepage').fadeIn()
	})
	$('.play').click(function () {
		var sid = $(this).attr('data-sid')
		console.log(`vid is ${sid}`)
		$('#video').attr('src', source[sid].video)
		$('.videobox').fadeIn()
		video.play()
	})
	$('.videoclsoe').click(function () {
		video.pause()
		$('.videobox').hide()
		musicreturn()
	})
})

video.addEventListener('play', function () {
	bgmusicpause()
})
video.addEventListener('ended', function () {
	musicreturn()
})

function miniAlert(w) {
	$('.tipos').html(w).fadeIn()
	setTimeout(() => {
		$('.tipos').fadeOut()
	}, 1500)
}

function throttle(fun, wait) {//节流函数
	let pre = new Date().getTime()
	return function () {
		let context = this;
		let args = arguments;
		let now = new Date().getTime()
		if ((now - pre) > wait) {
			fun.apply(context, args)
			pre = new Date().getTime()
		}
	}
}

function init() {
	var w, h
	if (IsPC()) {
		var height = window.innerHeight
		var width = height * 414 / 799
		w = 414;
		h = 666;
		var pcw = 750 * (w / 750);//rem
		var pch = 1334 * (w / 750);//
		$("html").css({
			"width"     : width,
			"margin"    : "0 auto",
			"marginTop" : "0",
			"height"    : height,
			"background": "#fff"
		});
		$("html").css({fontSize: w / 750 * 100 + "px"});
		$("html").css({minHeight: h});
	}
}

function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

function orient() {
	if (window.orientation == 0 || window.orientation == 180) {//竖屏;//ipad、iphone竖屏；Andriod横屏
		$(".loading").hide().removeClass("hp");
		return false;
	} else if (window.orientation == 90 || window.orientation == -90) {//横屏;//ipad、iphone横屏；Andriod竖屏
		$(".loading").show().addClass("hp");

		return false;
	} else {
		$(".loading").fadeOut();
	}
}

function isAndroid() {
	var u = navigator.userAgent;
	var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
	return isAndroid
}

//点击量
$.ajax({
	url     : 'http://d.cztvcloud.com/media/news?data_id=5792898&terminal=web&channel_id=181',
	type    : 'get',
	dataType: 'jsonp',
	success : function (rlt) {
		var hints = rlt.data.hits
		console.log("hints" + hints);
		$('.signup').html(parseInt(hints) + 250000)
		var analysisurl = "http://d.cztvcloud.com/visit/ie";
		var channelId = '181';
		var itemId = '5792898';
		var title = 'read';
		var editorId = '';
		var type = '';
		analysis(analysisurl, channelId, itemId, title, editorId, 1, type);
		fenxiang("“浙”里荣耀 致敬功勋", "一起致敬功勋", "你是第" + hints + "个擦亮勋章的人", '', "http://o.cztvcloud.com/181/5792898/images/fenxiang.jpg")

		function analysis(url, channelId, itemId, title, editorId, terminal, type) {
			var data = {
				channel_id: channelId,
				item_id   : itemId,
				title     : title,
				editor_id : editorId,
				terminal  : terminal,
				type      : type
			}
			$.ajax({
				type    : "GET",
				url     : url,
				data    : data,
				dataType: "jsonp",
				success : function (data) {
					console.log(data);
				}
			});
		}
	}
})

function bgmusicpause() {
	if (play_now) {
		$(".music_play").removeClass("music_pause");
		$(".music_play").addClass("music_pause");
		play_now = false;
		playused = true;
		$(".bgMusic")[0].pause();
		$(".music").attr("src", "https://o.cztvcloud.com/181/5792898/images/music-off.png")
	}
}

function musicreturn() {
	if (playused) {
		$(".music_play").removeClass("music_pause");
		play_now = true;
		playused = false;
		$(".bgMusic")[0].play();
		$(".music").attr("src", "https://o.cztvcloud.com/181/5792898/images/music-on.png")
	}
}

var source = [

	{
		"video": "http://v3.cztv.com/cztv/vod/2019/08/30/4c62c99cbe4741d5a04526e6dad93923/7812c9d3f2d944999e4015b63b9a5e76_H264_1500K_MP4.mp4",//胡兆富
	},
	{
		"video": "http://v3.cztv.com/cztv/vod/2019/10/01/0a62ec982be14947871a726895c79ad5/d1ad8f1fcad942fe87332f21289f5f4f_H264_1500K_MP4.mp4",//谢高华
	},
	{
		"video": "http://v3.cztv.com/cztv/vod/2019/09/29/e1b29768871744c8b46ed48e0769dc59/1bce3739430a429883d9c278e2d72d0f_H264_800K_MP4.mp4",//屠呦呦
	},
	{
		"video": "http://v3.cztv.com/cztv/vod/2019/09/29/bc77e76c928c4742bc55a06cc03ec418/75945aea48994acd9f73151664370dd8_H264_1500K_MP4.mp4",//顾方舟
	},
	{
		"video": "http://v3.cztv.com/cztv/vod/2019/09/29/52e38f3e87da4d2591ec1adc434b3fcd/h264_1500k_mp4.mp4",//高铭瑄
	},
	{
		"video": "http://v3.cztv.com/cztv/vod/2019/09/29/c94b0e0b314741359240b7bdc8b32a87/h264_1500k_mp4.mp4",//王启明
	},
	{
		"video": "http://v3.cztv.com/cztv/vod/2019/10/02/131647f0ee8742698af08f268733e3cb/59a8aeb2b2404815a2685b1989f7d467_H264_1500K_MP4.mp4",//董建华
	},
	{
		"video": "http://v3.cztv.com/cztv/vod/2019/09/29/b353301df3e949068d22b6b802dcb8b1/653015fe247346099e4668f4a5995092_H264_800K_MP4.mp4",//樊锦诗
	}

]


