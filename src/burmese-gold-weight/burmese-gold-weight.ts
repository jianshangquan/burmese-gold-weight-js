// const SIWeight = require('./si-gold-weight.js');
import { SIWeight } from './si-gold-weight';
import BigNumber from "bignumber.js";


const ONE_PATETHA_IN_KYAT = new BigNumber('100');
const ONE_KYAT_IN_PAE = new BigNumber('16');
const ONE_KYAT_IN_YWAY = new BigNumber('128');
const ONE_PAE_IN_YWAY = new BigNumber('8');
const ONE_KYAT_IN_GRAM = new BigNumber('16.66666666');
const ONE_PAE_IN_GRAM = ONE_KYAT_IN_GRAM.dividedBy(ONE_KYAT_IN_PAE);


export const PrintType = Object.freeze({
    KYAT:'KYAT',
    PAE:'PAE',
    YWAY:'YWAY',
    PATETHA:'PATETHA',
    GRAM:'GRAM'
});



interface IPrototype { prototype: any; }
export interface BurmeseGoldWeightProps extends IPrototype{

}



export interface BurmeseWeight{
    patetha: number,
    kyat: number,
    pae: number,
    yway: number
}


export interface PreciseBurmeseWeight{
    patetha: BigNumber,
    kyat: BigNumber,
    pae: BigNumber,
    yway: BigNumber
}




function kyatToBurmeseWeight(kyat: BigNumber) : PreciseBurmeseWeight {
    let pa, k, p, y;
    // console.log('total kyat', kyat.toString());

    const mol = new BigNumber('1');

    pa = kyat.dividedBy(ONE_PATETHA_IN_KYAT);
    pa = pa.minus(pa.modulo(mol)).toString();

    k = kyat.minus(new BigNumber(pa).multipliedBy(ONE_PATETHA_IN_KYAT));
    k = k.minus(k.modulo(mol)).toString();

    p = kyat.minus(new BigNumber(pa).multipliedBy(ONE_PATETHA_IN_KYAT)).minus(new BigNumber(k)).multipliedBy(ONE_KYAT_IN_PAE);
    p = p.minus(p.modulo(mol)).toString();

    y = kyat.minus(new BigNumber(pa).multipliedBy(ONE_PATETHA_IN_KYAT))
            .minus(new BigNumber(k))
            .minus(new BigNumber(p).dividedBy(ONE_KYAT_IN_PAE))
            .multipliedBy(ONE_KYAT_IN_YWAY).toFixed(8);


    // console.log(pa, k, p, y);

    return {
        patetha: BigNumber(pa),
        kyat: BigNumber(k),
        pae: BigNumber(p),
        yway: BigNumber(y)
    };
}



function fromGram(gram : BigNumber) {
    const k = gram.dividedBy(ONE_KYAT_IN_GRAM);
    return kyatToBurmeseWeight(k);
}




export class BurmeseGoldWeight{
    #patetha = new BigNumber('0');
    #kyat = new BigNumber('0');
    #pae = new BigNumber('0');
    #yway = new BigNumber('0');

    constructor(weight: number | BurmeseGoldWeight | BurmeseWeight | SIWeight){
        if(typeof weight == 'number'){ // number in gram
            let w = fromGram(new BigNumber(weight));
            this.#patetha = w.patetha;
            this.#kyat = w.kyat;
            this.#pae = w.pae;
            this.#yway = w.yway;
        }else if(weight instanceof SIWeight){
            let w = fromGram(weight.getGram() as any);
            this.#patetha = w.patetha;
            this.#kyat = w.kyat;
            this.#pae = w.pae;
            this.#yway = w.yway;
        }else if(typeof weight == 'object'){
            const { patetha = 0, kyat = 0, pae = 0, yway = 0 } : BurmeseWeight = weight;
            if(kyat < 0 && kyat >= 100) throw new Error("Burmese Kyat must be between 0 ~ <100");
            if(pae < 0 && pae >= 16) throw new Error("Burmese Pae must be between 0 ~ <16");
            if(yway < 0 && yway >= 8) throw new Error("Burmese Kyat must be between 0 ~ <8");

            this.#patetha = new BigNumber(patetha.toString());
            this.#kyat = new BigNumber(kyat.toString());
            this.#pae = new BigNumber(pae.toString());
            this.#yway = new BigNumber(yway.toString());
        }
    }


    public static fromKyat(kyat: number) : BurmeseGoldWeight{
        const { patetha, kyat: k , pae, yway } = kyatToBurmeseWeight(BigNumber(kyat));
        return new BurmeseGoldWeight({ 
            patetha: patetha.toNumber(), 
            pae: pae.toNumber(), 
            yway: yway.toNumber(), 
            kyat: k.toNumber()
        });
    }




    // getter
    get patetha(){
        return parseInt(this.getPatetha().toString());
    }
    get kyat(){
        return parseInt(this.getKyat().toString());
    }
    get pae(){
        return parseInt(this.getPae().toString());
    }
    get yway(){
        return parseFloat(this.getYway().toString());
    }


    get weight() {
        return {
            patetha: this.patetha,
            kyat: this.kyat,
            pae: this.pae,
            yway: this.yway
        };
    }




    getPatetha(){
        return this.#patetha;
    }

    getKyat(){
        return this.#kyat;
    }

    getPae(){
        return this.#pae;
    }

    getYway(){
        return this.#yway;
    }





    set(weight: BurmeseWeight){
        const { kyat = this.#kyat, pae = this.#pae, yway = this.#yway, patetha = this.patetha } = weight;
        this.#kyat = BigNumber(kyat || 0);
        this.#pae = BigNumber(pae);
        this.#yway = BigNumber(yway);
        this.#patetha = BigNumber(patetha);
    }


    toPatetha(){
        const kyat = this.toKyat();
        return kyat.dividedBy(ONE_PATETHA_IN_KYAT);
    }

    toKyat(){
        const pae = this.toPae();
        return pae.dividedBy(ONE_KYAT_IN_PAE);
    }
    
    toPae() : BigNumber {
        const result = this.#patetha.multipliedBy(ONE_PATETHA_IN_KYAT.multipliedBy(ONE_KYAT_IN_PAE))
                            .plus(this.#kyat.multipliedBy(ONE_KYAT_IN_PAE))
                            .plus(this.#pae)
                            .plus(this.#yway.dividedBy(ONE_PAE_IN_YWAY))
        return result;
    }

    toYway() {
        const pae = this.toPae();
        return pae.dividedBy(ONE_PAE_IN_YWAY);
    }

    toGram = () => {
        const pae = this.toPae();
        return pae.multipliedBy(ONE_PAE_IN_GRAM);
    }



    byBurmeseGoldQuality(quality: number) {
        if(isNaN(quality)) throw new Error('Burmese gold quality must be a number');
        if(quality < 0 && quality > 16) throw new Error('Burmese gold quality must betwee 0~16');

        const qualityRatio = new BigNumber(quality).dividedBy(new BigNumber('16'));
        const rawResult = this.toPae().multipliedBy(qualityRatio);
        const gram = parseFloat(rawResult.multipliedBy(ONE_PAE_IN_GRAM).toString());
        // console.log(gram);
        return new BurmeseGoldWeight(gram);
    }

    byInternationalGoldQuality(k: number) {
        if(isNaN(k)) throw new Error('Gold quality "K" must be a number');
        if(k < 0 && k > 24) throw new Error('International gold quality must betwee 0~24');

        const qualityRatio = new BigNumber(k).dividedBy(new BigNumber('24')).multipliedBy(new BigNumber('16'));
        const rawResult = this.toPae().multipliedBy(qualityRatio);
        const gram = parseFloat(rawResult.multipliedBy(ONE_PAE_IN_GRAM).toString());
        return new BurmeseGoldWeight(gram);
    }

    add(burmeseGoldWeight: typeof BurmeseGoldWeight) {
        if(!(burmeseGoldWeight instanceof BurmeseGoldWeight)) throw new Error('addition must be an instance of BurmeseGoldWeight');
        const pae = this.toPae().plus(burmeseGoldWeight.toPae());
        const gram = parseFloat(pae.multipliedBy(ONE_PAE_IN_GRAM).toString());
        return new BurmeseGoldWeight(gram);
    }

    substract(burmeseGoldWeight: typeof BurmeseGoldWeight) {
        if(!(burmeseGoldWeight instanceof BurmeseGoldWeight)) throw new Error('substraction must be an instance of BurmeseGoldWeight');
        const pae = this.toPae().minus(burmeseGoldWeight.toPae());
        const gram = parseFloat(pae.multipliedBy(ONE_PAE_IN_GRAM).toString());
        return new BurmeseGoldWeight(gram);
    }

    public getBurmeseMarketValuePrice(burmeseGoldSpotPrice: number, marketGaps: number){
        return this.toKyat().multipliedBy(burmeseGoldSpotPrice - (marketGaps && !isNaN(marketGaps) ? marketGaps : 0))
    }

    
    public toString(){
        const { patetha, kyat, pae, yway } = this.weight;
        return `${patetha} ပိဿာ, ${kyat} ကျပ်, ${pae} ပဲ, ${yway} ရွေး`;
    }


    print(printType: string) : string{
        switch(printType){
            case PrintType.KYAT: return `${this.toKyat().toString()} ကျပ်`;
            case PrintType.PAE: return `${this.toPae().toString()} ပဲ`;
            case PrintType.YWAY: return `${this.toYway().toString()} ရွေး`;
            case PrintType.PATETHA: return `${this.toPatetha().toString()} ပိဿာ`;
            case PrintType.GRAM: return `${this.toGram().toString()} ဂရမ်`;
        }

        return this.toString();
    }
}



// export const BurmeseGoldWeights : BurmeseGoldWeightProps = function (weight : string | number | typeof BurmeseGoldWeight) {
//     let patetha = new BigNumber('0'), 
//         kyat = new BigNumber('0'), 
//         pae = new BigNumber('0'), 
//         yway = new BigNumber('0');
    

//     const kyatToBurmeseWeight = (kyat: BigNumber) => {
//         let pa, k, p, y;
//         // console.log('total kyat', kyat.toString());

//         const mol = new BigNumber('1');

//         pa = kyat.dividedBy(ONE_PATETHA_IN_KYAT);
//         pa = pa.minus(pa.modulo(mol)).toString();

//         k = kyat.minus(new BigNumber(pa).multipliedBy(ONE_PATETHA_IN_KYAT));
//         k = k.minus(k.modulo(mol)).toString();

//         p = kyat.minus(new BigNumber(pa).multipliedBy(ONE_PATETHA_IN_KYAT)).minus(new BigNumber(k)).multipliedBy(ONE_KYAT_IN_PAE);
//         p = p.minus(p.modulo(mol)).toString();

//         y = kyat.minus(new BigNumber(pa).multipliedBy(ONE_PATETHA_IN_KYAT))
//                 .minus(new BigNumber(k))
//                 .minus(new BigNumber(p).dividedBy(ONE_KYAT_IN_PAE))
//                 .multipliedBy(ONE_KYAT_IN_YWAY).toFixed(8);


//         // console.log(pa, k, p, y);

//         return {
//             patetha: BigNumber(pa),
//             kyat: BigNumber(k),
//             pae: BigNumber(p),
//             yway: BigNumber(y)
//         };
//     }

//     const fromGram = (gram : BigNumber) => {
//         const k = gram.dividedBy(ONE_KYAT_IN_GRAM);
//         return kyatToBurmeseWeight(k);
//     }

//     constructor(weight);
//     function constructor(weight : any | SIWeight){
//         // console.log(typeof weight);
//         // console.log(weight instanceof SIWeight)
//         if(typeof weight == 'number'){ // number in gram
//             let w = fromGram(new BigNumber(weight));
//             patetha = w.patetha;
//             kyat = w.kyat;
//             pae = w.pae;
//             yway = w.yway;
//         }else if(weight instanceof SIWeight){
//             let w = fromGram(weight.getGram() as any);
//             patetha = w.patetha;
//             kyat = w.kyat;
//             pae = w.pae;
//             yway = w.yway;
//         }else if(typeof weight == 'object'){
//             if(weight.kyat < 0 && weight.kyat >= 100) throw new Error("Burmese Kyat must be between 0 ~ <100");
//             if(weight.pae < 0 && weight.pae >= 16) throw new Error("Burmese Pae must be between 0 ~ <16");
//             if(weight.yway < 0 && weight.yway >= 8) throw new Error("Burmese Kyat must be between 0 ~ <8");


//             patetha = new BigNumber(weight.patetha.toString());
//             kyat = new BigNumber(weight.kyat.toString());
//             pae = new BigNumber(weight.pae.toString());
//             yway = new BigNumber(weight.yway.toString());
//         }
//     }

    


//     // getter
//     this.getPatetha = () => patetha;
//     this.getKyat = () => kyat;
//     this.getPae = () => pae;
//     this.getYway = () => yway;


//     this.toPatetha = () => {
//         const kyat = this.toKyat();
//         return kyat.dividedBy(ONE_PATETHA_IN_KYAT);
//     }

//     this.toKyat = () => {
//         const pae = this.toPae();
//         return pae.dividedBy(ONE_KYAT_IN_PAE);
//     }
    
//     this.toPae = () => {
//         const result = patetha.multipliedBy(ONE_PATETHA_IN_KYAT.multipliedBy(ONE_KYAT_IN_PAE))
//                             .plus(kyat.multipliedBy(ONE_KYAT_IN_PAE))
//                             .plus(pae)
//                             .plus(yway.dividedBy(ONE_PAE_IN_YWAY))
//         return result;
//     }

//     this.toYway = () => {
//         const pae = this.toPae();
//         return pae.dividedBy(ONE_PAE_IN_YWAY);
//     }

//     this.toGram = () => {
//         const pae = this.toPae();
//         return pae.multipliedBy(ONE_PAE_IN_GRAM);
//     }

//     this.byBurmeseGoldQuality = (quality: number) => {
//         if(isNaN(quality)) throw new Error('Burmese gold quality must be a number');
//         if(quality < 0 && quality > 16) throw new Error('Burmese gold quality must betwee 0~16');

//         const qualityRatio = new BigNumber(quality).dividedBy(new BigNumber('16'));
//         const rawResult = this.toPae().multipliedBy(qualityRatio);
//         const gram = parseFloat(rawResult.multipliedBy(ONE_PAE_IN_GRAM).toString());
//         // console.log(gram);
//         return new BurmeseGoldWeight(gram);
//     }

//     this.byInternationalGoldQuality = (k: number) => {
//         if(isNaN(k)) throw new Error('Gold quality "K" must be a number');
//         if(k < 0 && k > 24) throw new Error('International gold quality must betwee 0~24');

//         const qualityRatio = new BigNumber(k).dividedBy(new BigNumber('24')).multipliedBy(new BigNumber('16'));
//         const rawResult = this.toPae().multipliedBy(qualityRatio);
//         const gram = parseFloat(rawResult.multipliedBy(ONE_PAE_IN_GRAM).toString());
//         return new BurmeseGoldWeight(gram);
//     }

//     this.add = (burmeseGoldWeight: typeof BurmeseGoldWeight) => {
//         if(!(burmeseGoldWeight instanceof BurmeseGoldWeight)) throw new Error('addition must be an instance of BurmeseGoldWeight');
//         const pae = this.toPae().add(burmeseGoldWeight.toPae());
//         const gram = parseFloat(pae.multipliedBy(ONE_PAE_IN_GRAM).toString());
//         return new BurmeseGoldWeight(gram);
//     }

//     this.substract = (burmeseGoldWeight: typeof BurmeseGoldWeight) => {
//         if(!(burmeseGoldWeight instanceof BurmeseGoldWeight)) throw new Error('substraction must be an instance of BurmeseGoldWeight');
//         const pae = this.toPae().minus(burmeseGoldWeight.toPae());
//         const gram = parseFloat(pae.multipliedBy(ONE_PAE_IN_GRAM).toString());
//         return new BurmeseGoldWeight(gram);
//     }

//     this.getBurmeseMarketValuePrice = (burmeseGoldSpotPrice: number, marketGaps: number) => {
//         return this.toKyat().multipliedBy(burmeseGoldSpotPrice - (marketGaps && !isNaN(marketGaps) ? marketGaps : 0))
//     }
// }


// BurmeseGoldWeight.prototype = {
//     get patetha() {
//         return parseInt(this.getPatetha().toString());
//     },
//     get kyat() {
//         return parseInt(this.getKyat().toString());
//     },
//     get pae() {
//         return parseInt(this.getPae().toString());
//     },
//     get yway() {
//         return parseFloat(this.getYway().toString());
//     },
//     get weight() {
//         return {
//             patetha: this.patetha,
//             kyat: this.kyat,
//             pae: this.pae,
//             yway: this.yway
//         };
//     },
//     toString: function(){
//         const { patetha, kyat, pae, yway } = this.weight;
//         return `${patetha} ပိဿာ, ${kyat} ကျပ်, ${pae} ပဲ, ${yway} ရွေး`;
//     },
//     print: function (printType: string){
//         switch(printType){
//             case PrintType.KYAT: return `${this.toKyat().toString()} ကျပ်`;
//             case PrintType.PAE: return `${this.toPae().toString()} ပဲ`;
//             case PrintType.YWAY: return `${this.toYway().toString()} ရွေး`;
//             case PrintType.PATETHA: return `${this.toPatetha().toString()} ပိဿာ`;
//             case PrintType.GRAM: return `${this.toGram().toString()} ဂရမ်`;
//         }

//         return this.toString();
//     }
// }



// // expo.PrintType = PrintType;

