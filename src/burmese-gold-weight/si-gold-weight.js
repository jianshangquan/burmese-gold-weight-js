const BigNumber = require('bignumber.js');

const SIWeight = function (weight){
    const gram = new BigNumber(weight.toString());

    this.getGram = () => gram;
}


SIWeight.prototype = {
    get gram() {
        return parseFloat(this.getGram().toString());
    }
}

module.exports = SIWeight;