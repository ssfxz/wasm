import { chunk } from 'lodash'
import Bytecharts from '@dp/bytecharts'

// @ts-ignore
const Module = window.Module

const CHART_SIZE = 600
const SCHEME = ['#5685f6', '#73cbe6', '#489e8e', '#82c882', '#f5222d']
const datasource = [
    [0.697, 0.460], [0.774, 0.376], [0.634, 0.264], [0.608, 0.318], [0.556, 0.215],
    [0.403, 0.237], [0.481, 0.149], [0.437, 0.211], [0.666, 0.091], [0.243, 0.267],
    [0.245, 0.057], [0.343, 0.099], [0.639, 0.161], [0.657, 0.198], [0.360, 0.370],
    [0.593, 0.042], [0.719, 0.103], [0.359, 0.188], [0.339, 0.241], [0.282, 0.257],
    [0.748, 0.232], [0.714, 0.346], [0.483, 0.312], [0.478, 0.437], [0.525, 0.369],
    [0.751, 0.489], [0.532, 0.472], [0.473, 0.376], [0.725, 0.445], [0.446, 0.459],
]


const spec = {
    width: CHART_SIZE,
    height: CHART_SIZE,
    type: 'scatter',
    quantitative: true,
    data: [{
        name: 'lineData',
        values: datasource.map(d => ({ x: d[0], y: d[1] })),
    }],
    xField: 'x',
    yField: 'y',
    axes: [
        {
            orient: 'left',
            range: { min: 0, max: 1 },
        },
        {
            orient: 'bottom',
            range: { min: 0, max: 1 },
        }
    ],
    legend: {
        visible: false,
    },
}
const bytecharts = new Bytecharts('source', spec)
bytecharts.setColors(SCHEME)
bytecharts.renderAsync()



const result = kmeans(datasource, 4)
const { centers, labels } = result
console.log('result', result)


const data = datasource.map((d, i) => ({ x: d[0], y: d[1], z: labels[i] }))
const centerData = centers.map(d => ({ x: d[0], y:d[1], z: 'center'}))
const spec2 = {
    width: CHART_SIZE,
    height: CHART_SIZE,
    type: 'scatter',
    quantitative: true,
    data: [{
        name: 'lineData',
        values: data.concat(centerData),
    }],
    xField: 'x',
    yField: 'y',
    groupBy: 'z',
    axes: [
        {
            orient: 'left',
            range: { min: 0, max: 1 },
        },
        {
            orient: 'bottom',
            range: { min: 0, max: 1 },
        }
    ],
    legend: {
        visible: true,
    },
}
const bytecharts2 = new Bytecharts('wasm', spec2)
bytecharts2.setColors(SCHEME)
bytecharts2.renderAsync()




function kmeans(datasource, k) {
    const VECTOR_LENGTH = 2;
    const data = datasource.flat()
    const length = datasource.length

    // Allocate the memory
    const dataMem = Module._malloc(data.length * Float64Array.BYTES_PER_ELEMENT)
    const centersMem = Module._malloc(k * VECTOR_LENGTH * Float64Array.BYTES_PER_ELEMENT)
    const labelsMem = Module._malloc(length * Int32Array.BYTES_PER_ELEMENT)

    Module.HEAPF64.set(data, dataMem / Float64Array.BYTES_PER_ELEMENT)
    Module.HEAP32.set(Int32Array.from(new Array(length).fill(-1)), labelsMem / Int32Array.BYTES_PER_ELEMENT)

    // Run the algorithm
    Module._kmeans_from_js(k, dataMem, data.length, centersMem, labelsMem);

    // Get the results
    const centersData = Module.HEAPF64.subarray(centersMem / Float64Array.BYTES_PER_ELEMENT, (centersMem / Float64Array.BYTES_PER_ELEMENT) + (k * VECTOR_LENGTH));
    const centers = chunk(centersData, 2)
    const labels = Module.HEAP32.subarray(labelsMem / Int32Array.BYTES_PER_ELEMENT, (labelsMem / Int32Array.BYTES_PER_ELEMENT) + length);

    // Free the memory
    Module._free(dataMem);
    Module._free(centersMem);
    Module._free(labelsMem);

    return { centers, labels }
}

