const {BurmeseGoldWeight, SIWeight} = require('./../src/burmese-gold-weight');




// const weight =  new BurmeseGoldWeight({patetha: 1, kyat: 1, pae: 1, yway: 1});
const weight =  new BurmeseGoldWeight({patetha: 0, kyat: 1, pae: 0, yway: 0});
const waste =  new BurmeseGoldWeight({patetha: 0, kyat: 0, pae: 1, yway: 0});

console.log(weight.getBurmeseMarketValuePrice(2000000, 50000).toString());
// console.log('test ', weight.byInternationalGoldQuality(22));




// var i = new bigdecimal.BigDecimal("123456");
// console.log("i is " + i);
// Output: i is 60509751690538858612029415201127

// var d = new bigdecimal.BigDecimal(i);
// var x = new bigdecimal.BigDecimal("123456.123456789012345678901234567890");
// console.log("d * x = " + d.multiply(x));
// Output: d * x = 7470299375046812977089832214047022056.555930270554343863089286012030

// var two = new bigdecimal.BigDecimal('2');
// console.log("Average = " + d.add(x).divide(two));
// // Output: Average = 30254875845269429306014707662291.561728394506172839450617283945

// var down = bigdecimal.RoundingMode.DOWN();
// console.log("d / x (25 decimal places) = " + d.divide(x, 25, down));