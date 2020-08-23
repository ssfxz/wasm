import { random } from "lodash"

// @ts-ignore
const Module = window.Module

export function test(){
    // 测试线性回归
    const trainX = [1,2,3,4]
    const trainY = [3,5,7,9]
    const len = trainX.length

    const _trainX = Module._malloc(len * Float64Array.BYTES_PER_ELEMENT)
    const _trainY = Module._malloc(len * Float64Array.BYTES_PER_ELEMENT)
    Module.HEAPF64.set(trainX, _trainX / Float64Array.BYTES_PER_ELEMENT)
    Module.HEAPF64.set(trainY, _trainY / Float64Array.BYTES_PER_ELEMENT)
    // 斜率
    const _a = Module._malloc(Float64Array.BYTES_PER_ELEMENT)
    // 截距
    const _b = Module._malloc(Float64Array.BYTES_PER_ELEMENT)

    Module._linearFitting(_trainX, _trainY, len, _a, _b)

    const a = Module.HEAPF64.subarray(_a / Float64Array.BYTES_PER_ELEMENT, _a / Float64Array.BYTES_PER_ELEMENT + 1)
    const b = Module.HEAPF64.subarray(_b / Float64Array.BYTES_PER_ELEMENT, _b / Float64Array.BYTES_PER_ELEMENT + 1)

    console.log("a", a, "b", b)
}

export function lr_wasm(dataSource){
    const trainX = dataSource[0]
    const trainY = dataSource[1]
    const len = trainX.length

    const _trainX = Module._malloc(len * Float64Array.BYTES_PER_ELEMENT)
    const _trainY = Module._malloc(len * Float64Array.BYTES_PER_ELEMENT)
    Module.HEAPF64.set(trainX, _trainX / Float64Array.BYTES_PER_ELEMENT)
    Module.HEAPF64.set(trainY, _trainY / Float64Array.BYTES_PER_ELEMENT)

     // 斜率
     const _a = Module._malloc(Float64Array.BYTES_PER_ELEMENT)
     // 截距
     const _b = Module._malloc(Float64Array.BYTES_PER_ELEMENT)
 
    const timestamp_start = new Date().getTime()

     Module._linearFitting(_trainX, _trainY, len, _a, _b)
     const timestamp_end = new Date().getTime()
    console.log("1111", timestamp_end - timestamp_start)
     const a = Module.HEAPF64.subarray(_a / Float64Array.BYTES_PER_ELEMENT, _a / Float64Array.BYTES_PER_ELEMENT + 1)
     const b = Module.HEAPF64.subarray(_b / Float64Array.BYTES_PER_ELEMENT, _b / Float64Array.BYTES_PER_ELEMENT + 1)

     return {a: a[0], b: b[0]};
}

function linearFitting(arrayX, arrayY, len)
{
    let x, y;
    let sum_x = 0.0 , sum_y = 0.0 , xySum = 0.0, x2sum = 0.0;
	for(let i = 0 ; i < len ; i++)
	{ 
         x=arrayX[i];
         y=arrayY[i];
		 sum_x += x;
		 sum_y += y;
		 xySum += x*y;
		 x2sum += x*x;
	}
	const pRetFactor=(sum_x*sum_y/len-xySum)/(sum_x*sum_x/len-x2sum);
    const pRetConstant=(sum_y-pRetFactor*sum_x)/len;

    return {a: pRetFactor, b: pRetConstant};
}


export function lr_js(dataSource) {
    const trainX = dataSource[0]
    const trainY = dataSource[1]
    const len = trainX.length
      
    return linearFitting(trainX, trainY, len)
}

export function random_lr_data(size, a, b){
    const x = new Array(size)
    const y = new Array(size)
    for(let i=0; i<size; i++) {
        x[i] = Math.random()*2 - 1 // [-1, 1] 
        y[i] = x[i] * a + b + (Math.random()*2 - 1)*0.2
    }
    return [x, y];
}