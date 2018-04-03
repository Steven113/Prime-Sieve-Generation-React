class IntMarker {
    constructor(val){
        this.value = val;
        this.isPrime = (val!==2 && val%2 === 0)? "Not-Prime" : "Unprocessed-Value";
    }
}

export default IntMarker;
