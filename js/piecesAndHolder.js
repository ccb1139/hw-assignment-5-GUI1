const dockPos = [];
$(window).on('load', function() {
    
    //$("#pieces").on('dragstart', function(event) { event.preventDefault(); });

    // Create piece holder
    $("#pieces").append('<div id="pieceHolder"></div>');
    $("#pieceHolder").append('<img src="graphics_data/scrabble-tile-holder-406774_640.png" id="holder">');

    // Create pieces
    for(let i = 1; i < 8; i++){
        var pieceId = "piece" + i;
        $("#pieceHolder").append('<div id="' + pieceId + '" class = gamePiece></div>');
    }
    var position = $("#holder").position();
    position.left += 45;

    
    $(".gamePiece").draggable({ 
        create: function(event, ui) {
            var position = $(this).position();
            dockPos.push(position);
            console.log(position);
        }
    });

    //Set inital position and tile
    for(let i = 1; i < 8; i++){
        var pieceId = "#piece" + i;

        var gamePieceLt = gameBag.drawPiece();
        if(gamePieceLt == " "){
            var imgPath = 'url("graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg")';
        } else {
            var imgPath = 'url("graphics_data/Scrabble_Tiles/Scrabble_Tile_' + gamePieceLt + '.jpg")';
        }
        
        $(pieceId).css({
            "top":position.top,
            "left":position.left,
            "background-image": imgPath,
            "background-size": "cover"
            
        })
        var position = $(pieceId).position();
        position.top = position.top;
        position.left += $(pieceId).width() + 5;
        //console.log($(pieceId).width());
        //console.log(position);
    }

    //Piece Holder droppable
    $( function() {
        $( "#holder" ).droppable({
            drop: function(event, ui){
                
                
            },

        });
    });
    //Pieces draggable
    $( function() {
        $( ".gamePiece" ).draggable({
            snap: "#pieceHolder",
            snapMode: "inner",
            snapTolerance: 10,
            revert: 'invalid',
        });
    });

});