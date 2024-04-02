



export class SIWeight{
    #gram: number = 0;

    get gram(){
        return parseFloat(this.getGram().toString());
    }

    getGram(): number{
        return this.#gram;
    }
}


