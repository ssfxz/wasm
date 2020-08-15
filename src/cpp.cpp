#include <iostream>
#include <emscripten/emscripten.h>
#include "ml/Kmeans/kmeans.h"

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