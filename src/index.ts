import Bytecharts from '@dp/bytecharts'

async function init() {
    const { instance } = await WebAssembly.instantiateStreaming(
      fetch("./lib/cpp.wasm")
    );
    // @ts-ignore
    console.log('square result: ', instance.exports.square(4));
}
init();

const spec = {
    "type": "line",
    "data": [
        {
            "name": "lineData",
            "values": [
                {
                    "x": 0,
                    "y": 28
                },
                {
                    "x": 1,
                    "y": 43
                },
                {
                    "x": 2,
                    "y": 81
                },
                {
                    "x": 3,
                    "y": 19
                },
                {
                    "x": 4,
                    "y": 52
                },
                {
                    "x": 5,
                    "y": 24
                },
                {
                    "x": 6,
                    "y": 87
                },
                {
                    "x": 7,
                    "y": 17
                },
                {
                    "x": 8,
                    "y": 17
                },
                {
                    "x": 9,
                    "y": 49
                }
            ]
        }
    ],
    "xField": "x",
    "yField": "y"
}
const bytecharts = new Bytecharts('root', spec);
bytecharts.renderAsync();
