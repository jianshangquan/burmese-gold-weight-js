const {BurmeseGoldWeight, SIWeight} = require('./../src/burmese-gold-weight');
// const {BurmeseGoldWeight, SIWeight} = require('./../dist/bundle');



// Usage

// From gram
const fromGram = new BurmeseGoldWeight(1234);
const fromGram2 = new BurmeseGoldWeight(new SIWeight(1234));

// Use directly use with constructor
const righWithCopper =  new BurmeseGoldWeight({patetha: 0, kyat: 1, pae: 0, yway: 0}); // ရွှေထည် ၁ကျပ်သား
const wastage =  new BurmeseGoldWeight({patetha: 0, kyat: 0, pae: 1, yway: 2}); // အလျေ့ာအတွက် ၁ပဲ ၂ရွေး
const copper = new BurmeseGoldWeight({patetha: 0, pae: 0, pae: 1, yway: 0}); // ကြေး(အတွင်းစပ်) ၁ပဲ



const purifiedGold = righWithCopper.byBurmeseGoldQuality(15); // ၁၅ပဲရည် အခေါက်ရွှေချွတ်ပြီး
const purifiedGold2 = righWithCopper.byInternationalGoldQuality(22); // 22/24 K အခေါက်ရွှေချွတ်ပြီး


const gold = righWithCopper.add(wastage); // ရွှေထည် + အလျော့အတွက် = အထည်လုပ် အချိန်
const pureGold = righWithCopper.substract(copper); // ရွှေထည် - ကြေး = အခေါက်


// ရောင်းစျေး/ ဝယ်စျေး
const sellPrice = righWithCopper.getBurmeseMarketValuePrice(3_000_000); // အခေါက်ရွှေ သိန်း၃၀ ပေါက်စျေး၏ ရွှေထည်ရောင်းစျေး
const sellPrice2 = righWithCopper.getBurmeseMarketValuePrice(
    2_500_000, // အခေါက်ရွှေစျေး
    50_000 // ခွာစျေး
); // အခေါက်ရွှေ ၂၅သိန်း ပေါက်စျေး၏ ရွှေထည်ရောင်းစျေး;


// Conversion
righWithCopper.toString(); // စုစုပေါင်း ပိဿာအချိန်         => 0.01
righWithCopper.toKyat(); // စုစုပေါင်း ကျပ်အချိန်            => 1
righWithCopper.toPae(); // စုစုပေါင်း ပဲအချိန်               => 16
righWithCopper.toYway(); // စုစုပေါင်း ရွှေးအချိန်            => 128 
righWithCopper.toGram();// စုစုပေါင်း gram ဂရမ်အချိန်       => 16.66666666


// console.log('test ', weight.byInternationalGoldQuality(22));


