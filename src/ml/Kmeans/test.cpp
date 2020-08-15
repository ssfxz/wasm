#include "kmeans.h"
using namespace std;

void output(const vector<Cluster> &clusters, const int dimension) {
    cout << "{"
         << "\"dimension\":" << dimension << "," << endl
         << "\"clusters\":[";
    for (int i = 0; i < clusters.size(); i++) {
        if (i > 0) cout << ", ";
        std::cout << clusters[i].toString() << std::endl;
    }
    cout << "]}" << endl;
}
void kmeans_work() {
    const int maxRound = 10000;
    const int pointCnt = 150;
    int dimension = 1;
    int k = 0;
    cerr << "dimension, k: ";
    cin >> dimension >> k;
    vector<sharedVPoint> points;
    for (auto &&p : geneData(pointCnt, dimension)) points.push_back(make_shared<NDimenPoint>(p));
    auto clusters = KmeansAlg::run(points, k, NDimenPoint::calcDisToCluster, NDimenPoint::avgPoints, maxRound);
    output(clusters, dimension);
}


int main(int argc, char const *argv[]) {
    kmeans_work();
    return 0;
}
