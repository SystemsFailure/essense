// LazyLoading
function LazyLoading(delay) {
    this.delay = delay;
    this.dataEntries = [];

    this.payload = function (iterData, callback) {
        this.dataEntries.push(iterData);
        const intervalID = setInterval(() => {
            this.intervalCount++;
            if (this.dataEntries.length) {
                callback([...this.dataEntries]);
                this.dataEntries.length = 0;
                clearInterval(intervalID);
                return;
            }
        }, this.delay);
    }
}

module.exports = LazyLoading;