import Bytecharts from '@dp/bytecharts'
import { kmeans_wasm, kmeans_js } from './kmeans'
import { SCHEME, CENTER_COLOR, scatter, dualConfig } from './constant'
import { datasource } from './datasource'
import { lr_wasm, lr_js, test, random_lr_data } from './linearRegressor'

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
    console.log('K-Means with WASM:', timestamp_end - timestamp_start, 'ms')
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


function renderJsKmeans() {
    const timestamp_start = new Date().getTime()

    const result = kmeans_js(datasource, K)
    const { centers, labels } = result

    const timestamp_end = new Date().getTime()
    console.log('K-Means with JS:', timestamp_end - timestamp_start, 'ms')
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
    console.log('K =', K)
    if(dom) {
        dom.innerHTML = `K =<span>${K}</span> `;
    }
}

function start() {
    renderKValue()
    renderWasmKmeans();
    renderJsKmeans();
}

{
    start()

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


function renderLR(type) {
    const dataSource = random_lr_data(1000000, 1, 2)
    const x = dataSource[0].slice(0,300)
    const y = dataSource[1].slice(0,300)
    const values = x.map((v,i) => ({x: v, y: y[i], color: 'color1'}))
    let result = {a:0, b: 0}
    const timestamp_start = new Date().getTime()
    if(type === 'wasm'){
        result = lr_wasm(dataSource)
    }else if(type === 'js') {
        result = lr_js(dataSource)
    }
    const timestamp_end = new Date().getTime()
    const dom = document.getElementById(`${type}-lr-time`)
    if(dom){
        dom.innerHTML = `with ${type}:<span>${timestamp_end - timestamp_start}</span>ms`;
    }
    const a = result.a
    const b = result.b
    console.log("斜率", a, "截距", b)
    const point1 = [-1, -1 * a + b]
    const point2 = [1, 1*a + b]
    const spec = {
        ...dualConfig,
        data: [{
            name: '双轴图',
            values: type === 'source'? values:  values.concat([{
                x: point1[0],
                y1: point1[1],
                color: 'color2',
            }, {
                x: point2[0],
                y1: point2[1],
                color: 'color2',
            }])
        }],
       
    }
    const bytecharts = new Bytecharts(`${type}-lr`, spec)
    bytecharts.setColors(['#5685f6', '#f5222d'])
    bytecharts.renderAsync()
}

{
    renderLR("source")
    renderLR("wasm")
    renderLR("js",)
}
