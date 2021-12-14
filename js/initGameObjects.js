var gameBag = new Bag();
$.getJSON("graphics_data/pieces.json", function (bag) { 
    $.each(bag.pieces, function(pieces, values){
        gameBag.addPiece(values.letter, Number(values.value), Number(values.amount));
    });
    gameBag.addPiece(" ", 0, 2);
});

$(window).on('load', function(){
    
});