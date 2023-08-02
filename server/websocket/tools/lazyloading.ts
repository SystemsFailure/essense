// LazyLoading
class LazyLoading {
    delay = 0;
    dataEntries = [];
    payload: any = undefined;
    intervalCount = 0;
    constructor(delay: number) {
        this.delay = delay;
        this.dataEntries = [];
        this.payload = undefined;
        this.intervalCount = 0;
    }
    LazyLoading(delay: number) {
        this.payload = function (iterData: never, callback: any) {
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
}


export default LazyLoading