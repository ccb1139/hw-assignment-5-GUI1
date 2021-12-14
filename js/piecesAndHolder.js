const dockPos = [];
const currentPos = [];
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

    //Set inital position and tile
    for(let i = 1; i < 8; i++){
        var pieceId = "#piece" + i;

        var gamePieceLt = gameBag.drawPiece();
        if(gamePieceLt == " "){
            var imgPath = 'url("graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg")';
        } else if( gamePieceLt == "noPiece"){
            var imgPath = 'url("graphics_data/Scrabble_Tiles/Scrabble_Tile_NP.png")';
            $(pieceId).draggable( "destory" );
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
        var offset = $(pieceId).offset();
        dockPos.push(offset);
        currentPos.push(offset);
        

        //console.log($(pieceId).width());
        //console.log(position);
        //console.log(offset);
    }

    //Piece Holder droppable
    $( function() {
        $( "#holder" ).droppable({
            drop: function(event, ui){
                
                
            },

        });
    });
    function fixPos(_this, ptmp){
        $(_this).simulate("drag", {
            dx: ptmp.top + 100,
            dy: ptmp.left + 1
        });
    }
    //Pieces draggable
    $( function() {
        $( ".gamePiece" ).draggable({
            snap: "#pieceHolder",
            snapMode: "inner",
            snapTolerance: 10,
            revert: function (valid) {
                var tmpNameT = String($(this).attr("id"));
                var indTmp = tmpNameT.slice(-1);
                var pPosTmp = $(this).offset();
                var pPosTmp2 = $(this).offset();
                if(!valid){
                    setTimeout(() => {revertHelper(tmpNameT, indTmp, pPosTmp);}, 10); 
                } else {
                    currentPos[indTmp - 1] = pPosTmp;
                    console.log(pPosTmp);
                }
            },
            stop: function(event, ui) {
                var tmpNameT = String($(this).attr("id"));
                var indTmp = tmpNameT.slice(-1)
                var pPosTmp = $(this).offset();

                

                //console.log((ui));
                //console.log(currentPos);
            }

        });
    });

    function revertHelper(name, index, curPos){
        var tmpName = "#" + name;
        var ndy =  currentPos[index - 1].top - curPos.top;
        var ndx = currentPos[index - 1].left - curPos.left ;
        $(tmpName).simulate("drag", {
            dx: ndx,
            dy: ndy,
        });
    }

});