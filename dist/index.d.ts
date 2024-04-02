import BigNumber from 'bignumber.js';

declare class SIWeight {
    #private;
    get gram(): number;
    getGram(): number;
}

declare const PrintType: Readonly<{
    KYAT: "KYAT";
    PAE: "PAE";
    YWAY: "YWAY";
    PATETHA: "PATETHA";
    GRAM: "GRAM";
}>;
interface IPrototype {
    prototype: any;
}
interface BurmeseGoldWeightProps extends IPrototype {
}
declare class BurmeseGoldWeight {
    #private;
    constructor(weight: any | number | SIWeight | BurmeseGoldWeight);
    get patetha(): number;
    get kyat(): number;
    get pae(): number;
    get yway(): number;
    get weight(): {
        patetha: number;
        kyat: number;
        pae: number;
        yway: number;
    };
    getPatetha(): BigNumber;
    getKyat(): BigNumber;
    getPae(): BigNumber;
    getYway(): BigNumber;
    toPatetha(): BigNumber;
    toKyat(): BigNumber;
    toPae(): BigNumber;
    toYway(): BigNumber;
    toGram: () => BigNumber;
    byBurmeseGoldQuality: (quality: number) => BurmeseGoldWeight;
    byInternationalGoldQuality: (k: number) => BurmeseGoldWeight;
    add(burmeseGoldWeight: typeof BurmeseGoldWeight): BurmeseGoldWeight;
    substract: (burmeseGoldWeight: typeof BurmeseGoldWeight) => BurmeseGoldWeight;
    getBurmeseMarketValuePrice: (burmeseGoldSpotPrice: number, marketGaps: number) => BigNumber;
    toString(): string;
    print(printType: string): string;
}

export { BurmeseGoldWeight, type BurmeseGoldWeightProps, PrintType, SIWeight };
