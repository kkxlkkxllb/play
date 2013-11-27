require('lib/setup')
Spine = require('spine')
Chart = require("controllers/chart")

class App extends Spine.Controller
	constructor: ->
		@routes
			"/chart": ->
				view = new Chart(el: $("article"))
				view.render()
			"/": ->
				$("article").empty()
$ ->
	# Highcharts.setOptions
	# 	lang:
	# 		resetZoom: "复原"
	# 		printChart: "打印图表"
	# 		downloadJPEG: "下载 jpeg 图片"
	# 		downloadPDF: "下载 pdf 文档"
	# 		downloadPNG: "下载 png 图片"
	# 		downloadSVG: "下载 svg 矢量图片"
	new App()
	Spine.Route.setup()
	Spine.Route.navigate("/", true)
