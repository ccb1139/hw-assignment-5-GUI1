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

				$("#Score").html("Score: " + fullScore + " + ( " + calcScore() + " )");
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
				console.log("AAAAAAAAA");
				var name = $(this).attr('id');
				var tileArrId = Number(name[0] + name[1]) - 1;
				occTiles[tileArrId] = "-1";

				$("#Score").html("Score: " + fullScore + " + ( " + calcScore() + " )");
			}
		});

		//Calc Score

		function calcScore() {
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
						
					}
				}
			}
			return score;
		}

		//Save Word
		$("#nextWordBtn").button();
		$("#nextWordBtn").click(function (e) {
			fullScore += calcScore();
			$("#Score").html("Score: " + fullScore + " + ( " + calcScore() + " )");
			for(let i = 0; i < OnBoard.length; i++){
				var pId = "#" + OnBoard[i];

				$(pId).simulate("drag", {
					dx: dockPos[i].left,
            		dy: dockPos[i].top
				});

			}
			console.log(dockPos);			
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
						} else {
							var imgPath = 'url("graphics_data/Scrabble_Tiles/Scrabble_Tile_' + btnPiece + '.jpg")';
						}

						$("#" + pieceId).css({
							"background-image": imgPath,
						})
					}
				}
			}
			$("#remainTiles").html("Remaining Tiles: " + gameBag.getAmount());
			console.log(gameBag);
		});

	});
});


