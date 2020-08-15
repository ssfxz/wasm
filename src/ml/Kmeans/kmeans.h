#include "kmeans_oop.h"
using std::cin;
using std::cout;
using std::runtime_error;
class NDimenPoint : public VirtualPoint {
private:
    int dimension;
    vector<double> xs;
public:
    NDimenPoint(const int d) : dimension(d) { xs.resize(d); }
    NDimenPoint(const int d, vector<double> l) : dimension(d), xs(l){};
    NDimenPoint(const NDimenPoint &p) : dimension(p.dimension), xs(p.xs) {}
    ~NDimenPoint(){};
    bool operator==(const VirtualPoint &p) override {
        auto pp = static_cast<const NDimenPoint &>(p);
        if (dimension != pp.dimension) return false;
        for (size_t i = 0; i < xs.size(); i++)
            if (xs[i] != pp.xs[i]) return false;
        return true;
    }
    bool operator!=(const VirtualPoint &p) override {
        auto pp = static_cast<const NDimenPoint &>(p);
        if (dimension != pp.dimension) return true;
        for (size_t i = 0; i < xs.size(); i++)
            if (xs[i] != pp.xs[i]) return true;
        return false;
    }
    void add(const NDimenPoint &p) {
        if (p.dimension != dimension) throw runtime_error("dimension mismatch");
        for (size_t i = 0; i < xs.size(); i++)
            xs[i] += p.xs[i];
    }
    NDimenPoint operator/(const int n) {
        if (n == 0) throw std::runtime_error("divisor zero error!");
        NDimenPoint res(dimension);
        for (size_t i = 0; i < dimension; i++) {
            res.xs[i] = xs[i] / n;
        }
        return res;
    }
    double disTo(const NDimenPoint &p) {
        double tmp = 0;
        for (size_t i = 0; i < dimension; i++) tmp += pow(xs[i] - p.xs[i], 2);
        return sqrt(tmp);
    }
    string toString() override {
        stringstream ss;
        ss << "[";
        for (size_t i = 0; i < dimension; i++) {
            if (i > 0) ss << ", ";
            ss << xs[i];
        }
        ss << "]";
        return ss.str();
    }
    static double calcDisToCluster(const VirtualPoint &p, const Cluster &c) {
        auto pp = static_cast<const NDimenPoint &>(p);
        auto cp = static_cast<const NDimenPoint &>(*(c.getCentroid()));
        return pp.disTo(cp);
    }
    static sharedVPoint avgPoints(const vector<sharedVPoint> &points) {
        if (points.size() <= 0) return nullptr;
        NDimenPoint resPoint(static_cast<const NDimenPoint &>(*points[0]).dimension);
        for (auto &&p : points)
            resPoint.add(static_cast<const NDimenPoint &>(*p));
        resPoint = resPoint / points.size();
        // cerr << "DEBUG\t" << resPoint.toString() << ", POINTS.SIZE " << points.size() << endl;
        return make_shared<NDimenPoint>(resPoint);
    };
};
vector<NDimenPoint> geneData(int num, const int dimension, double maxVal = 1000) {
    std::default_random_engine generator(time(NULL));
    std::uniform_real_distribution<double> distribution(0, maxVal);
    vector<NDimenPoint> points;
    for (size_t i = 0; i < num; i++) {
        vector<double> tmpVec;
        for (size_t j = 0; j < dimension; j++) tmpVec.push_back(distribution(generator));
        points.push_back(NDimenPoint(dimension, tmpVec));
    }
    return points;
}
