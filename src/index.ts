import Bytecharts from '@dp/bytecharts'
import { kmeans_wasm, kmeans_js } from './kmeans'
import { scatter, SCHEME, CENTER_COLOR } from './constant'
import { datasource } from './datasource'

let K = 4
// const datasource = [
//     [0.697, 0.460], [0.774, 0.376], [0.634, 0.264], [0.608, 0.318], [0.556, 0.215],
//     [0.403, 0.237], [0.481, 0.149], [0.437, 0.211], [0.666, 0.091], [0.243, 0.267],
//     [0.245, 0.057], [0.343, 0.099], [0.639, 0.161], [0.657, 0.198], [0.360, 0.370],
//     [0.593, 0.042], [0.719, 0.103], [0.359, 0.188], [0.339, 0.241], [0.282, 0.257],
//     [0.748, 0.232], [0.714, 0.346], [0.483, 0.312], [0.478, 0.437], [0.525, 0.369],
//     [0.751, 0.489], [0.532, 0.472], [0.473, 0.376], [0.725, 0.445], [0.446, 0.459],
// ]

{
    const spec = {
        ...scatter,
        data: [{
            name: 'lineData',
            values: datasource.map(d => ({ x: d[0], y: d[1] })),
        }],
        xField: 'x',
        yField: 'y',
    }
    const bytecharts = new Bytecharts('source', spec)
    bytecharts.setColors(SCHEME)
    bytecharts.renderAsync()
}

function renderWasmKmeans() {
    const timestamp_start = new Date().getTime()

    const result = kmeans_wasm(datasource, K)
    const { centers, labels } = result

    const timestamp_end = new Date().getTime()
    console.log('K-Means with WASM: ', timestamp_end - timestamp_start, 'ms')
    const dom = document.getElementById('wasm-kmeans')
    if (dom) {
        dom.innerHTML = `K-Means with WASM: <span>${timestamp_end - timestamp_start}</span> ms`;
    }
    const data = datasource.map((d, i) => ({ x: d[0], y: d[1], z: `${labels[i]}` }))
    const centerData = centers.map(d => ({ x: d[0], y:d[1], z: 'center'}))
    const spec = {
        ...scatter,
        data: [{
            name: 'lineData',
            values: data.concat(centerData),
        }],
        xField: 'x',
        yField: 'y',
        groupBy: 'z',
    }
    const bytecharts = new Bytecharts('wasm', spec)
    bytecharts.setColors([...SCHEME.slice(0, K), CENTER_COLOR])
    bytecharts.renderAsync()
}


function renderJsKmeans(){
    const timestamp_start = new Date().getTime()

    const result = kmeans_js(datasource, K)
    const { centers, labels } = result

    const timestamp_end = new Date().getTime()
    console.log('K-Means with JS: ', timestamp_end - timestamp_start, 'ms')
    const dom = document.getElementById('js-kmeans')
    if (dom) {
        dom.innerHTML = `K-Means with JS: <span>${timestamp_end - timestamp_start}</span> ms`;
    }
    const data = datasource.map((d, i) => ({ x: d[0], y: d[1], z: `${labels[i]}` }))
    const centerData = centers.map(d => ({ x: d[0], y:d[1], z: 'center'}))
    const spec = {
        ...scatter,
        data: [{
            name: 'lineData',
            values: data.concat(centerData),
        }],
        xField: 'x',
        yField: 'y',
        groupBy: 'z',
    }
    const bytecharts = new Bytecharts('js', spec)
    bytecharts.setColors([...SCHEME.slice(0, K), CENTER_COLOR])
    bytecharts.renderAsync()
}

function renderKValue() {
    const dom = document.getElementById('k-value')
    console.log('K = ', K)
    if(dom) {
        dom.innerHTML = `K =<span>${K}</span> `;
    }
}

function start(){
    renderKValue()
    renderWasmKmeans();
    renderJsKmeans();
}

{
    start()

    // 绑定事件
    const addDom = document.getElementById('btn-add')
    if (addDom) {
        addDom.onclick = () => {
            if (K < 8) {
                K += 1
                start()
            }
        }
    }
    const subDom = document.getElementById('btn-sub')
    if (subDom) {
        subDom.onclick = () => {
            if (K > 1) {
                K -= 1
                start()
            }
        }
    }
    const calcDom = document.getElementById('btn-calc')
    if (calcDom) {
        calcDom.onclick = () => {
            start()
        }
    }
}
