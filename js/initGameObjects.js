/*
File: initgameobjects.js
GUI Assignment: hw5
Caleb Bergen, UMass Lowell Computer Science, caleb_bergen@student.uml.edu
Copyright (c) 2021 by Bergen. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by CB on December 15, 2021 at 7:23 PM

This file contains the code to fill the game bag object with gamepieces based
off the json plus 2 blanks

*/



// Reads the json and puts into array. Must be put outside of onWindowLoad so the
// array is ready and filled by the time everything loads
var gameBag = new Bag();
$.getJSON("graphics_data/pieces.json", function (bag) {
    $.each(bag.pieces, function (pieces, values) {
        gameBag.addPiece(values.letter, Number(values.value), Number(values.amount));
    });
    gameBag.addPiece(" ", 0, 2);
});

$(window).on('load', function () {

});
