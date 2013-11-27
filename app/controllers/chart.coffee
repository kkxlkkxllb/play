class Chart extends Spine.Controller
	constructor: ->
		super
	render: ->
		@html require("views/sample")()
		@initChart()
		@initChart2()
		@initChart3()
	initChart: ->
		$('#chart').highcharts
			credits:
  			enabled: false
			chart:
				plotBackgroundColor: null
				plotBorderWidth: null
				plotShadow: false
			exporting:
				enabled: true
			title:
				text: '城市各行业消费金额分布：'
			tooltip:
				enabled: false
			plotOptions:
				pie:
					allowPointSelect: true
					cursor: 'pointer'
					borderWidth: 5
					startAngle: -60
					colors: ["#c0392b","#f1c40f","#27ae60","#3498db","#1abc9c"]
					dataLabels:
						enabled: true
						color: '#333'
						connectorColor: '#666'
						format: '<b>{point.name}</b>: {point.percentage:.1f} %'
			series: [
				type: 'pie'
				innerSize: '30%'
				data: [
					['买房租房', 28.0]
					['汽车服务', 15.0]
					['其他', 10.0]
					['购物逛街', 32.0]
					['金融证券', 15.0]
				]
			]
	initChart2: ->
		$("#chart2").highcharts
			credits:
  			enabled: false
			chart:
				type: 'column'
			title:
				text: 'Monthly Average Rainfall'
			subtitle:
				text: 'Source: WorldClimate.com'
			tooltip:
				enabled: false
			xAxis:
				categories: [
					'Jan'
					'Feb'
					'Mar'
					'Apr'
					'May'
					'Jun'
					'Jul'
					'Aug'
					'Sep'
					'Oct'
					'Nov'
					'Dec'
				]
			yAxis:
				min: 0
				gridLineDashStyle: 'longdash'
				title:
					text: 'Rainfall (mm)'
			xAxis:
				offset: 5
			plotOptions:
				column:
					borderRadius: 10
					pointPadding: -0.3
					groupPadding: 0.2
					borderWidth: 0

			series: [
				name: 'Tokyo'
				data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
			,
				name: 'New York'
				data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
			]
	initChart3: ->
		$("#chart3").highcharts
			title:
				text: "test"
			tooltip:
				enabled: false
			xAxis:
				type: 'datetime'
				gridLineDashStyle: 'longdash'
				gridLineWidth: 1
				dateTimeLabelFormats:
					month: '%e. %b'
					year: '%b'
			yAxis:
				title:
					text: 'ttt'
				gridLineDashStyle: 'longdash'
				min: 0
			plotOptions:
				line:
					dataLabels:
						enabled: true
						color: '#333'
						connectorColor: '#666'
						y: -10
					marker:
						lineWidth: 1
			series: [
				name: "ag"
				lineWidth: 4
				marker:
					radius: 4
				data: [
					[Date.UTC(1970,  9, 27), 0   ],
					[Date.UTC(1970, 10, 10), 0.6 ],
					[Date.UTC(1970, 10, 18), 0.7 ],
					[Date.UTC(1970, 11,  2), 0.8 ],
					[Date.UTC(1970, 11,  9), 0.6 ],
					[Date.UTC(1970, 11, 16), 0.6 ],
					[Date.UTC(1970, 11, 28), 0.67],
					[Date.UTC(1971,  0,  1), 0.81],
					[Date.UTC(1971,  0,  8), 0.78],
					[Date.UTC(1971,  0, 12), 0.98],
					[Date.UTC(1971,  0, 27), 1.84],
					[Date.UTC(1971,  1, 10), 1.80],
					[Date.UTC(1971,  1, 18), 1.80],
					[Date.UTC(1971,  1, 24), 1.92],
					[Date.UTC(1971,  2,  4), 2.49]
				]
			]

module.exports = Chart