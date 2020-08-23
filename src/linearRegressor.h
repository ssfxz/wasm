
#include <stdio.h>


void linearFitting(double *arrayX, double *arrayY, int len,double *pRetFactor,double *pRetConstant)
{
      
    double x, y;
 
    double sum_x = 0.0 , sum_y = 0.0 , xySum = 0.0, x2sum = 0.0;
 
	for(int i = 0 ; i < len ; i++)
	{ 
         x=arrayX[i];
         y=arrayY[i];
		 sum_x += x;
		 sum_y += y;
		 xySum += x*y;
		 x2sum += x*x;
	}
	*pRetFactor=(sum_x*sum_y/len-xySum)/(sum_x*sum_x/len-x2sum);
 
	*pRetConstant=(sum_y-(*pRetFactor)*sum_x)/len;
}
