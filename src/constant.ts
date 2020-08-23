
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
}

export const SCHEME = ['#5685f6', '#73cbe6', '#489e8e', '#82c882']
export const CENTER_COLOR = '#f5222d'
