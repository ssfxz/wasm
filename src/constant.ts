
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
