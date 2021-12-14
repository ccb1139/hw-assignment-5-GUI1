$(window).on('load', function () {
	$(function () {
		// 1 = reg tile, 2 = double word score, 3 = double letter score
		const tileOrder = [1, 1, 2, 1, 1, 1, 3, 1, 3, 1, 1, 1, 2, 1, 1];

		//Builds a board row with the correct images
		for (let i = 1; i < 16; i++) {
			var tileId = "";
			if (i < 10) {
				var tileId = "0" + i + "_tile";
			} else {
				var tileId = i + "_tile";
			}
			//For creating image in tile
			switch (tileOrder[i - 1]) {
				//adds a reg tile
				case 1:
					$("#board_row").append('<div id="' + tileId + '" class="boardTile reg"></div>')
					$("#" + tileId).append('<img src="graphics_data/Board_Tiles/reg.png" class="boardTileImg ireg" width=75 height=75>');
					break;
				//adds a dws tile
				case 2:
					$("#board_row").append('<div id="' + tileId + '" class="boardTile dws"></div>')
					$("#" + tileId).append('<img src="graphics_data/Board_Tiles/dws.png" class="boardTileImg idws" width=75 height=75>');
					break;
				//adds a dls tile
				case 3:
					$("#board_row").append('<div id="' + tileId + '" class="boardTile dls"></div>')
					$("#" + tileId).append('<img src="graphics_data/Board_Tiles/dls.png" class="boardTileImg idls" width=75 height=75>');
					break;
			};
		}
		//positions the board 

		var position = $("#01_tile").position();
		for (let i = 1; i < 16; i++) {
			var tile = "";
			if (i < 10) {
				var tile = "0" + i + "_tile";
			} else {
				var tile = i + "_tile";
			}
			$("#" + tile).css({
				"top": position.top,
				"left": position.left,
			})
			//position = $(tile).position();
			position.left += 78;

		}
		$(".boardTileImg").on('dragstart', function (event) { event.preventDefault(); });
	});


	$(function () {
		//BOARD CREATION IS DONE NOW EVENTS
		const OnBoard = [];
		const onDock = ["piece1", "piece2", "piece3", "piece4", "piece5", "piece6", "piece7"];

		const occTiles = ["-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1"];
		const tileOrder = [1, 1, 2, 1, 1, 1, 3, 1, 3, 1, 1, 1, 2, 1, 1];

		var fullScore = 0;
		var gameOverStat = false;
		
		$("#holder").droppable({
			drop: function (event, ui) {
				avilTiles();
			},
			out: function (event, ui) {
				avilTiles();
			}
		})

		$(".boardTile").droppable({
			//When a tile is dropped
			drop: function (event, ui) {
				$(this).droppable('option', 'accept', ui.draggable);
				ui.draggable.position({ of: $(this) });

				//Adds to On board array when dropped
				OnBoard.push($(ui.draggable).attr('id'));
				for (let i = 0; i < onDock.length; i++) {
					if (onDock[i] == $(ui.draggable).attr('id')) {
						onDock.splice(i, 1);
					}
				}

				//Adds to array of occupied tiles
				var name = $(this).attr('id');
				var tileArrId = Number(name[0] + name[1]) - 1;
				occTiles[tileArrId] = $(ui.draggable).attr('id');
				console.log(name);

				$("#Score").html("Score: " + fullScore + " + ( " + calcScore() + " )");
				avilTiles();
			},

			//When a tile is taken out
			out: function (event, ui) {
				$(this).droppable('option', 'accept', '.gamePiece');
				//Adds to onDock array when dropped
				onDock.push($(ui.draggable).attr('id'));
				for (let i = 0; i < OnBoard.length; i++) {
					if (OnBoard[i] == $(ui.draggable).attr('id')) {
						OnBoard.splice(i, 1);
					}
				}
				var name = $(this).attr('id');
				var tileArrId = Number(name[0] + name[1]) - 1;
				occTiles[tileArrId] = "-1";



				$("#Score").html("Score: " + fullScore + " + ( " + calcScore() + " )");
				avilTiles();
			}
		});

		function tileIdHelper(ind){
			var tmpId = "";
			if(ind > 9) {
				tmpId = ind;
			} else {
				tmpId = "0" + ind;
			}
			return tmpId;
		}

		//Finds and sets avaivlbe tiles
		function avilTiles(){
			console.log(occTiles);
			var allEmpty = true;
			for(let i = 0; i < occTiles.length - 1; i++){
				//console.log("i: " + i + " occTiles[i]: " + occTiles[i] + " occTiles[i + 1]: " + occTiles[i + 1]);
				if(occTiles[i] == "-1" && occTiles[i] == occTiles[i + 1]){
					allEmpty = true;
				} else {
					allEmpty = false;
					break;
				}
			}
			if(allEmpty == true){
				$(".boardTile").css({
					"border-color": "greenyellow" 
				});
				$(".boardTile").droppable("enable");
			} else {
				$(".boardTile").css({
					"border-color": "black" 
				})
				$(".boardTile").droppable("disable");
				for(let i = 0; i < occTiles.length; i++){
					var avlTileIdL = "#" + tileIdHelper(i) + "_tile";
					var avlTileIdC = "#" + tileIdHelper(i+1) + "_tile";
					var avlTileIdR = "#" + tileIdHelper(i+2) + "_tile";
					if(occTiles[i] != "-1"){
						$(avlTileIdC).droppable("enable");
						console.log("occTiles["+i+"]: " + occTiles[i]);
						console.log("L: " + avlTileIdL + " C: " + avlTileIdC + " R: " + avlTileIdR);
						console.log("occTiles["+(i + -1) +"]: " + occTiles[i-1]);
						console.log("occTiles["+(i + 1) +"]: " + occTiles[i+1]);
						if(occTiles[i-1] == "-1"){
							$(avlTileIdL).css({
								"border-color": "greenyellow" 
							});
							$(avlTileIdL).droppable("enable");
						}
						if(occTiles[i+1] == "-1"){
							$(avlTileIdR).css({
								"border-color": "greenyellow" 
							});
							$(avlTileIdR).droppable("enable");
						}
					} else if(occTiles[i] == "-1" ){
						if(occTiles[i-1] == "-1" && occTiles[i+1] == "-1"){
							$(avlTileIdC).css({
								"border-color": "black" 
							})
						}
					}
				}
			}
			//console.log(allEmpty);	
		}
		//Calc Score and displays current word

		function calcScore() {
			var curWord = "";
			var score = 0;
			for (let i = 0; i < occTiles.length; i++) {
				if (occTiles[i] != "-1") {
					if((occTiles[i+1] != "-1" && occTiles[i+1] != null) || 
						(occTiles[i-1] != "-1" && occTiles[i-1] != null)){
						var nameTmp = $("#" + occTiles[i]).css("background-image");
						var name = nameTmp.substr(nameTmp.length-7, 1);
						if(name == "k"){
							var name = " ";
						}
						switch (tileOrder[i]) {
							case 1:
								score += Number(gameBag.getPieceValue(name));
								break;
							//Double word Score
							case 2:
								score += (Number(gameBag.getPieceValue(name)) * 2);
								break;
							//Double letter Score
							case 3:
								score += (Number(gameBag.getPieceValue(name)) * 2);
								break;
						};
						curWord += name;
					}
				}
			}
			$("#currentWord").html("Current Word: "+ curWord);
			return score;
		}

		//Save Word
		$("#nextWordBtn").button();
		$("#nextWordBtn").click(function (e) {

			var tmpOnBoard = [];
			for(let j = 0; j < OnBoard.length; j++){
				tmpOnBoard.push(OnBoard[j]);
			}
			//Calc full Score
			fullScore += calcScore();
			$("#Score").html("Score: " + fullScore + " + ( " + calcScore() + " )");
			
			for(let i = 0; i < tmpOnBoard.length; i++){
				var pId = "#" + tmpOnBoard[i];
				var index = Number(tmpOnBoard[i].substr(5, 1)) - 1;
				var offset = $(pId).offset();
				var y = dockPos[index].top - offset.top;
				var x = dockPos[index].left - offset.left;
				$(pId).simulate("drag", {
					dx: x,
            		dy: y
				});
				//Re-Rolls the piece
				var gamePieceLt = gameBag.drawPiece();
				if(gamePieceLt == " "){
					var imgPath = 'url("graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg")';
				} else if( gamePieceLt == "noPiece"){
					var imgPath = 'url("graphics_data/Scrabble_Tiles/Scrabble_Tile_NP.png")';
					$(pId).draggable( "destory" );
				} else {
					var imgPath = 'url("graphics_data/Scrabble_Tiles/Scrabble_Tile_' + gamePieceLt + '.jpg")';
				}
				$(pId).css({
					"background-image": imgPath,	
				})
			}
			$("#remainTiles").html("Remaining Tiles: " + gameBag.getAmount());
			checkGameOver();
			//console.log(gameBag.getAmount());
						
		});
		
		//RE ROLL
		$("#reRollBtn").button();
		$("#reRollBtn").click(function (e) {
			for (let i = 1; i < 8; i++) {
				var pieceId = "piece" + i;
				for (let j = 0; j < onDock.length; j++) {


					if (pieceId === onDock[j]) {
						var btnPiece = gameBag.drawPiece();
						if(btnPiece == " "){
							var imgPath = 'url("graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg")';
						} else if( btnPiece == "noPiece"){
							var imgPath = 'url("graphics_data/Scrabble_Tiles/Scrabble_Tile_NP.png")';
							$(pieceId).draggable( "destory" );
						}else {
							var imgPath = 'url("graphics_data/Scrabble_Tiles/Scrabble_Tile_' + btnPiece + '.jpg")';
						}

						$("#" + pieceId).css({
							"background-image": imgPath,
						})
					}
				}
			}
			$("#remainTiles").html("Remaining Tiles: " + gameBag.getAmount());
			checkGameOver();
			console.log(gameBag);
		});

		//CHECK GAME OVER
		function checkGameOver(){
			console.log(gameOverStat);
			if(gameOverStat == false){
				if(gameBag.getAmount() < 1){
					$("#currentWord").hide();
					$("#Score").hide();
					$("#remainTiles").hide();
					$("#nextWordBtn").hide();
					$("#reRollBtn").hide();
					
					$("#gameOverInfo").show();
					$("#gameOverInfo").prepend('<p>GAME OVER!</p>');
					$("#gameOverInfo").prepend('<p>Final Score: ' + fullScore + '</p>');
					gameOverStat = true;
				}
			} else {
				gameOverStat = false;
			}
		}


		//RESTART BUTTON
		$("#restartBtn").button();
		$("#restartBtn").click(function (e) {
			if(window.confirm("Are you sure you want to restart?")){
				window.location.reload();
			}
		});

	});
});


