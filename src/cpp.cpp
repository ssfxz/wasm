#include <iostream>
#include <emscripten/emscripten.h>
using namespace std;

#ifdef __cplusplus
extern "C" {
#endif

int EMSCRIPTEN_KEEPALIVE square (int a)
{
  return a * a;
}

#ifdef __cplusplus
}
#endif