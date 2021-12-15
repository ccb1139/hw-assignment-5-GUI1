// Piece class. Each piece holds a letter, a value, and an amount.
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

// A bag class to draw pieces from. Each bag object holds two arrays and a length.

// the first array (refArr) is an array with the pre-drawn piece data from the 
// json. It has 27 piece objects with the full alphabet plus a blank

//The pBag array starts with 100 piece objects. This is the array that is drawn from

//THe amount is the length of the pbag

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
    //Adds a piece to the reference array.
    //Adds the specified amount in the json to the pbag. i.e. adds 9 A pieces, 2 B pieces...
    addPiece(_letter, _value, _amount){
        this.refArr.push(new Piece(_letter, Number(_value), Number(_amount)));
        for(let i = 0; i < Number(_amount); i++){
            this.pBag.push(new Piece(_letter, Number(_value), Number(_amount)));
        }
    }
    //This empties the pBag and refills it based off of the refArr
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
    //Takes a charachter that represents a piece and returns its value
    getPieceValue(letter){
        var ind = String(letter);
        for(let i = 0; i < this.refArr.length; i++){
            if(ind == this.refArr[i].getLetter()){
                return this.refArr[i].getValue();
            }
        }
    }
    //Draws a random piece if there is pieces to draw. Otherwise it returns noPiece
    drawPiece(){
        if(this.pBag.length > 0){
            var draw = Math.round(Math.random() * ((this.pBag.length - 1) + 0) + 0);
        
            var letter = this.pBag[draw].getLetter();
            this.pBag.splice(draw, 1);
            
            return letter;
        } else {
            return "noPiece";
        }
        
    }
}