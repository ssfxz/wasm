// #include <stdio.h>
// #include <emscripten.h>

// #define WASM_EXPORT __attribute__((visibility("default")))

// int EMSCRIPTEN_KEEPALIVE square (int a)
// {
//   return a * a;
// }

#include <stdio.h>

int square (int a)
{
  return a * a;
}
