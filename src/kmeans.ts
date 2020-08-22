import { chunk } from 'lodash'

// @ts-ignore
const Module = window.Module

export function kmeans_wasm(datasource, k: number) {
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
