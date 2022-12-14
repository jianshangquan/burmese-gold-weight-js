# burmese-gold-weight-js
### Unit Conversion table
|From|To|
|--|--|
|၁ ပိဿာ| ၁၀၀ကျပ်|
|၁ ကျပ်| ၁၆ပဲ|
|၁ ကျပ်| ၁၆.၆၆၆၆၆၆၆၆ ဂရမ်|
|၁ ပဲ| ၈ရွေး|
|၁ ပဲ| ၁.၀၄၁၆၆၆၆၆၆၂၅ ဂရမ်|

> Source: Yangon Gold Market

#### Notes
1. BurmeseGoldWeight is immutable
2. Use BigNumber for calculation due to [Floating point error in computing](https://betterprogramming.pub/why-is-0-1-0-2-not-equal-to-0-3-in-most-programming-languages-99432310d476)

#### Usage
```javascript
  // Usage

// From gram
const fromGram = new BurmeseGoldWeight(1234);
const fromGram2 = new BurmeseGoldWeight(new SIWeight(1234));

// Use directly use with constructor
const ringWithCopper =  new BurmeseGoldWeight({patetha: 0, kyat: 1, pae: 0, yway: 0}); // ရွှေထည် ၁ကျပ်သား
const wastage =  new BurmeseGoldWeight({patetha: 0, kyat: 0, pae: 1, yway: 2}); // အလျေ့ာအတွက် ၁ပဲ ၂ရွေး
const copper = new BurmeseGoldWeight({patetha: 0, pae: 0, pae: 1, yway: 0}); // ကြေး(အတွင်းစပ်) ၁ပဲ



const purifiedGold = ringWithCopper.byBurmeseGoldQuality(15); // ၁၅ပဲရည် အခေါက်ရွှေချွတ်ပြီး
const purifiedGold2 = ringWithCopper.byInternationalGoldQuality(22); // 22/24 K အခေါက်ရွှေချွတ်ပြီး


const gold = ringWithCopper.add(wastage); // ရွှေထည် + အလျော့အတွက် = အထည်လုပ် အချိန်
const pureGold = ringWithCopper.substract(copper); // ရွှေထည် - ကြေး = အခေါက်


// ရောင်းစျေး/ ဝယ်စျေး
const sellPrice = ringWithCopper.getBurmeseMarketValuePrice(3_000_000); // အခေါက်ရွှေ သိန်း၃၀ ပေါက်စျေး၏ ရွှေထည်ရောင်းစျေး
const sellPrice2 = ringWithCopper.getBurmeseMarketValuePrice(
    2_500_000, // အခေါက်ရွှေစျေး
    50_000 // ခွာစျေး
); // အခေါက်ရွှေ ၂၅သိန်း ပေါက်စျေး၏ ရွှေထည်ရောင်းစျေး;


// Conversion
ringWithCopper.toString(); // စုစုပေါင်း ပိဿာအချိန်         => 0.01
ringWithCopper.toKyat(); // စုစုပေါင်း ကျပ်အချိန်            => 1
ringWithCopper.toPae(); // စုစုပေါင်း ပဲအချိန်               => 16
ringWithCopper.toYway(); // စုစုပေါင်း ရွှေးအချိန်            => 128 
ringWithCopper.toGram();// စုစုပေါင်း gram ဂရမ်အချိန်       => 16.66666666
```


### Ported languages
Java [burmese-gold-weight-java](https://github.com/jianshangquan/burmese-gold-weight-java) \
Javascript [burmese-gold-weight-javascript](https://github.com/jianshangquan/burmese-weight-js) \
Rust [burmese-gold-weight-rust](https://github.com/jianshangquan/burmese-weight-rust)
