class Piece {
    constructor(_letter, _value, _amount) {
        this.letter = _letter;
        this.value = _value;
        this.amount = _amount;
    }
    getLetter(){
        return this.letter;
    }
    getValue(){
        return this.value;
    }
    getAmount(){
        return this.amount;
    }
}

class Bag{
    constructor(){
        this.refArr = [];
        this.pBag = [];
        this.amount = this.pBag.length;
    }
    getAmount(){
        this.amount = this.pBag.length;
        return this.amount;
    }
    addPiece(_letter, _value, _amount){
        this.refArr.push(new Piece(_letter, Number(_value), Number(_amount)));
        for(let i = 0; i < Number(_amount); i++){
            this.pBag.push(new Piece(_letter, Number(_value), Number(_amount)));
        }
    }
    refillBag(){
        this.pBag = [];
        for(let i = 0; i < Number(this.refArr.length); i++){
            for(let j = 0; j < Number(this.refArr[i].getAmount());j++){
                var lt = this.refArr[i].getLetter();
                var vl = Number(this.refArr[i].getValue());
                var am = Number(this.refArr[i].getAmount());
                this.pBag.push(new Piece(lt, vl, am));
            }
        }
    }
    getPieceValue(letter){
        var ind = String(letter);
        for(let i = 0; i < this.refArr.length; i++){
            if(ind == this.refArr[i].getLetter()){
                return this.refArr[i].getValue();
            }
        }
    }
    drawPiece(){
        if(this.pBag.length < 8){
            //this.refillBag();
        }
        var draw = Math.round(Math.random() * ((this.pBag.length - 1) + 0) + 0);
        
        var letter = this.pBag[draw].getLetter();
        this.pBag.splice(draw, 1);
        
        return letter;
    }
}