/*
File: background.js
GUI Assignment: hw5
Caleb Bergen, UMass Lowell Computer Science, caleb_bergen@student.uml.edu
Copyright (c) 2021 by Bergen. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by CB on December 15, 2021 at 7:23 PM

This file contains the code for the randomly selected background

*/

$(document).ready(function () {
    //Choses a random number for the background 
    var backgroundImgNum = Math.round(Math.random() * (3 - 1) + 1);
    
    //Sets the background of the body with some options to make it so the imagine always covers 
    //The background
    switch(backgroundImgNum){
        case 1:

            $("body").css({
                "background": 'url("graphics_data/gameRoom.jpg") no-repeat center center fixed',
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover"
            });
            break;
        case 2:
            $("body").css({
                "background": 'url("graphics_data/coffeShop.jpg") no-repeat center center fixed',
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover"
            });
            break;
        case 3:
            $("body").css({
                "background": 'url("graphics_data/library.jpg") no-repeat center center fixed',
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover"
            });
            break;
    }
});