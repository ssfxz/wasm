
const CHART_SIZE = 500

export const scatter = {
    width: CHART_SIZE,
    height: CHART_SIZE,
    type: 'scatter',
    quantitative: true,
    xField: 'x',
    yField: 'y',
    axes: [
        {
            orient: 'left',
            range: { min: -1, max: 1 },
        },
        {
            orient: 'bottom',
            range: { min: -1, max: 1 },
        }
    ],
    legend: {
        visible: false,
    },
    tooltip: {
        visible: false,
    }
}

export const SCHEME = [ '#5685f6', '#73cbe6', '#489e8e', '#82c882', '#f0d060', '#e09db7', '#7b51b3', '#8b9cd6' ]
export const CENTER_COLOR = '#f5222d'


//双轴图 散点+折线
export const dualConfig =  {
	"type": "dualIndicator",
	"layout": "dualAxis",
    "quantitative": true,
	"xField": "x",
	"y0": {
		"type": "scatter",
		"yField": "y"
	},
	"y1": {
		"type": "line",
		"yField": "y1",
        "point": false
	},
	"axes": [{
		"orient": "left",
		"range": {
			"min": 1,
			"max": 3
		}
	}, {
        "orient": "right",
        ticks: false,
        "grid": false,
		"range": {
			"min": 1,
			"max": 3
		}
	}, {
		"orient": "bottom",
		"range": {
			"min": -1,
			"max": 1
		}
    }],
    color: 'color',
    groupBy: 'color',
}
